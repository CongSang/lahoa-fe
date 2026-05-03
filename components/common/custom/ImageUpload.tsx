'use client';

import { cn } from '@/lib/index';
import { Plus, ImageIcon, Trash2, Eye, X } from 'lucide-react'
import Image from 'next/image';
import { ChangeEvent, useRef, useState, MouseEvent, useCallback } from 'react';

interface UploadImageProps {
	insideDialog?: boolean;
	disabled?: boolean;
	value?: string;
	onChange: (file: File | null) => void;
}

export const ImageUpload = ({ insideDialog = true, disabled, value, onChange }: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [fullPreview, setFullPreview] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleFile = useCallback((file: File | null) => {
    if (preview) URL.revokeObjectURL(preview);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }

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
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn('w-min flex justify-center items-center mb-4', isDragOver ? 'border-dashed border-2 p-4 rounded-xl text-center h-30 animate-pulse bg-muted' : '')}
    >
			<input disabled={disabled} ref={inputRef} type="file" accept="image/*" className='hidden' onChange={handleFileChange} />

			{isDragOver ? (
        <p>Kéo thả ảnh tại đây</p>
      ) : (
        <>
          {!preview ? (
            <div className="group cursor-pointer w-min">
              <button type="button" disabled={disabled} onClick={onChooseImage} className="relative">
                <div className="w-30 h-30 rounded-full border-2 border-dashed flex items-center justify-center bg-muted transition-colors group-hover:border-[#9CA3AF]">
                  <ImageIcon size={40} className="text-muted-foreground" />
                </div>
                <div className="absolute bottom-1.5 right-1.5 bg-foreground text-accent rounded-full p-1">
                  <Plus size={14} strokeWidth={3} />
                </div>
              </button>
            </div>
          ) : (
            <div className="relative group">
              <Image 
                src={preview} 
                width={100} 
                height={100} 
                alt="Profile Preview" 
                className="w-30 h-30 rounded-full object-cover" 
              />

              <div
                onClick={() => setFullPreview(true)}
                className="absolute inset-0 bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
              >
                <Eye />
              </div>

              <button 
                type="button"
                disabled={disabled}
                onClick={handleRemoveImage} 
                className="absolute bg-red-700 text-white rounded-full bottom-1.5 right-1.5 p-1"
              >
                <Trash2 size={14} />
              </button>			
            </div>
          )}
        </>
      )}

      {fullPreview && preview && (
        <div
          className={cn("fixed inset-0 bg-black/60 isolate flex items-center justify-center z-50", insideDialog ? "rounded-xl" : "")}
          onClick={() => setFullPreview(false)}
        >
          <div className="relative">
            <Image
              src={preview}
              width={800}
              height={800}
              alt="Full Preview"
              className="max-w-[100vw] max-h-screen object-contain rounded-lg"
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
  )
}
