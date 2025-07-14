# GrubSniffer - Menu Macro Analyzer

GrubSniffer is a React-based web application that uses OCR (Optical Character Recognition) and AI to analyze restaurant menu images, identify the highest protein menu item, and provide detailed macro nutritional information.

## Features

- **Image Upload**: Drag and drop or click to upload menu images
- **OCR Text Extraction**: Uses Tesseract.js to extract text from menu images
- **AI Analysis**: Leverages OpenAI's GPT-4 to analyze menu items and identify the highest protein option
- **Macro Estimation**: Provides detailed nutritional breakdown (protein, carbs, fat, calories)
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Processing**: Live analysis with progress indicators

## Technologies Used

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS, Lucide React
- **OCR**: Tesseract.js
- **AI**: OpenAI GPT-4 API
- **State Management**: React Hooks
- **Routing**: React Router DOM

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd menu-macro-muse
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add your OpenAI API key:

   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

## How to Use

1. **Upload a Menu Image**:

   - Click "Choose Image" or drag and drop a menu image
   - Supported formats: JPG, PNG, and other common image formats
   - Ensure the image is clear and well-lit for best OCR results

2. **Wait for Analysis**:

   - The app will extract text from the image using OCR
   - Then analyze the menu items using AI to find the highest protein option
   - This process typically takes 10-30 seconds

3. **View Results**:
   - See the identified highest protein menu item
   - View detailed macro breakdown (protein, carbs, fat, calories)
   - Click "Analyze Another Menu" to process a new image

## API Configuration

The application uses the OpenAI API for menu analysis. Make sure you have:

- A valid OpenAI API key
- Sufficient API credits
- The key properly configured in your `.env` file

## Development Testing

For development testing, you can use the browser console:

```javascript
// Test OCR service
await window.testServices.testOCRService();

// Test OpenAI service
await window.testServices.testOpenAIService();

// Test complete flow
await window.testServices.testCompleteFlow();
```

## Build for Production

```bash
npm run build
```

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages with secure API key handling.

**Deployment steps:**

1. **Add GitHub Secret**: Go to your repository Settings → Secrets and variables → Actions, create a new secret named `VITE_OPENAI_API_KEY` with your OpenAI API key as the value
2. **Enable GitHub Pages**: In repository Settings → Pages, set Source to "GitHub Actions"
3. **Push your code**: Push to the main branch and GitHub Actions will automatically build and deploy your app
4. **Access your app**: Once deployed, visit `https://yourusername.github.io/grub_sniffer/`

## Important Notes

- **API Key Security**: The current implementation includes the API key in the frontend for development purposes. For production, implement a backend API to securely handle OpenAI requests.
- **Image Quality**: For best results, use clear, well-lit images with readable text
- **Menu Format**: Works best with standard restaurant menu formats
- **Processing Time**: Analysis time depends on image size and complexity

## Troubleshooting

- **OCR Issues**: Ensure images are clear and text is readable
- **API Errors**: Check your OpenAI API key and account credits
- **Slow Performance**: Large images may take longer to process
- **No Results**: Try with a different image or check console for error messages
