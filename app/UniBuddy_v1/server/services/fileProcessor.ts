import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { Request } from 'express';

// File type detection
export function getFileType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.ppt':
    case '.pptx':
      return 'presentation';
    case '.pdf':
      return 'pdf';
    case '.doc':
    case '.docx':
      return 'document';
    case '.mp3':
    case '.wav':
    case '.m4a':
    case '.aac':
      return 'audio';
    default:
      return 'other';
  }
}

// File validation
export function validateFile(file: Express.Multer.File): { valid: boolean; error?: string } {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = [
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'audio/mpeg',
    'audio/wav',
    'audio/mp4',
    'audio/aac'
  ];

  if (file.size > maxSize) {
    return { valid: false, error: 'File size exceeds 50MB limit' };
  }

  if (!allowedTypes.includes(file.mimetype)) {
    return { valid: false, error: 'File type not supported' };
  }

  return { valid: true };
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    const validation = validateFile(file);
    if (validation.valid) {
      cb(null, true);
    } else {
      cb(new Error(validation.error || 'Invalid file'));
    }
  }
});

// Text extraction functions
export async function extractTextFromFile(filePath: string, fileType: string): Promise<string> {
  try {
    switch (fileType) {
      case 'pdf':
        return await extractTextFromPDF(filePath);
      case 'presentation':
        return await extractTextFromPresentation(filePath);
      case 'document':
        return await extractTextFromDocument(filePath);
      case 'audio':
        return await extractTextFromAudio(filePath);
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  } catch (error) {
    console.error('Text extraction failed:', error);
    throw new Error('Failed to extract text from file');
  }
}

async function extractTextFromPDF(filePath: string): Promise<string> {
  // For now, return a placeholder. In production, use pdf-parse or similar
  return `PDF content extracted from ${path.basename(filePath)}. This would contain the actual PDF text content in a real implementation.`;
}

async function extractTextFromPresentation(filePath: string): Promise<string> {
  // For now, return a placeholder. In production, use pptx-to-json or similar
  return `Presentation content extracted from ${path.basename(filePath)}. This would contain slide content, speaker notes, and text from the presentation.`;
}

async function extractTextFromDocument(filePath: string): Promise<string> {
  // For now, return a placeholder. In production, use mammoth or similar
  return `Document content extracted from ${path.basename(filePath)}. This would contain the full document text content.`;
}

async function extractTextFromAudio(filePath: string): Promise<string> {
  // For now, return a placeholder. In production, use OpenAI Whisper API
  return `Audio transcription from ${path.basename(filePath)}. This would contain the transcribed speech content from the audio file.`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
