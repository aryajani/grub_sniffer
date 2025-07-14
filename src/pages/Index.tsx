import { useState, useEffect } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { MenuAnalysis } from '@/components/MenuAnalysis';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Utensils, Sparkles, FileText } from 'lucide-react';
import { ocrService } from '@/services/ocrService';
import { openaiService } from '@/services/openaiService';

interface MacroInfo {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

interface AnalysisResult {
  menuItem: string;
  macros: MacroInfo;
}

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();

  // Real analysis function using OCR and OpenAI
  const analyzeMenuImage = async (file: File): Promise<AnalysisResult> => {
    try {
      // Step 1: Extract text from image using OCR
      console.log('Extracting text from image...');
      const extractedText = await ocrService.extractText(file);
      console.log('Extracted text:', extractedText);

      if (!extractedText || extractedText.trim().length < 10) {
        throw new Error('Could not extract sufficient text from the image. Please ensure the image is clear and contains readable menu text.');
      }

      // Step 2: Analyze the extracted text with OpenAI
      console.log('Analyzing menu with AI...');
      const analysisResult = await openaiService.analyzeMenuText(extractedText);
      console.log('Analysis result:', analysisResult);

      return analysisResult;
    } catch (error) {
      console.error('Analysis failed:', error);
      throw error;
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setIsAnalyzing(true);
      setAnalysisResult(null);

      const result = await analyzeMenuImage(file);
      setAnalysisResult(result);

      toast({
        title: "Analysis Complete!",
        description: `Found highest protein item: ${result.menuItem}`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Please try again with a different image.";
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

  // Cleanup OCR worker on component unmount
  useEffect(() => {
    return () => {
      ocrService.cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 bg-gradient-primary rounded-full shadow-purple">
              <Utensils className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              GrubSniffer
            </h1>
          </div>
          <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
            Upload a menu image and discover which item packs the most protein along with complete nutritional information
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Upload Section */}
          <div className="flex flex-col items-center space-y-8">
            <ImageUpload 
              onImageUpload={handleImageUpload} 
              isAnalyzing={isAnalyzing} 
            />

            {/* Features */}
            {!analysisResult && !isAnalyzing && (
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center">
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">AI-Powered Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced computer vision extracts text and nutritional data from menu images
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-secondary/10 rounded-full w-fit mx-auto">
                    <Utensils className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Protein Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically identifies the menu item with the highest protein content
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-accent/50 rounded-full w-fit mx-auto">
                    <FileText className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground">Complete Macros</h3>
                  <p className="text-sm text-muted-foreground">
                    Get detailed breakdown of protein, carbs, fat, and total calories
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          {analysisResult && (
            <div className="space-y-6">
              <MenuAnalysis 
                menuItem={analysisResult.menuItem}
                macros={analysisResult.macros}
                isVisible={true}
              />
              
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={handleReset}
                  className="border-primary/30 hover:bg-primary/5"
                >
                  Analyze Another Menu
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Upload clear, well-lit menu images for best results
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;