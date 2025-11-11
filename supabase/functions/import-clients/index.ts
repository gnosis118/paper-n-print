import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { parse } from 'https://deno.land/std@0.168.0/encoding/csv.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ImportRow {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
}

interface ValidationError {
  row: number;
  field: string;
  message: string;
  data: ImportRow;
}

interface ImportResult {
  success: boolean;
  imported: number;
  skipped: number;
  updated: number;
  errors: ValidationError[];
  duplicates?: Array<{ email: string; row: number }>;
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Phone validation (basic - allows various formats)
function isValidPhone(phone: string): boolean {
  if (!phone || phone.trim() === '') return true; // Optional field
  const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Validate a single row
function validateRow(row: ImportRow, rowNumber: number): ValidationError[] {
  const errors: ValidationError[] = [];

  // Name is required
  if (!row.name || row.name.trim() === '') {
    errors.push({
      row: rowNumber,
      field: 'name',
      message: 'Name is required',
      data: row,
    });
  }

  // Email is required and must be valid
  if (!row.email || row.email.trim() === '') {
    errors.push({
      row: rowNumber,
      field: 'email',
      message: 'Email is required',
      data: row,
    });
  } else if (!isValidEmail(row.email)) {
    errors.push({
      row: rowNumber,
      field: 'email',
      message: 'Invalid email format',
      data: row,
    });
  }

  // Phone validation (if provided)
  if (row.phone && !isValidPhone(row.phone)) {
    errors.push({
      row: rowNumber,
      field: 'phone',
      message: 'Invalid phone number format',
      data: row,
    });
  }

  return errors;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get authenticated user
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      throw new Error('Unauthorized');
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const duplicateAction = formData.get('duplicateAction') as string || 'skip'; // skip, update, import
    const fieldMapping = JSON.parse(formData.get('fieldMapping') as string || '{}');

    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Validate MIME type
    if (!file.type.includes('csv') && !file.name.endsWith('.csv')) {
      throw new Error('Invalid file type. Please upload a CSV file');
    }

    // Read and parse CSV
    const text = await file.text();
    const records = parse(text, {
      skipFirstRow: true,
      columns: Object.keys(fieldMapping).length > 0 ? undefined : ['name', 'email', 'phone', 'company', 'address', 'notes'],
    }) as ImportRow[];

    // Apply field mapping if provided
    let mappedRecords = records;
    if (Object.keys(fieldMapping).length > 0) {
      mappedRecords = records.map(record => {
        const mapped: any = {};
        for (const [csvColumn, dbField] of Object.entries(fieldMapping)) {
          mapped[dbField] = record[csvColumn as keyof ImportRow];
        }
        return mapped;
      });
    }

    // Validate all rows
    const validationErrors: ValidationError[] = [];
    const validRows: ImportRow[] = [];

    mappedRecords.forEach((row, index) => {
      const rowErrors = validateRow(row, index + 2); // +2 because row 1 is header, array is 0-indexed
      if (rowErrors.length > 0) {
        validationErrors.push(...rowErrors);
      } else {
        validRows.push(row);
      }
    });

    // Check for duplicates in database
    const emails = validRows.map(row => row.email!).filter(Boolean);
    const { data: existingClients } = await supabaseClient
      .from('clients')
      .select('email')
      .eq('user_id', user.id)
      .in('email', emails);

    const existingEmails = new Set(existingClients?.map(c => c.email) || []);
    const duplicates: Array<{ email: string; row: number }> = [];

    // Process rows based on duplicate action
    let imported = 0;
    let updated = 0;
    let skipped = 0;

    for (let i = 0; i < validRows.length; i++) {
      const row = validRows[i];
      const isDuplicate = existingEmails.has(row.email!);

      if (isDuplicate) {
        duplicates.push({ email: row.email!, row: i + 2 });

        if (duplicateAction === 'skip') {
          skipped++;
          continue;
        } else if (duplicateAction === 'update') {
          // Update existing client
          const { error } = await supabaseClient
            .from('clients')
            .update({
              name: row.name,
              phone: row.phone || null,
              company: row.company || null,
              address: row.address || null,
              notes: row.notes || null,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id)
            .eq('email', row.email);

          if (error) {
            validationErrors.push({
              row: i + 2,
              field: 'database',
              message: `Failed to update: ${error.message}`,
              data: row,
            });
            skipped++;
          } else {
            updated++;
          }
          continue;
        }
        // If 'import', fall through to insert as new
      }

      // Insert new client
      const { error } = await supabaseClient.from('clients').insert({
        user_id: user.id,
        name: row.name,
        email: row.email,
        phone: row.phone || null,
        company: row.company || null,
        address: row.address || null,
        notes: row.notes || null,
      });

      if (error) {
        validationErrors.push({
          row: i + 2,
          field: 'database',
          message: `Failed to insert: ${error.message}`,
          data: row,
        });
        skipped++;
      } else {
        imported++;
      }
    }

    const result: ImportResult = {
      success: true,
      imported,
      updated,
      skipped: skipped + validationErrors.length,
      errors: validationErrors,
      duplicates: duplicates.length > 0 ? duplicates : undefined,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Import error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        imported: 0,
        skipped: 0,
        updated: 0,
        errors: [],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

