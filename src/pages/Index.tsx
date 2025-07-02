import { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { MenuAnalysis } from '@/components/MenuAnalysis';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Utensils, Sparkles, FileText } from 'lucide-react';

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

  // Mock analysis function - in real implementation, this would call an AI service
  const analyzeMenuImage = async (file: File): Promise<AnalysisResult> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock data - in real implementation, this would come from AI analysis
    const mockResults = [
      {
        menuItem: "Grilled Chicken Breast with Quinoa",
        macros: { protein: 45, carbs: 32, fat: 8, calories: 380 }
      },
      {
        menuItem: "Salmon Teriyaki Bowl",
        macros: { protein: 42, carbs: 28, fat: 15, calories: 390 }
      },
      {
        menuItem: "Greek Chicken Wrap",
        macros: { protein: 38, carbs: 35, fat: 12, calories: 375 }
      }
    ];

    return mockResults[Math.floor(Math.random() * mockResults.length)];
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
      toast({
        title: "Analysis Failed",
        description: "Please try again with a different image.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
  };

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
              Menu Protein Analyzer
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