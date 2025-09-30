import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

const FREE_USAGE_KEY = 'proinvoice_free_usage';

interface FreeUsage {
  count: number;
  lastUsed: string;
}

export function useFreeUsageTracking() {
  const { user } = useAuth();
  const [hasUsedFree, setHasUsedFree] = useState(false);
  const [canUseFree, setCanUseFree] = useState(true);

  useEffect(() => {
    // If user is logged in, don't track anonymous usage
    if (user) {
      setCanUseFree(true);
      setHasUsedFree(false);
      return;
    }

    // Check localStorage for anonymous usage
    const stored = localStorage.getItem(FREE_USAGE_KEY);
    if (stored) {
      try {
        const usage: FreeUsage = JSON.parse(stored);
        if (usage.count >= 1) {
          setHasUsedFree(true);
          setCanUseFree(false);
        } else {
          setCanUseFree(true);
        }
      } catch (e) {
        console.error('Error parsing free usage:', e);
        setCanUseFree(true);
      }
    } else {
      setCanUseFree(true);
    }
  }, [user]);

  const recordFreeUsage = () => {
    // Only track for anonymous users
    if (user) return;

    const stored = localStorage.getItem(FREE_USAGE_KEY);
    let usage: FreeUsage;

    if (stored) {
      usage = JSON.parse(stored);
      usage.count += 1;
      usage.lastUsed = new Date().toISOString();
    } else {
      usage = {
        count: 1,
        lastUsed: new Date().toISOString()
      };
    }

    localStorage.setItem(FREE_USAGE_KEY, JSON.stringify(usage));
    
    if (usage.count >= 1) {
      setHasUsedFree(true);
      setCanUseFree(false);
    }
  };

  return {
    hasUsedFree,
    canUseFree,
    recordFreeUsage,
    isAnonymous: !user
  };
}
