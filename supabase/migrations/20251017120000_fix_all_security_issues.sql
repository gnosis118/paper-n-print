-- ============================================================================
-- COMPREHENSIVE SECURITY FIX MIGRATION
-- Date: 2025-10-17
-- Purpose: Fix all remaining security issues from Supabase security scan
-- ============================================================================

-- ============================================================================
-- 1. FIX FUNCTION SEARCH PATH MUTABLE
-- ============================================================================

-- Fix trigger_create_stripe_customer function to have secure search_path
CREATE OR REPLACE FUNCTION public.trigger_create_stripe_customer()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  request_id bigint;
  function_url text;
BEGIN
  function_url := 'https://hkzrfqpnkvpmsaeluksh.supabase.co/functions/v1/create-stripe-customer';
  
  SELECT net.http_post(
    url := function_url,
    headers := jsonb_build_object(
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', 'users',
      'record', jsonb_build_object(
        'id', NEW.id,
        'email', NEW.email,
        'raw_user_meta_data', NEW.raw_user_meta_data
      ),
      'old_record', null
    )
  ) INTO request_id;
  
  RAISE LOG 'Triggered create-stripe-customer function for user %', NEW.id;
  
  RETURN NEW;
END;
$function$;

-- ============================================================================
-- 2. VERIFY ALL SECURITY DEFINER FUNCTIONS HAVE SEARCH_PATH
-- ============================================================================

-- Verify get_estimate_by_token has search_path (should already be set)
-- This function is used for secure estimate sharing
CREATE OR REPLACE FUNCTION public.get_estimate_by_token(_sharing_token UUID)
RETURNS SETOF public.estimates
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only return the estimate if:
  -- 1. The sharing_token matches
  -- 2. Sharing is enabled
  -- 3. The sharing hasn't expired
  RETURN QUERY
  SELECT e.* 
  FROM public.estimates e
  WHERE e.sharing_token = _sharing_token
    AND e.sharing_enabled = true
    AND (e.sharing_expires_at IS NULL OR e.sharing_expires_at > now());
END;
$$;

-- ============================================================================
-- 3. ADD COMMENT TO DOCUMENT SECURITY FIXES
-- ============================================================================

COMMENT ON FUNCTION public.trigger_create_stripe_customer() IS 
'Trigger function to create Stripe customer via edge function. 
SECURITY: Uses SECURITY DEFINER with search_path = public to prevent search path attacks.
Fixed: 2025-10-17';

COMMENT ON FUNCTION public.get_estimate_by_token(UUID) IS 
'Secure function to retrieve estimate by sharing token.
SECURITY: Uses SECURITY DEFINER with search_path = public to prevent search path attacks.
Validates sharing_enabled and sharing_expires_at before returning data.
Fixed: 2025-10-17';

-- ============================================================================
-- 4. VERIFY ALL FUNCTIONS HAVE PROPER SECURITY
-- ============================================================================

-- List all SECURITY DEFINER functions to verify they have search_path
DO $$
DECLARE
  func_record RECORD;
  missing_search_path BOOLEAN := FALSE;
BEGIN
  FOR func_record IN 
    SELECT 
      p.proname AS function_name,
      CASE 
        WHEN pg_get_functiondef(p.oid) LIKE '%SET search_path%' THEN 'SECURE'
        ELSE 'VULNERABLE'
      END AS security_status
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
      AND p.prokind = 'f'
      AND pg_get_functiondef(p.oid) LIKE '%SECURITY DEFINER%'
    ORDER BY p.proname
  LOOP
    IF func_record.security_status = 'VULNERABLE' THEN
      RAISE WARNING 'Function % is SECURITY DEFINER but missing search_path', func_record.function_name;
      missing_search_path := TRUE;
    ELSE
      RAISE NOTICE 'Function % is properly secured with search_path', func_record.function_name;
    END IF;
  END LOOP;
  
  IF NOT missing_search_path THEN
    RAISE NOTICE '✅ All SECURITY DEFINER functions have proper search_path set';
  END IF;
END $$;

