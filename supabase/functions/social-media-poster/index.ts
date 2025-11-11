import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SocialPost {
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  content: string;
  image_url?: string;
  link?: string;
  hashtags?: string[];
}

// Content templates for different post types
const contentTemplates = {
  tips: [
    "💡 Pro Tip: {tip}\n\nSimplify your invoicing with ProInvoice 👉 {link}\n\n{hashtags}",
    "🚀 Quick Win: {tip}\n\nAutomate your billing today: {link}\n\n{hashtags}",
    "⚡ Did you know? {tip}\n\nGet paid faster with ProInvoice: {link}\n\n{hashtags}",
  ],
  features: [
    "✨ New Feature Alert!\n\n{feature}\n\nTry it now: {link}\n\n{hashtags}",
    "🎯 Introducing: {feature}\n\nMake invoicing effortless: {link}\n\n{hashtags}",
  ],
  testimonials: [
    "⭐⭐⭐⭐⭐\n\n\"{testimonial}\"\n\n- {author}\n\nJoin thousands of happy users: {link}\n\n{hashtags}",
  ],
  stats: [
    "📊 {stat}\n\nSee how ProInvoice can help your business: {link}\n\n{hashtags}",
  ],
};

// Predefined content library
const contentLibrary = {
  tips: [
    "Send invoices within 24 hours of completing work to get paid 3x faster",
    "Include payment links in your invoices to reduce payment time by 50%",
    "Set up recurring billing to ensure consistent cash flow every month",
    "Use professional invoice templates to build trust with clients",
    "Collect deposits upfront to protect your cash flow on large projects",
    "Track all client communications in one place to stay organized",
    "Automate payment reminders to reduce late payments by 70%",
    "Accept credit card payments to get paid instantly instead of waiting for checks",
  ],
  features: [
    "Create professional invoices in 30 seconds from your phone",
    "Collect deposits automatically with our estimate-to-invoice workflow",
    "Set up recurring billing cycles for subscription-based services",
    "Generate payment links that clients can pay with one click",
    "Track analytics to see which clients pay fastest",
    "Manage all your clients and their payment history in one dashboard",
  ],
  testimonials: [
    {
      text: "ProInvoice cut my invoicing time from 2 hours to 10 minutes per week. Game changer!",
      author: "Mike R., Electrician"
    },
    {
      text: "I get paid 5 days faster on average since switching to ProInvoice. The payment links are magic.",
      author: "Sarah K., Plumber"
    },
    {
      text: "Finally, an invoicing tool that doesn't require a degree to use. Simple and powerful.",
      author: "James T., Contractor"
    },
  ],
  stats: [
    "Users get paid 3x faster with ProInvoice vs traditional invoicing",
    "95% of invoices sent through ProInvoice are paid within 7 days",
    "Save 10+ hours per month on invoicing and payment tracking",
    "Reduce late payments by 70% with automated reminders",
  ],
  hashtags: {
    general: ['#invoicing', '#smallbusiness', '#contractor', '#freelance', '#getpaid'],
    trades: ['#electrician', '#plumber', '#hvac', '#contractor', '#construction'],
    business: ['#entrepreneur', '#businessowner', '#cashflow', '#accounting'],
    productivity: ['#productivity', '#automation', '#efficiency', '#timemanagement'],
  }
};

// Post to Twitter/X
async function postToTwitter(content: string, apiKey: string, apiSecret: string, accessToken: string, accessSecret: string) {
  // Note: Twitter API v2 requires OAuth 1.0a
  // This is a placeholder - you'll need to implement OAuth signing
  console.log('Posting to Twitter:', content);
  
  // TODO: Implement actual Twitter API call with OAuth 1.0a
  // For now, return success for testing
  return { success: true, platform: 'twitter', message: 'Posted to Twitter' };
}

