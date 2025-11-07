# ProInvoice Stripe Price Setup Script (PowerShell)
# This script creates Stripe prices using the Stripe API directly

param(
    [Parameter(Mandatory=$true)]
    [string]$StripeSecretKey
)

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "ProInvoice Stripe Price Setup" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Validate API key
if ($StripeSecretKey -notmatch "^sk_(test|live)_") {
    Write-Host "ERROR: Invalid Stripe secret key format" -ForegroundColor Red
    Write-Host "Key should start with 'sk_test_' or 'sk_live_'" -ForegroundColor Red
    exit 1
}

$mode = if ($StripeSecretKey -match "^sk_test_") { "TEST" } else { "LIVE" }
Write-Host "Mode: $mode MODE" -ForegroundColor $(if ($mode -eq "TEST") { "Yellow" } else { "Red" })
Write-Host ""

# Base64 encode the API key for Basic Auth
$base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${StripeSecretKey}:"))
$headers = @{
    "Authorization" = "Basic $base64AuthInfo"
    "Content-Type" = "application/x-www-form-urlencoded"
}

$priceIds = @{}

function Create-StripeProduct {
    param($name, $description)
    
    Write-Host "Creating product: $name" -ForegroundColor Cyan
    
    $body = "name=$([System.Web.HttpUtility]::UrlEncode($name))&description=$([System.Web.HttpUtility]::UrlEncode($description))"
    
    try {
        $response = Invoke-RestMethod -Uri "https://api.stripe.com/v1/products" -Method Post -Headers $headers -Body $body
        Write-Host "  Product created: $($response.id)" -ForegroundColor Green
        return $response.id
    } catch {
        Write-Host "  Error creating product: $_" -ForegroundColor Red
        throw
    }
}

function Create-StripePrice {
    param($productId, $amount, $interval, $lookupKey, $displayName)
    
    Write-Host "Creating price: $displayName" -ForegroundColor Cyan
    
    $body = "product=$productId&unit_amount=$amount&currency=usd&recurring[interval]=$interval&lookup_key=$lookupKey"
    
    try {
        $response = Invoke-RestMethod -Uri "https://api.stripe.com/v1/prices" -Method Post -Headers $headers -Body $body
        Write-Host "  Price created: $($response.id)" -ForegroundColor Green
        return $response.id
    } catch {
        Write-Host "  Error creating price: $_" -ForegroundColor Red
        throw
    }
}

