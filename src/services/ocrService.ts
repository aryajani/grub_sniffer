import { createWorker } from 'tesseract.js';
import { config } from '@/config/config';

export class OCRService {
  private worker: Tesseract.Worker | null = null;

  async initialize(): Promise<void> {
    if (this.worker) {
      return;
    }

    this.worker = await createWorker('eng', 1, {
      workerPath: config.tesseract.workerPath,
      langPath: config.tesseract.langPath,
      corePath: config.tesseract.corePath,
    });
  }

  async extractText(imageFile: File): Promise<string> {
    if (!this.worker) {
      await this.initialize();
    }

    if (!this.worker) {
      throw new Error('Failed to initialize OCR worker');
    }

    try {
      const { data: { text } } = await this.worker.recognize(imageFile);
      return text.trim();
    } catch (error) {
      console.error('OCR extraction failed:', error);
      throw new Error('Failed to extract text from image');
    }
  }

  async cleanup(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}

// Singleton instance
export const ocrService = new OCRService();