// Post to LinkedIn
async function postToLinkedIn(content: string, accessToken: string, authorId: string) {
  const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify({
      author: `urn:li:person:${authorId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: content,
          },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`LinkedIn API error: ${response.statusText}`);
  }

  return { success: true, platform: 'linkedin', message: 'Posted to LinkedIn' };
}

// Post to Facebook
async function postToFacebook(content: string, pageId: string, accessToken: string) {
  const response = await fetch(`https://graph.facebook.com/v18.0/${pageId}/feed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: content,
      access_token: accessToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Facebook API error: ${response.statusText}`);
  }

  return { success: true, platform: 'facebook', message: 'Posted to Facebook' };
}

// Generate post content
function generatePost(type: 'tips' | 'features' | 'testimonials' | 'stats'): string {
  const baseUrl = 'https://proinvoice.app';
  
  let content = '';
  let hashtags = [...contentLibrary.hashtags.general, ...contentLibrary.hashtags.business];
  
  switch (type) {
    case 'tips': {
      const tip = contentLibrary.tips[Math.floor(Math.random() * contentLibrary.tips.length)];
      const template = contentTemplates.tips[Math.floor(Math.random() * contentTemplates.tips.length)];
      content = template
        .replace('{tip}', tip)
        .replace('{link}', baseUrl)
        .replace('{hashtags}', hashtags.slice(0, 5).join(' '));
      break;
    }
    case 'features': {
      const feature = contentLibrary.features[Math.floor(Math.random() * contentLibrary.features.length)];
      const template = contentTemplates.features[Math.floor(Math.random() * contentTemplates.features.length)];
      content = template
        .replace('{feature}', feature)
        .replace('{link}', baseUrl)
        .replace('{hashtags}', hashtags.slice(0, 5).join(' '));
      break;
    }
    case 'testimonials': {
      const testimonial = contentLibrary.testimonials[Math.floor(Math.random() * contentLibrary.testimonials.length)];
      const template = contentTemplates.testimonials[0];
      content = template
        .replace('{testimonial}', testimonial.text)
        .replace('{author}', testimonial.author)
        .replace('{link}', baseUrl)
        .replace('{hashtags}', hashtags.slice(0, 5).join(' '));
      break;
    }
    case 'stats': {
      const stat = contentLibrary.stats[Math.floor(Math.random() * contentLibrary.stats.length)];
      const template = contentTemplates.stats[0];
      content = template
        .replace('{stat}', stat)
        .replace('{link}', baseUrl)
        .replace('{hashtags}', hashtags.slice(0, 5).join(' '));
      break;
    }
  }
  
  return content;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { type = 'tips', platforms = ['twitter', 'linkedin', 'facebook'] } = await req.json();
    
    // Get API credentials from environment variables
    const twitterApiKey = Deno.env.get('TWITTER_API_KEY');
    const twitterApiSecret = Deno.env.get('TWITTER_API_SECRET');
    const twitterAccessToken = Deno.env.get('TWITTER_ACCESS_TOKEN');
    const twitterAccessSecret = Deno.env.get('TWITTER_ACCESS_SECRET');
    
    const linkedinAccessToken = Deno.env.get('LINKEDIN_ACCESS_TOKEN');
    const linkedinAuthorId = Deno.env.get('LINKEDIN_AUTHOR_ID');
    
    const facebookPageId = Deno.env.get('FACEBOOK_PAGE_ID');
    const facebookAccessToken = Deno.env.get('FACEBOOK_ACCESS_TOKEN');
    
    // Generate content
    const content = generatePost(type);
    
    const results = [];
    
    // Post to each platform
    if (platforms.includes('twitter') && twitterApiKey) {
      try {
        const result = await postToTwitter(content, twitterApiKey, twitterApiSecret!, twitterAccessToken!, twitterAccessSecret!);
        results.push(result);
      } catch (error) {
        results.push({ success: false, platform: 'twitter', error: error.message });
      }
    }
    
    if (platforms.includes('linkedin') && linkedinAccessToken) {
      try {
        const result = await postToLinkedIn(content, linkedinAccessToken, linkedinAuthorId!);
        results.push(result);
      } catch (error) {
        results.push({ success: false, platform: 'linkedin', error: error.message });
      }
    }
    
    if (platforms.includes('facebook') && facebookPageId) {
      try {
        const result = await postToFacebook(content, facebookPageId, facebookAccessToken!);
        results.push(result);
      } catch (error) {
        results.push({ success: false, platform: 'facebook', error: error.message });
      }
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        content,
        results 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});

