import OpenAI from 'openai';
import { config } from '@/config/config';

export interface MacroInfo {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface MenuAnalysisResult {
  menuItem: string;
  macros: MacroInfo;
}

export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openai.apiKey,
      dangerouslyAllowBrowser: true, // Note: In production, this should be handled server-side
    });
  }

  async analyzeMenuText(menuText: string): Promise<MenuAnalysisResult> {
    try {
      const prompt = `
        You are a nutrition expert analyzing a restaurant menu. Given the following menu text extracted from an image, please:

        1. Identify ALL menu items mentioned in the text
        2. Determine which menu item has the HIGHEST protein content
        3. Provide estimated macronutrients for that highest-protein item

        Menu text:
        "${menuText}"

        Please respond with ONLY a JSON object in this exact format:
        {
          "menuItem": "Name of the highest protein menu item",
          "macros": {
            "protein": number (grams),
            "carbs": number (grams),
            "fat": number (grams),
            "calories": number (total calories)
          }
        }

        Guidelines for estimation:
        - Be realistic with portion sizes (typical restaurant servings)
        - Consider cooking methods and ingredients mentioned
        - If multiple items have similar protein, choose the one with the best protein-to-calorie ratio
        - Round to whole numbers
        - If no clear menu items are found, choose the most protein-rich option from what's available
      `;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 500,
      });

      const responseText = completion.choices[0]?.message?.content;
      if (!responseText) {
        throw new Error('No response from OpenAI');
      }

      // Parse the JSON response
      const result = JSON.parse(responseText) as MenuAnalysisResult;
      
      // Validate the response structure
      if (!result.menuItem || !result.macros) {
        throw new Error('Invalid response structure from OpenAI');
      }

      return result;
    } catch (error) {
      console.error('OpenAI analysis failed:', error);
      
      // Fallback response if API fails
      return {
        menuItem: 'Grilled Chicken Breast (Analysis Failed)',
        macros: {
          protein: 35,
          carbs: 5,
          fat: 8,
          calories: 220,
        },
      };
    }
  }
}

// Singleton instance
export const openaiService = new OpenAIService();
