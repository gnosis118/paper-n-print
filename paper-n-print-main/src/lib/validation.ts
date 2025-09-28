import { z } from "zod";

// Input sanitization functions
export const sanitizeInput = {
  // Remove potentially dangerous characters and trim whitespace
  text: (input: string): string => {
    return input
      .trim()
      .replace(/[<>'";&]/g, '') // Remove potentially dangerous characters
      .substring(0, 500); // Limit length
  },
  
  // Sanitize email input
  email: (input: string): string => {
    return input
      .trim()
      .toLowerCase()
      .replace(/[<>'";&]/g, '')
      .substring(0, 255);
  },
  
  // Sanitize phone number input
  phone: (input: string): string => {
    return input
      .trim()
      .replace(/[^0-9+\-\(\)\s]/g, '') // Only allow numbers and phone formatting chars
      .substring(0, 20);
  },
  
  // Sanitize URL input
  url: (input: string): string => {
    return input
      .trim()
      .replace(/[<>'";&]/g, '')
      .substring(0, 255);
  },
  
  // Sanitize numeric input
  currency: (input: string): string => {
    return input
      .replace(/[^0-9.\-]/g, '') // Only allow numbers, dots, and minus
      .substring(0, 20);
  }
};

// Enhanced authentication validation schema
export const enhancedAuthSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Please enter a valid email address")
    .refine((email) => {
      // Additional email security checks
      const hasValidDomain = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      const noConsecutiveDots = !email.includes('..');
      const noSpecialChars = !/[<>'";&]/.test(email);
      return hasValidDomain && noConsecutiveDots && noSpecialChars;
    }, "Email contains invalid characters"),
  
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .refine((password) => {
      // Check for common weak patterns
      const commonPasswords = ['password', '123456', 'qwerty', 'admin'];
      const isWeak = commonPasswords.some(weak => 
        password.toLowerCase().includes(weak)
      );
      return !isWeak;
    }, "Password is too common or weak"),
  
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.confirmPassword !== undefined) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Business information validation schema
export const businessInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Business name is required")
    .max(100, "Business name must be less than 100 characters")
    .refine((name) => !/[<>'";&]/.test(name), "Business name contains invalid characters"),
  
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Please enter a valid email address"),
  
  phone: z
    .string()
    .trim()
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[+\-\(\)\s0-9]*$/, "Phone number can only contain numbers, spaces, and +()- characters")
    .optional(),
  
  website: z
    .string()
    .trim()
    .max(255, "Website URL must be less than 255 characters")
    .refine((url) => {
      if (!url) return true; // Optional field
      try {
        new URL(url.startsWith('http') ? url : `https://${url}`);
        return true;
      } catch {
        return false;
      }
    }, "Please enter a valid website URL")
    .optional(),
  
  address: z
    .string()
    .trim()
    .max(500, "Address must be less than 500 characters")
    .refine((address) => !/[<>'";&]/.test(address), "Address contains invalid characters")
    .optional(),
});

// Client information validation schema
export const clientInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Client name is required")
    .max(100, "Client name must be less than 100 characters")
    .refine((name) => !/[<>'";&]/.test(name), "Client name contains invalid characters"),
  
  company: z
    .string()
    .trim()
    .max(100, "Company name must be less than 100 characters")
    .refine((company) => !company || !/[<>'";&]/.test(company), "Company name contains invalid characters")
    .optional(),
  
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(255, "Email must be less than 255 characters")
    .email("Please enter a valid email address"),
  
  address: z
    .string()
    .trim()
    .max(500, "Address must be less than 500 characters")
    .refine((address) => !address || !/[<>'";&]/.test(address), "Address contains invalid characters")
    .optional(),
});

// Invoice metadata validation schema
export const invoiceMetaSchema = z.object({
  number: z
    .string()
    .trim()
    .min(1, "Invoice number is required")
    .max(50, "Invoice number must be less than 50 characters")
    .regex(/^[A-Za-z0-9\-_]+$/, "Invoice number can only contain letters, numbers, hyphens, and underscores"),
  
  issueDate: z
    .string()
    .min(1, "Issue date is required")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Please enter a valid date"),
  
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime());
    }, "Please enter a valid date"),
  
  terms: z
    .string()
    .trim()
    .min(1, "Payment terms are required")
    .max(100, "Payment terms must be less than 100 characters"),
});

// Line item validation schema
export const lineItemSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters")
    .refine((desc) => !/[<>'";&]/.test(desc), "Description contains invalid characters"),
  
  qty: z
    .number()
    .min(0, "Quantity must be 0 or greater")
    .max(999999, "Quantity must be less than 1,000,000"),
  
  rate: z
    .number()
    .min(0, "Rate must be 0 or greater")
    .max(999999, "Rate must be less than $1,000,000"),
  
  taxable: z.boolean().optional(),
});

// Invoice totals validation schema
export const invoiceTotalsSchema = z.object({
  taxRate: z
    .number()
    .min(0, "Tax rate must be 0% or greater")
    .max(100, "Tax rate must be 100% or less"),
  
  discount: z
    .number()
    .min(0, "Discount must be 0 or greater")
    .max(999999, "Discount must be less than $1,000,000"),
  
  shipping: z
    .number()
    .min(0, "Shipping cost must be 0 or greater")
    .max(999999, "Shipping cost must be less than $1,000,000"),
});

// Complete invoice validation schema
export const completeInvoiceSchema = z.object({
  business: businessInfoSchema,
  client: clientInfoSchema,
  meta: invoiceMetaSchema,
  items: z.array(lineItemSchema).min(1, "At least one line item is required"),
  totals: invoiceTotalsSchema,
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be less than 1000 characters")
    .refine((notes) => !notes || !/[<>'";&]/.test(notes), "Notes contain invalid characters")
    .optional(),
  accent: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Please enter a valid hex color code"),
  watermark: z.boolean(),
});

// Validation helper functions
export const validateField = async (schema: z.ZodSchema, data: any) => {
  try {
    await schema.parseAsync(data);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        isValid: false, 
        error: error.errors[0]?.message || "Validation failed" 
      };
    }
    return { isValid: false, error: "Unknown validation error" };
  }
};

export const validateMultipleFields = async (validations: Array<{ schema: z.ZodSchema, data: any, field: string }>) => {
  const errors: Record<string, string> = {};
  
  for (const validation of validations) {
    const result = await validateField(validation.schema, validation.data);
    if (!result.isValid && result.error) {
      errors[validation.field] = result.error;
    }
  }
  
  return { isValid: Object.keys(errors).length === 0, errors };
};