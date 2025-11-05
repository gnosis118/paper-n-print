import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

interface UsageLimit {
  allowed: boolean;
  used: number;
  limit: number;
  remaining: number;
}

// Generate a simple browser fingerprint for tracking
const getBrowserFingerprint = (): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const txt = 'fingerprint';
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText(txt, 2, 2);
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.colorDepth,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL()
  ].join('|');
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return hash.toString(36);
};

export function useFreeUsageTracking() {
  const { user } = useAuth();
  const [canUseFree, setCanUseFree] = useState(true);
  const [usageInfo, setUsageInfo] = useState<UsageLimit | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Authenticated users always have access
    if (user) {
      setCanUseFree(true);
      setUsageInfo(null);
      return;
    }

    // For anonymous users, check server-side usage limit
    checkAnonymousUsage();
  }, [user]);

  const checkAnonymousUsage = async () => {
    if (user) return; // Skip for authenticated users

    setLoading(true);
    try {
      const fingerprint = getBrowserFingerprint();
      
      const { data, error } = await supabase.functions.invoke('check-anonymous-usage', {
        body: { fingerprint }
      });

      if (error) {
        console.error('Error checking usage:', error);
        // On error, allow usage (fail open) but log it
        setCanUseFree(true);
        return;
      }

      setUsageInfo(data);
      setCanUseFree(data.allowed);
    } catch (error) {
      console.error('Error checking anonymous usage:', error);
      // On error, allow usage (fail open)
      setCanUseFree(true);
    } finally {
      setLoading(false);
    }
  };

  const recordFreeUsage = async () => {
    if (user) return; // Skip for authenticated users
    
    // Re-check usage after recording
    await checkAnonymousUsage();
  };

  return {
    hasUsedFree: !canUseFree,
    canUseFree,
    recordFreeUsage,
    isAnonymous: !user,
    usageInfo,
    loading
  };
}
