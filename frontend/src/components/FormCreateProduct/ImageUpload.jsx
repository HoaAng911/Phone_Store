'use client';

import React from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const ImageUpload = ({ file, setFile, preview, setPreview }) => {
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    
    // Validate file type
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(f.type)) {
      alert('Chỉ chấp nhận ảnh JPG, PNG, WebP, GIF');
      return;
    }
    
    // Validate file size (5MB)
    if (f.size > 5 * 1024 * 1024) {
      alert('File quá 5MB');
      return;
    }
    
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    // Clear input
    const fileInput = document.getElementById('file-upload');
    if (fileInput) fileInput.value = '';
  };

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <Label className="text-sm font-medium text-foreground mb-4 block">
          Hình ảnh sản phẩm <span className="text-destructive">*</span>
        </Label>

        <div className="space-y-4">
          <div className="relative">
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <label
              htmlFor="file-upload"
              className={`
                block w-full max-w-sm cursor-pointer transition-all duration-200
                ${preview 
                  ? 'border border-border rounded-lg overflow-hidden' 
                  : 'border-2 border-dashed border-input rounded-lg hover:border-primary hover:bg-accent'
                }
              `}
            >
              {preview ? (
                <div className="relative group">
                  <AspectRatio ratio={1}>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </AspectRatio>
                  
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                  
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <div className="text-sm text-muted-foreground">
                    <p>Nhấp để tải ảnh lên</p>
                    <p className="text-xs mt-1">JPG, PNG, WebP, GIF (tối đa 5MB)</p>
                  </div>
                </div>
              )}
            </label>
          </div>

          {file && (
            <div className="flex items-center justify-center text-xs text-muted-foreground pt-2">
              📁 {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;