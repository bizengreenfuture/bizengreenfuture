'use client';

import { useState } from 'react';
import { UploadDropzone } from '@/utils/uploadthing';
import { X, ImageIcon, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  endpoint?: 'imageUploader' | 'galleryUploader' | 'partnerLogoUploader';
}

export default function ImageUploader({
  value,
  onChange,
  onRemove,
  endpoint = 'imageUploader',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  if (value) {
    return (
      <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
        <Image
          src={value}
          alt="Uploaded image"
          fill
          className="object-cover"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8"
          onClick={() => {
            onChange('');
            onRemove?.();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (res?.[0]) {
            onChange(res[0].ufsUrl);
          }
          setIsUploading(false);
        }}
        onUploadError={(error: Error) => {
          console.error('Upload error:', error);
          setIsUploading(false);
        }}
        onUploadBegin={() => {
          setIsUploading(true);
        }}
        appearance={{
          container:
            'border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-400 transition-colors cursor-pointer bg-gray-50',
          uploadIcon: 'text-gray-400',
          label: 'text-gray-600 hover:text-green-600',
          allowedContent: 'text-gray-500 text-sm',
          button:
            'bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition-colors ut-uploading:bg-green-600/50',
        }}
        content={{
          label: 'Drop an image here or click to browse',
          allowedContent: endpoint === 'partnerLogoUploader' ? 'Images up to 2MB' : endpoint === 'galleryUploader' ? 'Images up to 8MB' : 'Images up to 4MB',
        }}
      />
      {/* UX Hint */}
      <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-700">
          <span className="font-medium">Tip:</span> After selecting your image, click the <span className="font-semibold">"Upload"</span> button to complete the upload.
        </p>
      </div>
    </div>
  );
}
