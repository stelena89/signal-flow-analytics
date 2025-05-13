
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartLine, Star } from "lucide-react";

export interface Indicator {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isPremium: boolean;
  rating: number;
  timeframes: string[];
}

interface IndicatorCardProps {
  indicator: Indicator;
}

const IndicatorCard = ({ indicator }: IndicatorCardProps) => {
  return (
    <Card className="hover-card overflow-hidden">
      <div className="relative h-48 overflow-hidden bg-chart-bg">
        {indicator.image ? (
          <img 
            src={indicator.image} 
            alt={indicator.name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ChartLine className="h-24 w-24 text-muted-foreground/20" />
          </div>
        )}
        {indicator.isPremium && (
          <Badge className="premium-badge absolute top-2 right-2">
            Premium
          </Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{indicator.name}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-gold fill-gold" />
            <span className="text-sm ml-1">{indicator.rating}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {indicator.timeframes.map((timeframe) => (
            <Badge key={timeframe} variant="outline" className="text-xs">
              {timeframe}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {indicator.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-1">
        <span className="font-medium text-primary">
          {indicator.price === 0 ? "Free" : `$${indicator.price}`}
        </span>
        <Button size="sm">
          {indicator.price === 0 ? "Download" : "Purchase"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IndicatorCard;
