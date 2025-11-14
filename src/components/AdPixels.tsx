import { Helmet } from 'react-helmet-async';

const ga4Id = import.meta.env.VITE_GA4_ID || 'G-0XY23WYE9B';
const gadsId = import.meta.env.VITE_GADS_ID; // e.g., AW-123456789
const fbPixelId = import.meta.env.VITE_FB_PIXEL_ID; // e.g., 123456789012345

// Choose a primary ID to load gtag script (GA4 or Google Ads)
const primaryGtagId = gadsId || ga4Id;

export default function AdPixels() {
  // If no IDs are provided at all, render nothing
  if (!primaryGtagId && !fbPixelId) return null;

  // Build inline init script for gtag
  const gtagInit = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);} 
    gtag('js', new Date());
    ${ga4Id ? `gtag('config', '${ga4Id}');` : ''}
    ${gadsId ? `gtag('config', '${gadsId}');` : ''}
  `;

  const fbInit = fbPixelId
    ? `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');fbq('init','${fbPixelId}');fbq('track','PageView');`
    : '';

  return (
    <Helmet>
      {/* Google gtag (GA4/Ads) */}
      {primaryGtagId && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${primaryGtagId}`}></script>
      )}
      {primaryGtagId && (
        <script>{gtagInit}</script>
      )}

      {/* Facebook Pixel */}
      {fbPixelId && (
        <script>{fbInit}</script>
      )}
      {fbPixelId && (
        <noscript>
          {`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1" />`}
        </noscript>
      )}
    </Helmet>
  );
}

