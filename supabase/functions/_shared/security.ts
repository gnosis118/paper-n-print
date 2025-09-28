// Shared security utilities for edge functions
export interface SecurityConfig {
  maxRequestsPerMinute?: number;
  maxPayloadSize?: number;
  timeoutMs?: number;
  requireUserAgent?: boolean;
  allowedOrigins?: string[];
}

// In-memory rate limiting store (simple implementation for demo)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();

export class SecurityError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = 'SecurityError';
  }
}

export const securityLogger = {
  logSecurityEvent: (event: string, details: any, level: 'INFO' | 'WARN' | 'ERROR' = 'INFO') => {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      event,
      level,
      ...details
    };
    console.log(`[SECURITY-${level}] ${JSON.stringify(logData)}`);
  },

  logFailedAuth: (reason: string, details?: any) => {
    securityLogger.logSecurityEvent('FAILED_AUTH', { reason, ...details }, 'WARN');
  },

  logRateLimitHit: (identifier: string, details?: any) => {
    securityLogger.logSecurityEvent('RATE_LIMIT_HIT', { identifier, ...details }, 'WARN');
  },

  logSuspiciousActivity: (activity: string, details?: any) => {
    securityLogger.logSecurityEvent('SUSPICIOUS_ACTIVITY', { activity, ...details }, 'ERROR');
  }
};

export const rateLimiter = {
  checkRateLimit: (identifier: string, maxRequests: number = 10): boolean => {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    
    const entry = rateLimitStore.get(identifier);
    
    if (!entry || now - entry.timestamp > windowMs) {
      // New window or first request
      rateLimitStore.set(identifier, { count: 1, timestamp: now });
      return true;
    }
    
    if (entry.count >= maxRequests) {
      return false;
    }
    
    entry.count++;
    return true;
  },

  // Clean up old entries periodically
  cleanup: () => {
    const now = Date.now();
    const windowMs = 60 * 1000;
    
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now - entry.timestamp > windowMs) {
        rateLimitStore.delete(key);
      }
    }
  }
};

export const inputValidator = {
  validateAmount: (amount: any): number => {
    if (typeof amount !== 'number' || isNaN(amount) || amount <= 0) {
      throw new SecurityError('Invalid amount: must be a positive number');
    }
    if (amount > 1000000) { // Max $10,000
      throw new SecurityError('Amount exceeds maximum allowed value');
    }
    return amount;
  },

  validateEmail: (email: any): string => {
    if (typeof email !== 'string' || !email.includes('@')) {
      throw new SecurityError('Invalid email format');
    }
    if (email.length > 254) {
      throw new SecurityError('Email too long');
    }
    return email.toLowerCase().trim();
  },

  validateString: (value: any, maxLength: number = 1000, fieldName: string = 'field'): string => {
    if (typeof value !== 'string') {
      throw new SecurityError(`${fieldName} must be a string`);
    }
    if (value.length > maxLength) {
      throw new SecurityError(`${fieldName} exceeds maximum length of ${maxLength}`);
    }
    return value.trim();
  },

  validateUUID: (value: any, fieldName: string = 'field'): string => {
    if (typeof value !== 'string') {
      throw new SecurityError(`${fieldName} must be a string`);
    }
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(value)) {
      throw new SecurityError(`${fieldName} must be a valid UUID`);
    }
    return value;
  }
};

export const requestValidator = {
  validateRequestSize: (req: Request, maxSizeBytes: number = 10 * 1024): void => {
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > maxSizeBytes) {
      throw new SecurityError('Request payload too large', 413);
    }
  },

  validateOrigin: (req: Request, allowedOrigins?: string[]): void => {
    if (!allowedOrigins || allowedOrigins.length === 0) return;
    
    const origin = req.headers.get('origin');
    if (!origin) {
      throw new SecurityError('Missing origin header', 400);
    }
    
    const isAllowed = allowedOrigins.some(allowed => 
      allowed === '*' || origin === allowed || origin.endsWith(allowed)
    );
    
    if (!isAllowed) {
      securityLogger.logSuspiciousActivity('INVALID_ORIGIN', { origin, allowedOrigins });
      throw new SecurityError('Origin not allowed', 403);
    }
  },

  validateUserAgent: (req: Request): void => {
    const userAgent = req.headers.get('user-agent');
    if (!userAgent || userAgent.length < 10) {
      securityLogger.logSuspiciousActivity('MISSING_USER_AGENT', { userAgent });
      throw new SecurityError('Invalid user agent', 400);
    }
  }
};

export const securityMiddleware = {
  withSecurity: (
    handler: (req: Request) => Promise<Response>,
    config: SecurityConfig = {}
  ) => {
    return async (req: Request): Promise<Response> => {
      const startTime = Date.now();
      const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
      
      try {
        // Rate limiting
        if (config.maxRequestsPerMinute) {
          const rateLimitId = `${clientIP}:${req.url}`;
          if (!rateLimiter.checkRateLimit(rateLimitId, config.maxRequestsPerMinute)) {
            securityLogger.logRateLimitHit(rateLimitId, { ip: clientIP, url: req.url });
            throw new SecurityError('Rate limit exceeded', 429);
          }
        }

        // Request size validation
        if (config.maxPayloadSize) {
          requestValidator.validateRequestSize(req, config.maxPayloadSize);
        }

        // Origin validation
        if (config.allowedOrigins) {
          requestValidator.validateOrigin(req, config.allowedOrigins);
        }

        // User agent validation
        if (config.requireUserAgent) {
          requestValidator.validateUserAgent(req);
        }

        // Timeout protection
        const timeoutMs = config.timeoutMs || 30000; // 30 seconds default
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new SecurityError('Request timeout', 408)), timeoutMs);
        });

        const response = await Promise.race([handler(req), timeoutPromise]);
        
        // Log successful requests
        const duration = Date.now() - startTime;
        securityLogger.logSecurityEvent('REQUEST_SUCCESS', {
          method: req.method,
          url: req.url,
          duration,
          clientIP
        });

        return response;

      } catch (error) {
        const duration = Date.now() - startTime;
        
        if (error instanceof SecurityError) {
          securityLogger.logSecurityEvent('SECURITY_ERROR', {
            method: req.method,
            url: req.url,
            error: error.message,
            statusCode: error.statusCode,
            duration,
            clientIP
          }, 'WARN');

          return new Response(JSON.stringify({ error: error.message }), {
            status: error.statusCode,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        // Log unexpected errors
        securityLogger.logSecurityEvent('UNEXPECTED_ERROR', {
          method: req.method,
          url: req.url,
          error: error instanceof Error ? error.message : String(error),
          duration,
          clientIP
        }, 'ERROR');

        throw error;
      } finally {
        // Cleanup rate limit store occasionally
        if (Math.random() < 0.01) { // 1% chance
          rateLimiter.cleanup();
        }
      }
    };
  }
};