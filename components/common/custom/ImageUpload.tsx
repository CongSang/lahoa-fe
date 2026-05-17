'use client';

import { cn, formatFileSize } from '@/lib/index';
import { Plus, ImageIcon, Trash2, Eye, X } from 'lucide-react'
import Image from 'next/image';
import { ChangeEvent, useRef, useState, MouseEvent, useCallback, useMemo } from 'react';

interface UploadImageProps {
	insideDialog?: boolean;
	disabled?: boolean;
	value?: string | File;
	onChange: (file: File | null) => void;
  className?: string;
  btnClassName?: string;
  modalClassName?: string;
}

const optimizeCloudinary = (
  url: string,
  size = 400
) => {
  if (!url.includes("cloudinary")) return url;

  return url.replace(
    "/upload/",
    `/upload/w_${size},h_${size},c_fill,f_auto,q_auto/`
  );
};

export const ImageUpload = ({
  disabled, 
  value, 
  onChange, 
  className = "w-30 h-30 rounded-full",
  btnClassName = "",
  modalClassName = "rounded-xl",
}: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fullPreview, setFullPreview] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState(false);

  const preview = useMemo(() => {
    if (!value) return null;

    if (value instanceof File) {
      return URL.createObjectURL(value);
    }

    return value;
  }, [value]);

  const imageMeta = useMemo(() => {
    if (value instanceof File) {
      return {
        size: value.size,
        type: value.type,
      };
    } else {
      return null;
    }
  }, [value]);

  const handleFile = useCallback((file: File | null) => {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setImageLoading(!!file);
    onChange(file);
  }, [onChange, preview]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if(disabled) return;
    setIsDragOver(false)
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if(disabled) return;
    setIsDragOver(true)
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if(disabled) return;
    setIsDragOver(false)
  };

  const handleRemoveImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleFile(null)
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onChooseImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  return (
    <div className='flex flex-col sm:flex-row items-start justify-start gap-2 sm:gap-6'>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          'w-min flex justify-center items-center', 
          isDragOver 
            && 'border-dashed border-2 p-4 rounded-xl text-center h-30 animate-pulse bg-muted'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          disabled={disabled}
          onChange={handleFileChange}
        />

        {isDragOver ? (
          <p>Kéo thả ảnh tại đây</p>
        ) : !preview ? (
          <button 
            type="button" 
            disabled={disabled} 
            onClick={onChooseImage} 
            className="relative group cursor-pointer"
          >
            <div 
              className={cn(
                "border-2 border-dashed flex items-center justify-center bg-muted transition-colors group-hover:border-[#9CA3AF]", 
                className
              )}
            >
              <ImageIcon size={40} className="text-muted-foreground" />
            </div>
            <div 
              className={cn(
                "absolute bottom-1.5 right-1.5 bg-foreground text-accent rounded-full p-1", 
                btnClassName
              )}
            >
              <Plus size={14} strokeWidth={3} />
            </div>
          </button>
        ) : (
          <div className={cn("relative group", className)}>
            {imageLoading && (
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-muted animate-pulse z-20",
                  className
                )}
              >
              </div>
            )}

            <Image 
              src={optimizeCloudinary(preview)} 
              width={100} 
              height={100} 
              alt="Upload Image Preview"
              priority
              unoptimized
              onLoad={() =>
                setImageLoading(false)
              }
              className={cn(
                "object-cover w-full h-full transition-opacity duration-300",
                imageLoading
                  ? "opacity-0"
                  : "opacity-100",
                className
              )}
            />

            <div
              onClick={() => setFullPreview(true)}
              className={cn(
                "absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer", 
                disabled && "cursor-not-allowed", className
              )}
            >
              <Eye />
            </div>

            <button 
              type="button"
              disabled={disabled}
              onClick={handleRemoveImage} 
              className={cn(
                "absolute bg-red-700 text-white rounded-full bottom-1.5 right-1.5 p-1 z-10", 
                btnClassName
              )}
            >
              <Trash2 size={14} />
            </button>	
          </div>	
        )}

        {fullPreview && preview && (
          <div
            className={cn(
              "fixed inset-0 bg-black/60 isolate flex items-center justify-center z-50", 
              modalClassName
            )}
            onClick={() => setFullPreview(false)}
          >
            <div className="relative">
              <Image
                src={optimizeCloudinary(preview, 1000)}
                width={800}
                height={800}
                alt="Full Image Preview"
                className="max-w-[100vw] max-h-screen object-contain rounded-lg"
                unoptimized
              />

              <button
                type="button"
                onClick={() => setFullPreview(false)}
                className="absolute top-2 right-2 bg-white/50 text-white p-2 rounded"
              >
                <X />
              </button>
            </div>
          </div>
        )}
      </div>

      {imageMeta && (
        <div className="text-xs text-muted-foreground space-y-1">
          <div className='text-accent-foreground font-medium'>Thông tin ảnh</div>
          <div>
            Dung lượng: {formatFileSize(imageMeta.size || 0)}
          </div>

          <div>
            Loại: {imageMeta.type}
          </div>
        </div>
      )}
    </div>
  )
}
