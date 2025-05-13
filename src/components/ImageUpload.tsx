'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  currentImage?: string;
  onUpload: (url: string) => Promise<void>;
  disabled?: boolean;
}

export default function ImageUpload({
  currentImage,
  onUpload,
  disabled,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // TODO: Implement actual file upload logic here
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file);
      await onUpload(url);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <Label
          htmlFor="image-upload"
          className={cn(
            'cursor-pointer rounded-lg border-2 border-dashed p-4 hover:border-primary',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentImage ? 'Change Image' : 'Upload Image'}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Select File'}
            </Button>
          </div>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled || isUploading}
          />
        </Label>
      </div>
    </div>
  );
} 