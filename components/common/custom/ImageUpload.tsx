'use client';

import { cn } from '@/lib/index';
import { Plus, ImageIcon, Trash2 } from 'lucide-react'
import Image from 'next/image';
import { ChangeEvent, useRef, useState, MouseEvent, useCallback } from 'react';

interface UploadImageProps {
	disabled?: boolean;
	value?: string;
	onChange: (file: File | null) => void;
}

export const ImageUpload = ({ disabled, value, onChange }: UploadImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
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
      className={cn('w-min flex justify-center items-center', isDragOver ? 'border-dashed border-2 p-4 rounded-xl text-center h-30 animate-pulse bg-muted' : '')}
    >
			<input disabled={disabled} ref={inputRef} type="file" accept="image/*" className='hidden' onChange={handleFileChange} />

			{isDragOver ? (
        <p>Kéo thả ảnh tại đây</p>
      ) : (
        <>
          {!preview ? (
            <div className="group cursor-pointer w-min">
              <button disabled={disabled} onClick={onChooseImage} className="relative">
                <div className="w-30 h-30 rounded-full border-2 border-dashed flex items-center justify-center bg-muted transition-colors group-hover:border-[#9CA3AF]">
                  <ImageIcon size={40} className="text-muted-foreground" />
                </div>
                <div className="absolute bottom-1.5 right-1.5 bg-foreground text-accent rounded-full p-1">
                  <Plus size={14} strokeWidth={3} />
                </div>
              </button>
            </div>
          ) : (
            <div className="relative">
              <Image src={preview} width={100} height={100} alt="Profile Preview" className="w-30 h-30 rounded-full object-cover" />

              <button 
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
    </div>
  )
}
