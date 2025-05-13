
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";

export interface Signal {
  id: string;
  pair: string;
  type: "BUY" | "SELL";
  entry: string;
  stopLoss: string;
  takeProfit: string;
  timeframe: string;
  date: string;
  status: "ACTIVE" | "CLOSED" | "STOPPED" | "TP HIT" | "SL HIT";
  pips?: number;
}

interface SignalCardProps {
  signal: Signal;
}

const SignalCard = ({ signal }: SignalCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-blue-500/20 text-blue-400";
      case "TP HIT":
        return "bg-positive/20 text-positive";
      case "SL HIT":
        return "bg-negative/20 text-negative";
      case "CLOSED":
        return "bg-neutral/20 text-neutral";
      default:
        return "bg-neutral/20 text-neutral";
    }
  };

  return (
    <Card className="hover-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{signal.pair}</CardTitle>
          <Badge 
            className={signal.type === "BUY" ? "signal-badge-buy" : "signal-badge-sell"}
          >
            {signal.type === "BUY" ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {signal.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Entry</span>
            <span className="font-medium">{signal.entry}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Stop Loss</span>
            <span className="font-medium">{signal.stopLoss}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Take Profit</span>
            <span className="font-medium">{signal.takeProfit}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Timeframe</span>
            <span className="font-medium">{signal.timeframe}</span>
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{signal.date}</span>
          <Badge className={getStatusColor(signal.status)}>
            {signal.status}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-1">
        <Button variant="ghost" size="sm" className="w-full text-xs">
          View Details <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignalCard;
