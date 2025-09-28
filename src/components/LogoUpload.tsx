import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X, Image } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface LogoUploadProps {
  currentLogoUrl?: string;
  onLogoChange: (logoUrl: string | null) => void;
  disabled?: boolean;
}

export function LogoUpload({ currentLogoUrl, onLogoChange, disabled }: LogoUploadProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (PNG, JPG, etc.).",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/logo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('logos')
        .getPublicUrl(fileName);

      onLogoChange(publicUrl);

      toast({
        title: "Logo uploaded",
        description: "Your logo has been uploaded successfully.",
      });
    } catch (error: any) {
      console.error('Error uploading logo:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload logo.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveLogo = async () => {
    if (!user || !currentLogoUrl) return;

    setUploading(true);

    try {
      // Extract file path from URL
      const url = new URL(currentLogoUrl);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];
      const filePath = `${user.id}/${fileName}`;

      const { error } = await supabase.storage
        .from('logos')
        .remove([filePath]);

      if (error) throw error;

      onLogoChange(null);

      toast({
        title: "Logo removed",
        description: "Your logo has been removed.",
      });
    } catch (error: any) {
      console.error('Error removing logo:', error);
      toast({
        title: "Failed to remove logo",
        description: error.message || "Failed to remove logo.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Business Logo (Paid Plans Only)</Label>
      
      {currentLogoUrl ? (
        <div className="flex items-start space-x-4">
          <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={currentLogoUrl}
              alt="Business logo"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || uploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              Change Logo
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveLogo}
              disabled={disabled || uploading}
              className="text-destructive hover:text-destructive"
            >
              <X className="w-4 h-4 mr-2" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div 
          className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          <Image className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 text-center">
            {disabled 
              ? "Upgrade to a paid plan to upload your logo"
              : "Click to upload your business logo"
            }
          </p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        disabled={disabled || uploading}
      />

      {disabled && (
        <p className="text-sm text-amber-600">
          Logo upload is available for Starter, Pro, and Agency plans.
        </p>
      )}
    </div>
  );
}