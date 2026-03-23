'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Image as ImageIcon, Loader, Pencil, Trash2 } from 'lucide-react';
import { cn, convertFileSize, getUploadPlaceholderImg } from '@/lib/utils';
import { ClassNameValue } from 'tailwind-merge';
import { toast } from 'sonner';
import { Button, Input } from '@/components';
import Image from 'next/image';
import { ACCEPTED_IMG_TYPES, LENGTH_CONSTANTS } from '@/constants';

interface IDraggerInputProps<
  T extends FieldValues,
> extends React.ComponentProps<'input'> {
  className?: string;
  validFileTypes?: File['type'][];
  validFileSize?: number;
  uploadPreSign?: (file: File) => Promise<string | undefined>;
  loading?: boolean;
  disabled?: boolean;
  maxFiles?: number;
  classNames?: {
    img?: ClassNameValue;
    imgSubtitle?: ClassNameValue;
    preview?: ClassNameValue;
  };
  showMessage?: boolean;
  showPreview?: boolean;
  formMethods: UseFormReturn<T>;
  uploadText?: string;
  name?: Path<T>;
}

const AppDragger = <T extends FieldValues>({
  className,
  validFileTypes = ACCEPTED_IMG_TYPES,
  validFileSize = LENGTH_CONSTANTS.MAX_FILE_SIZE,
  uploadPreSign,
  loading,
  disabled,
  classNames,
  showMessage = false,
  formMethods,
  uploadText,
  ...props
}: IDraggerInputProps<T>) => {
  const { setValue, getValues, setError } = formMethods;
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentValue = getValues(props.name!);

  const currentFile = useMemo<File | string | null>(() => {
    if (!currentValue) return null;
    if (Array.isArray(currentValue)) {
      return (currentValue.filter(Boolean) as Array<File | string>)[0];
    }
    return currentValue as File | string;
  }, [currentValue]);

  const previewSrc = useMemo(
    () => getUploadPlaceholderImg(currentFile),
    [currentFile]
  );

  const validateFile = useCallback(
    async (file: File): Promise<{ valid: boolean; error?: string }> => {
      const isValidType = validFileTypes
        ? validFileTypes.includes(file.type)
        : true;
      const isValidSize = file.size < validFileSize;

      if (!isValidType) {
        return { valid: false, error: 'Invalid file type.' };
      }
      if (!isValidSize) {
        return {
          valid: false,
          error: `Max file size is ${convertFileSize(validFileSize, 'MB').toFixed(0)} MB.`,
        };
      }
      return { valid: true };
    },
    [validFileTypes, validFileSize]
  );

  const handleFileUpload = useCallback(
    async (file: File): Promise<string | File | undefined> => {
      if (uploadPreSign) {
        return await uploadPreSign(file);
      }
      return file;
    },
    [uploadPreSign]
  );

  const writeValue = useCallback(
    (value: File | string | null) => {
      const existing = getValues(props.name!);
      const nextValue = Array.isArray(existing)
        ? value
          ? [value]
          : []
        : value;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(props.name!, nextValue as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [getValues, props.name, setValue]
  );

  const setUploadedFile = useCallback(
    async (file: File) => {
      const validation = await validateFile(file);
      if (!validation.valid) {
        if (showMessage) toast.error(validation.error);
        setError(props.name!, { message: validation.error });
        return;
      }

      const result = await handleFileUpload(file);
      if (result) {
        writeValue(result);
      }
    },
    [
      handleFileUpload,
      props.name,
      setError,
      showMessage,
      validateFile,
      writeValue,
    ]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        setUploadedFile(files[0]);
      }
    },
    [disabled, setUploadedFile, setIsDragging]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragging(true);
      }
    },
    [disabled, setIsDragging]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    },
    [setIsDragging]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        setUploadedFile(files[0]);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [setUploadedFile]
  );

  const handleClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  const handleDelete = useCallback(() => {
    writeValue(null);
  }, [writeValue]);

  return (
    <div className={cn('w-full', className)}>
      <Input
        ref={fileInputRef}
        type="file"
        multiple={false}
        accept={validFileTypes?.join(',') || '*'}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />

      <div
        className={cn(
          'bg-body-bg border-primary/40 group flex-center relative min-h-52 rounded-2xl border-2 border-dashed transition-all duration-200',
          'hover:bg-primary/15 overflow-hidden',
          isDragging && 'border-primary bg-primary/10',
          !currentFile && 'cursor-pointer',
          {
            'cursor-not-allowed opacity-50': disabled,
          }
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={!currentFile ? handleClick : undefined}
      >
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
            <Loader className="text-primary size-8 animate-spin" />
          </div>
        )}

        {currentFile ? (
          <>
            <Image
              width={208}
              height={208}
              src={previewSrc}
              alt="Uploaded cover"
              className={cn('h-full w-full object-cover', classNames?.img)}
            />

            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center gap-2 bg-black/55 opacity-0 transition-opacity',
                'group-hover:opacity-100'
              )}
            >
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
                className="border-primary text-primary bg-primary-80 hover:bg-primary-60 h-9"
              >
                <Pencil className="mr-1.5 size-4" />
                Edit
              </Button>
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="border-primary text-primary bg-primary-80 hover:bg-primary-60 h-9"
              >
                <Trash2 className="mr-1.5 size-4" />
                Delete
              </Button>
            </div>
          </>
        ) : (
          <div className="flex h-full min-h-52 flex-col items-center justify-center px-6 text-center">
            <ImageIcon className="text-primary mb-3 size-10" />
            <p
              className={cn(
                'font-semibold text-slate-500',
                classNames?.imgSubtitle
              )}
            >
              {uploadText ||
                'Drag & Drop files here or Upload from your device'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppDragger;
