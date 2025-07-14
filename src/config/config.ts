export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  },
  tesseract: {
    workerPath: 'https://unpkg.com/tesseract.js@v5.0.0/dist/worker.min.js',
    langPath: 'https://tessdata.projectnaptha.com/4.0.0',
    corePath: 'https://unpkg.com/tesseract.js-core@v5.0.0/tesseract-core-simd.wasm.js',
  },
} as const;
