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

// Debug logging for environment variables
console.log('Environment check:', {
  hasApiKey: !!config.openai.apiKey,
  apiKeyLength: config.openai.apiKey?.length || 0,
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD,
});

// Validate that the API key is available
if (!config.openai.apiKey) {
  console.error('OpenAI API key is not configured. Please check your environment variables.');
}
