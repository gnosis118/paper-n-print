import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Download, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface CSVColumn {
  name: string;
  sample: string;
}

interface ImportError {
  row: number;
  field: string;
  message: string;
}

interface ImportResult {
  success: boolean;
  imported: number;
  updated: number;
  skipped: number;
  errors: ImportError[];
  duplicates?: Array<{ email: string; row: number }>;
}

const FIELD_OPTIONS = [
  { value: 'name', label: 'Name' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'company', label: 'Company' },
  { value: 'address', label: 'Address' },
  { value: 'notes', label: 'Notes' },
  { value: 'ignore', label: '-- Ignore Column --' },
];

export default function ClientImport({ onImportComplete }: { onImportComplete?: () => void }) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'upload' | 'map' | 'validate' | 'confirm' | 'result'>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [csvColumns, setCsvColumns] = useState<CSVColumn[]>([]);
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});
  const [duplicateAction, setDuplicateAction] = useState<'skip' | 'update' | 'import'>('skip');
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = async (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.csv')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a CSV file',
        variant: 'destructive',
      });
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'File size must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setFile(selectedFile);

    // Parse CSV headers
    const text = await selectedFile.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const sampleRow = lines[1]?.split(',').map(h => h.trim().replace(/"/g, '')) || [];

    const columns: CSVColumn[] = headers.map((name, index) => ({
      name,
      sample: sampleRow[index] || '',
    }));

    setCsvColumns(columns);

    // Auto-map common column names
    const autoMapping: Record<string, string> = {};
    headers.forEach(header => {
      const lower = header.toLowerCase();
      if (lower.includes('name') && !lower.includes('company')) {
        autoMapping[header] = 'name';
      } else if (lower.includes('email') || lower.includes('e-mail')) {
        autoMapping[header] = 'email';
      } else if (lower.includes('phone') || lower.includes('mobile') || lower.includes('tel')) {
        autoMapping[header] = 'phone';
      } else if (lower.includes('company') || lower.includes('business')) {
        autoMapping[header] = 'company';
      } else if (lower.includes('address')) {
        autoMapping[header] = 'address';
      } else if (lower.includes('note')) {
        autoMapping[header] = 'notes';
      }
    });

    setFieldMapping(autoMapping);
    setStep('map');
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    setProgress(0);
    setStep('confirm');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('duplicateAction', duplicateAction);
      formData.append('fieldMapping', JSON.stringify(fieldMapping));

      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('Not authenticated');
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/import-clients`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: formData,
        }
      );

      clearInterval(progressInterval);
      setProgress(100);

      const importResult: ImportResult = await response.json();
      setResult(importResult);
      setStep('result');

      if (importResult.success) {
        toast({
          title: 'Import complete',
          description: `${importResult.imported} clients imported successfully${importResult.updated > 0 ? `, ${importResult.updated} updated` : ''}${importResult.skipped > 0 ? `, ${importResult.skipped} skipped` : ''}`,
        });

        if (onImportComplete) {
          onImportComplete();
        }
      }
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: 'Import failed',
        description: error instanceof Error ? error.message : 'An error occurred during import',
        variant: 'destructive',
      });
      setStep('upload');
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const template = 'name,email,phone,company,address,notes\nJohn Doe,john@example.com,555-1234,Acme Inc,123 Main St,VIP client\nJane Smith,jane@example.com,555-5678,Tech Corp,456 Oak Ave,New customer';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'client-import-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetImport = () => {
    setStep('upload');
    setFile(null);
    setCsvColumns([]);
    setFieldMapping({});
    setResult(null);
    setProgress(0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Import Clients
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Clients from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file to bulk import your clients
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Upload */}
        {step === 'upload' && (
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Drop your CSV file here</p>
              <p className="text-sm text-muted-foreground mb-4">or</p>
              <Button
                variant="outline"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <FileText className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              <input
                id="file-input"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
              <p className="text-xs text-muted-foreground mt-4">
                Maximum file size: 5MB
              </p>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="text-sm font-medium">Need a template?</span>
              </div>
              <Button variant="link" size="sm" onClick={downloadTemplate}>
                Download Sample CSV
              </Button>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Required columns:</strong> name, email<br />
                <strong>Optional columns:</strong> phone, company, address, notes
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Step 2: Map Fields */}
        {step === 'map' && (
          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Map CSV Columns to Fields</h3>
              <p className="text-sm text-muted-foreground">
                Match your CSV columns to the correct client fields
              </p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {csvColumns.map((column) => (
                <div key={column.name} className="grid grid-cols-3 gap-4 items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{column.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      Sample: {column.sample || 'N/A'}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Select
                      value={fieldMapping[column.name] || 'ignore'}
                      onValueChange={(value) =>
                        setFieldMapping({ ...fieldMapping, [column.name]: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        {FIELD_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={resetImport}>
                Cancel
              </Button>
              <Button onClick={() => setStep('validate')}>
                Next: Validate
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Validate & Configure */}
        {step === 'validate' && (
          <div className="space-y-4">
            <div className="mb-4">
              <h3 className="font-medium mb-2">Import Settings</h3>
              <p className="text-sm text-muted-foreground">
                Configure how to handle duplicate clients
              </p>
            </div>

            <div className="space-y-2">
              <Label>If duplicate email found:</Label>
              <Select value={duplicateAction} onValueChange={(value: any) => setDuplicateAction(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skip">Skip - Don't import duplicates</SelectItem>
                  <SelectItem value="update">Update - Overwrite existing data</SelectItem>
                  <SelectItem value="import">Import - Create duplicate entry</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>File:</strong> {file?.name}<br />
                <strong>Size:</strong> {((file?.size || 0) / 1024).toFixed(2)} KB<br />
                <strong>Columns detected:</strong> {csvColumns.length}
              </AlertDescription>
            </Alert>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep('map')}>
                Back
              </Button>
              <Button onClick={handleImport} disabled={importing}>
                Start Import
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Importing (Progress) */}
        {step === 'confirm' && (
          <div className="space-y-4 py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <h3 className="font-medium mb-2">Importing clients...</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please wait while we process your file
              </p>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-muted-foreground mt-2">{progress}%</p>
            </div>
          </div>
        )}

        {/* Step 5: Results */}
        {step === 'result' && result && (
          <div className="space-y-4">
            <div className="text-center py-4">
              {result.success ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <h3 className="text-xl font-bold mb-2">
                {result.success ? 'Import Complete!' : 'Import Failed'}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{result.imported}</p>
                <p className="text-sm text-muted-foreground">Imported</p>
              </div>
              {result.updated > 0 && (
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{result.updated}</p>
                  <p className="text-sm text-muted-foreground">Updated</p>
                </div>
              )}
              {result.skipped > 0 && (
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{result.skipped}</p>
                  <p className="text-sm text-muted-foreground">Skipped</p>
                </div>
              )}
            </div>

            {result.errors.length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium mb-2 text-red-600">Errors ({result.errors.length})</h4>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {result.errors.slice(0, 10).map((error, index) => (
                    <Alert key={index} variant="destructive">
                      <AlertDescription>
                        <strong>Row {error.row}:</strong> {error.message} ({error.field})
                      </AlertDescription>
                    </Alert>
                  ))}
                  {result.errors.length > 10 && (
                    <p className="text-sm text-muted-foreground text-center">
                      ... and {result.errors.length - 10} more errors
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={resetImport}>
                Import Another File
              </Button>
              <Button onClick={() => setIsOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

