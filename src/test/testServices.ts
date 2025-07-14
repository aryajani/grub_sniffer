// Test file to verify our services work correctly
// This can be run in the browser console for testing

import { ocrService } from '@/services/ocrService';
import { openaiService } from '@/services/openaiService';

export const testOCRService = async () => {
  console.log('Testing OCR Service...');
  
  // Create a simple test image with text (you can replace this with actual image testing)
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 400, 200);
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Grilled Chicken Breast - $15.99', 50, 50);
    ctx.fillText('Protein: 45g, Carbs: 5g, Fat: 8g', 50, 80);
    ctx.fillText('Salmon Teriyaki Bowl - $18.99', 50, 120);
    ctx.fillText('Protein: 42g, Carbs: 28g, Fat: 15g', 50, 150);
  }
  
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      if (blob) {
        const file = new File([blob], 'test-menu.png', { type: 'image/png' });
        try {
          const text = await ocrService.extractText(file);
          console.log('Extracted text:', text);
          resolve(text);
        } catch (error) {
          console.error('OCR test failed:', error);
          resolve(null);
        }
      }
    });
  });
};

export const testOpenAIService = async () => {
  console.log('Testing OpenAI Service...');
  
  const sampleMenuText = `
    MAIN DISHES
    
    Grilled Chicken Breast - $15.99
    Tender grilled chicken breast served with quinoa and steamed vegetables
    
    Salmon Teriyaki Bowl - $18.99
    Fresh Atlantic salmon with teriyaki glaze, served over rice with vegetables
    
    Beef Burger - $12.99
    Angus beef patty with lettuce, tomato, and fries
    
    Caesar Salad - $9.99
    Romaine lettuce with parmesan cheese and croutons
    
    Protein Smoothie Bowl - $11.99
    Acai bowl topped with protein powder, nuts, and fresh berries
  `;
  
  try {
    const result = await openaiService.analyzeMenuText(sampleMenuText);
    console.log('Analysis result:', result);
    return result;
  } catch (error) {
    console.error('OpenAI test failed:', error);
    return null;
  }
};

// Function to test the complete flow
export const testCompleteFlow = async () => {
  console.log('Testing complete flow...');
  
  const ocrResult = await testOCRService();
  if (ocrResult) {
    const analysisResult = await testOpenAIService();
    console.log('Complete flow test result:', analysisResult);
    return analysisResult;
  }
  
  return null;
};

// Make functions available globally for browser console testing
(window as any).testServices = {
  testOCRService,
  testOpenAIService,
  testCompleteFlow,
};
