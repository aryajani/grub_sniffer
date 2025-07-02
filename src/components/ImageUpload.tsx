import { useState, useCallback } from 'react';
import { Upload, Image, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const ImageUpload = ({ onImageUpload, isAnalyzing }: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileSelect(imageFile);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageUpload(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-primary bg-gradient-subtle' 
            : 'border-border hover:border-primary/50'
          }
          ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="space-y-4">
            <img
              src={previewUrl}
              alt="Menu preview"
              className="max-h-64 mx-auto rounded-lg shadow-md"
            />
            {!isAnalyzing && (
              <Button
                variant="outline"
                onClick={() => {
                  setPreviewUrl(null);
                  URL.revokeObjectURL(previewUrl);
                }}
              >
                Upload Different Image
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-primary rounded-full shadow-purple">
                <Upload className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Upload Menu Image
              </h3>
              <p className="text-muted-foreground">
                Drag and drop your menu image here, or click to browse
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="default"
                className="bg-gradient-primary hover:opacity-90 shadow-purple"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <Image className="mr-2 h-4 w-4" />
                Choose Image
              </Button>
              
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>

            <div className="text-sm text-muted-foreground">
              Supports JPG, PNG, and other image formats
            </div>
          </div>
        )}

        {isAnalyzing && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-r-transparent rounded-full"></div>
              <div className="flex items-center space-x-2 text-primary font-medium">
                <FileText className="h-4 w-4" />
                <span>Analyzing menu...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};