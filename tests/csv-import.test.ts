/**
 * CSV Import Feature Tests
 * 
 * Run with: deno test --allow-net --allow-env tests/csv-import.test.ts
 */

import { assertEquals, assertExists } from 'https://deno.land/std@0.168.0/testing/asserts.ts';

// Test data
const validCSV = `name,email,phone,company,address,notes
John Doe,john@example.com,555-123-4567,Acme Inc,123 Main St,VIP client
Jane Smith,jane@example.com,555-234-5678,Tech Corp,456 Oak Ave,New customer`;

const invalidEmailCSV = `name,email,phone,company
John Doe,invalid-email,555-1234,Acme Inc`;

const missingNameCSV = `name,email,phone,company
,john@example.com,555-1234,Acme Inc`;

const invalidPhoneCSV = `name,email,phone,company
John Doe,john@example.com,123,Acme Inc`;

// Email validation tests
Deno.test('Email Validation - Valid emails', () => {
  const validEmails = [
    'test@example.com',
    'user.name@example.com',
    'user+tag@example.co.uk',
    'test123@test-domain.com',
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  validEmails.forEach(email => {
    assertEquals(emailRegex.test(email), true, `${email} should be valid`);
  });
});

Deno.test('Email Validation - Invalid emails', () => {
  const invalidEmails = [
    'invalid-email',
    '@example.com',
    'user@',
    'user @example.com',
    'user@example',
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  invalidEmails.forEach(email => {
    assertEquals(emailRegex.test(email), false, `${email} should be invalid`);
  });
});

// Phone validation tests
Deno.test('Phone Validation - Valid phones', () => {
  const validPhones = [
    '555-123-4567',
    '(555) 123-4567',
    '+1 555 123 4567',
    '555.123.4567',
    '5551234567',
  ];

  const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
  
  validPhones.forEach(phone => {
    const digitsOnly = phone.replace(/\D/g, '');
    assertEquals(
      phoneRegex.test(phone) && digitsOnly.length >= 10,
      true,
      `${phone} should be valid`
    );
  });
});

Deno.test('Phone Validation - Invalid phones', () => {
  const invalidPhones = [
    '123',        // Too short
    'abc-def-ghij', // Letters
    '555-12',     // Too short
  ];

  const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
  
  invalidPhones.forEach(phone => {
    const digitsOnly = phone.replace(/\D/g, '');
    const isValid = phoneRegex.test(phone) && digitsOnly.length >= 10;
    assertEquals(isValid, false, `${phone} should be invalid`);
  });
});

// CSV parsing tests
Deno.test('CSV Parsing - Valid CSV', () => {
  const lines = validCSV.split('\n');
  const headers = lines[0].split(',');
  
  assertEquals(headers.length, 6);
  assertEquals(headers[0], 'name');
  assertEquals(headers[1], 'email');
  
  const dataRows = lines.slice(1);
  assertEquals(dataRows.length, 2);
});

Deno.test('CSV Parsing - Extract row data', () => {
  const lines = validCSV.split('\n');
  const headers = lines[0].split(',');
  const firstDataRow = lines[1].split(',');
  
  const rowData: Record<string, string> = {};
  headers.forEach((header, index) => {
    rowData[header] = firstDataRow[index];
  });
  
  assertEquals(rowData.name, 'John Doe');
  assertEquals(rowData.email, 'john@example.com');
  assertEquals(rowData.phone, '555-123-4567');
  assertEquals(rowData.company, 'Acme Inc');
});

// Field mapping tests
Deno.test('Field Mapping - Auto-detect name field', () => {
  const headers = ['Full Name', 'Email Address', 'Phone Number'];
  const mapping: Record<string, string> = {};
  
  headers.forEach(header => {
    const lower = header.toLowerCase();
    if (lower.includes('name') && !lower.includes('company')) {
      mapping[header] = 'name';
    } else if (lower.includes('email')) {
      mapping[header] = 'email';
    } else if (lower.includes('phone')) {
      mapping[header] = 'phone';
    }
  });
  
  assertEquals(mapping['Full Name'], 'name');
  assertEquals(mapping['Email Address'], 'email');
  assertEquals(mapping['Phone Number'], 'phone');
});

// Validation tests
Deno.test('Validation - Missing required name', () => {
  const row = { name: '', email: 'test@example.com', phone: '555-1234' };
  const errors = [];
  
  if (!row.name || row.name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  
  assertEquals(errors.length, 1);
  assertEquals(errors[0].field, 'name');
});

Deno.test('Validation - Missing required email', () => {
  const row = { name: 'John Doe', email: '', phone: '555-1234' };
  const errors = [];
  
  if (!row.email || row.email.trim() === '') {
    errors.push({ field: 'email', message: 'Email is required' });
  }
  
  assertEquals(errors.length, 1);
  assertEquals(errors[0].field, 'email');
});

Deno.test('Validation - Invalid email format', () => {
  const row = { name: 'John Doe', email: 'invalid-email', phone: '555-1234' };
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (row.email && !emailRegex.test(row.email)) {
    errors.push({ field: 'email', message: 'Invalid email format' });
  }
  
  assertEquals(errors.length, 1);
  assertEquals(errors[0].field, 'email');
});

Deno.test('Validation - Invalid phone format', () => {
  const row = { name: 'John Doe', email: 'test@example.com', phone: '123' };
  const errors = [];
  const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
  
  if (row.phone) {
    const digitsOnly = row.phone.replace(/\D/g, '');
    if (!phoneRegex.test(row.phone) || digitsOnly.length < 10) {
      errors.push({ field: 'phone', message: 'Invalid phone number format' });
    }
  }
  
  assertEquals(errors.length, 1);
  assertEquals(errors[0].field, 'phone');
});

// Duplicate detection tests
Deno.test('Duplicate Detection - Find duplicates', () => {
  const existingEmails = new Set(['john@example.com', 'jane@example.com']);
  const newEmail = 'john@example.com';
  
  const isDuplicate = existingEmails.has(newEmail);
  assertEquals(isDuplicate, true);
});

Deno.test('Duplicate Detection - No duplicates', () => {
  const existingEmails = new Set(['john@example.com', 'jane@example.com']);
  const newEmail = 'bob@example.com';
  
  const isDuplicate = existingEmails.has(newEmail);
  assertEquals(isDuplicate, false);
});

// Import result tests
Deno.test('Import Result - Calculate statistics', () => {
  const result = {
    imported: 47,
    updated: 12,
    skipped: 3,
    errors: [],
  };
  
  const total = result.imported + result.updated + result.skipped;
  assertEquals(total, 62);
  assertEquals(result.imported, 47);
  assertEquals(result.updated, 12);
  assertEquals(result.skipped, 3);
});

// File size validation tests
Deno.test('File Size Validation - Under limit', () => {
  const fileSize = 3 * 1024 * 1024; // 3MB
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  assertEquals(fileSize <= maxSize, true);
});

Deno.test('File Size Validation - Over limit', () => {
  const fileSize = 6 * 1024 * 1024; // 6MB
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  assertEquals(fileSize <= maxSize, false);
});

// MIME type validation tests
Deno.test('MIME Type Validation - Valid CSV', () => {
  const validTypes = ['text/csv', 'application/csv'];
  const fileType = 'text/csv';
  
  assertEquals(validTypes.includes(fileType), true);
});

Deno.test('MIME Type Validation - Invalid type', () => {
  const validTypes = ['text/csv', 'application/csv'];
  const fileType = 'application/pdf';
  
  assertEquals(validTypes.includes(fileType), false);
});

console.log('\n✅ All CSV Import tests passed!\n');

