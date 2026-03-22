import { ACCEPTED_IMG_TYPES } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

export const getFileType = (name: string) => {
  if (!name) {
    return null;
  }

  const list = name.split('.');

  return list[list.length - 1];
};

export const isImageUrl = (url: string) => {
  const extension = getFileType(url);
  const imageExtensions = ACCEPTED_IMG_TYPES.map((type) => type.split('/')[1]);
  return imageExtensions.includes(extension!);
};

export const isImage = (file: File | string) => {
  if (typeof file === 'string') {
    return isImageUrl(file);
  }
  return file.type?.includes('image');
};

export const getUploadPlaceholderImg = (
  file: File | string | undefined | null
) => {
  if (!file) return '';
  if (typeof file === 'string') {
    return file;
  } else {
    if (isImage(file)) {
      return URL.createObjectURL(file);
    }
  }
  return '';
};

export const convertFileSize = (
  size: number,
  unit: 'MB' | 'KB' | 'B' = 'MB'
) => {
  if (unit === 'MB') {
    return size / 1000 / 1000;
  }
  if (unit === 'KB') {
    return size / 1000;
  }
  return size;
};