try {
    # Add System.Web assembly for URL encoding
    Add-Type -AssemblyName System.Web

    Write-Host "Creating Stripe Products and Prices..." -ForegroundColor Yellow
    Write-Host ""

    # Starter Plan
    Write-Host "STARTER PLAN" -ForegroundColor Magenta
    $starterProductId = Create-StripeProduct -name "Starter" -description "ProInvoice Starter Plan - For solo tradesmen"
    $priceIds["starter_monthly"] = Create-StripePrice -productId $starterProductId -amount 1900 -interval "month" -lookupKey "starter_monthly" -displayName "Starter Monthly ($19/month)"
    $priceIds["starter_annual"] = Create-StripePrice -productId $starterProductId -amount 19000 -interval "year" -lookupKey "starter_annual" -displayName "Starter Annual ($190/year)"
    Write-Host ""

    # Pro Crew Plan
    Write-Host "PRO CREW PLAN" -ForegroundColor Magenta
    $proCrewProductId = Create-StripeProduct -name "Pro Crew" -description "ProInvoice Pro Crew Plan - For small crews managing multiple jobs"
    $priceIds["pro_crew_monthly"] = Create-StripePrice -productId $proCrewProductId -amount 4900 -interval "month" -lookupKey "pro_crew_monthly" -displayName "Pro Crew Monthly ($49/month)"
    $priceIds["pro_crew_annual"] = Create-StripePrice -productId $proCrewProductId -amount 49000 -interval "year" -lookupKey "pro_crew_annual" -displayName "Pro Crew Annual ($490/year)"
    Write-Host ""

    # Contractor Plus Plan
    Write-Host "CONTRACTOR PLUS PLAN" -ForegroundColor Magenta
    $contractorPlusProductId = Create-StripeProduct -name "Contractor Plus" -description "ProInvoice Contractor Plus Plan - For GCs managing subs & docs"
    $priceIds["contractor_plus_monthly"] = Create-StripePrice -productId $contractorPlusProductId -amount 9900 -interval "month" -lookupKey "contractor_plus_monthly" -displayName "Contractor Plus Monthly ($99/month)"
    $priceIds["contractor_plus_annual"] = Create-StripePrice -productId $contractorPlusProductId -amount 99000 -interval "year" -lookupKey "contractor_plus_annual" -displayName "Contractor Plus Annual ($990/year)"
    Write-Host ""

    # Success!
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "SUCCESS! All prices created" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "COPY THESE PRICE IDs:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "const PRICE_IDS = {" -ForegroundColor White
    Write-Host "  // Starter Plan - `$19/month, `$190/year" -ForegroundColor Gray
    Write-Host "  starter_monthly: `"$($priceIds['starter_monthly'])`",      // `$19/month" -ForegroundColor White
    Write-Host "  starter_annual: `"$($priceIds['starter_annual'])`",        // `$190/year" -ForegroundColor White
    Write-Host "  " -ForegroundColor White
    Write-Host "  // Pro Crew Plan - `$49/month, `$490/year" -ForegroundColor Gray
    Write-Host "  pro_crew_monthly: `"$($priceIds['pro_crew_monthly'])`",    // `$49/month" -ForegroundColor White
    Write-Host "  pro_crew_annual: `"$($priceIds['pro_crew_annual'])`",      // `$490/year" -ForegroundColor White
    Write-Host "  " -ForegroundColor White
    Write-Host "  // Contractor Plus Plan - `$99/month, `$990/year" -ForegroundColor Gray
    Write-Host "  contractor_plus_monthly: `"$($priceIds['contractor_plus_monthly'])`",  // `$99/month" -ForegroundColor White
    Write-Host "  contractor_plus_annual: `"$($priceIds['contractor_plus_annual'])`",    // `$990/year" -ForegroundColor White
    Write-Host "  " -ForegroundColor White
    Write-Host "  // Template purchases (keep existing)" -ForegroundColor Gray
    Write-Host "  template_onetime: `"price_1SCDMZGpz30x93Kj3kh1GXZS`",   // `$10 one-time" -ForegroundColor White
    Write-Host "  template_trial: `"price_1SCDMkGpz30x93KjqjZ806yi`"      // `$5 trial" -ForegroundColor White
    Write-Host "} as const;" -ForegroundColor White
    Write-Host ""

    # Save to JSON file
    $output = @{
        created_at = (Get-Date).ToString("o")
        mode = $mode
        prices = @{
            starter_monthly = @{ id = $priceIds["starter_monthly"]; amount = "`$19/month" }
            starter_annual = @{ id = $priceIds["starter_annual"]; amount = "`$190/year" }
            pro_crew_monthly = @{ id = $priceIds["pro_crew_monthly"]; amount = "`$49/month" }
            pro_crew_annual = @{ id = $priceIds["pro_crew_annual"]; amount = "`$490/year" }
            contractor_plus_monthly = @{ id = $priceIds["contractor_plus_monthly"]; amount = "`$99/month" }
            contractor_plus_annual = @{ id = $priceIds["contractor_plus_annual"]; amount = "`$990/year" }
        }
    }

    $output | ConvertTo-Json -Depth 10 | Out-File -FilePath "stripe-price-ids.json" -Encoding UTF8
    Write-Host "Price IDs saved to stripe-price-ids.json" -ForegroundColor Green
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "NEXT STEPS:" -ForegroundColor Yellow
    Write-Host "1. Copy the price IDs above" -ForegroundColor White
    Write-Host "2. Update supabase/functions/create-checkout/index.ts" -ForegroundColor White
    Write-Host "3. Replace the REPLACE_WITH_... placeholders" -ForegroundColor White
    Write-Host "4. Deploy to Supabase: supabase functions deploy create-checkout" -ForegroundColor White
    Write-Host "============================================================" -ForegroundColor Cyan

} catch {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host "ERROR OCCURRED" -ForegroundColor Red
    Write-Host "============================================================" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    exit 1
}

