import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface MacroInfo {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

interface MenuAnalysisProps {
  menuItem: string;
  macros: MacroInfo;
  isVisible: boolean;
}

export const MenuAnalysis = ({ menuItem, macros, isVisible }: MenuAnalysisProps) => {
  if (!isVisible) return null;

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 shadow-lg border-0 bg-gradient-subtle">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Badge className="bg-secondary text-secondary-foreground px-4 py-1.5 text-sm font-medium">
            Highest Protein Item
          </Badge>
          <h2 className="text-2xl font-bold text-foreground">{menuItem}</h2>
        </div>

        <Separator className="bg-border" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-2">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="text-2xl font-bold text-primary">{macros.protein}g</div>
              <div className="text-sm text-muted-foreground font-medium">Protein</div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <div className="text-2xl font-bold text-secondary">{macros.carbs}g</div>
              <div className="text-sm text-muted-foreground font-medium">Carbs</div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="p-4 rounded-lg bg-accent border border-accent-foreground/20">
              <div className="text-2xl font-bold text-accent-foreground">{macros.fat}g</div>
              <div className="text-sm text-muted-foreground font-medium">Fat</div>
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="p-4 rounded-lg bg-muted border border-border">
              <div className="text-2xl font-bold text-foreground">{macros.calories}</div>
              <div className="text-sm text-muted-foreground font-medium">Calories</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            This item provides the highest protein content among all menu options analyzed
          </p>
        </div>
      </div>
    </Card>
  );
};