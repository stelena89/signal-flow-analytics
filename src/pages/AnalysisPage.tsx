
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import TradingViewWidget from "@/components/TradingViewWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Clock, Filter, Search, Tag } from "lucide-react";

interface Analysis {
  id: string;
  title: string;
  summary: string;
  content: string;
  pair: string;
  date: string;
  author: string;
  tags: string[];
  assetType: "forex" | "crypto" | "stocks" | "commodities";
  timeframe: string;
}

const sampleAnalysis: Analysis[] = [
  {
    id: "1",
    title: "EUR/USD Consolidation Breakout Expected",
    summary: "EUR/USD has been consolidating in a tight range but key technical indicators suggest an imminent breakout.",
    content: "The EUR/USD pair has been trading within a 100-pip range for the past two weeks, forming a symmetrical triangle pattern on the daily chart. The RSI is trending upward while price maintains the range, indicating potential bullish divergence. Key support remains at 1.0850 with resistance at 1.0950. A break above resistance with increased volume would target the 1.1050 level.",
    pair: "EUR/USD",
    date: "2023-05-12",
    author: "John Smith",
    tags: ["Technical", "Breakout", "Pattern"],
    assetType: "forex",
    timeframe: "Daily"
  },
  {
    id: "2",
    title: "Bitcoin Approaching Key Support Level",
    summary: "BTC is testing a major support zone with confluence of multiple technical factors.",
    content: "Bitcoin is approaching the critical support level at $42,500, which aligns with the 200-day moving average and a major trendline dating back to the October 2022 low. Volume has been declining during the recent pullback, suggesting a potential exhaustion of selling pressure. The weekly RSI has not yet reached oversold territory, indicating there could be more downside if support breaks. Key levels to watch: $42,500 support and $46,800 resistance.",
    pair: "BTC/USD",
    date: "2023-05-14",
    author: "Sarah Johnson",
    tags: ["Technical", "Support", "Cryptocurrency"],
    assetType: "crypto",
    timeframe: "Weekly"
  },
  {
    id: "3",
    title: "Gold Setting Up for Potential Bullish Run",
    summary: "Fundamental factors and technical setup align for a possible gold rally.",
    content: "Gold has been forming a cup and handle pattern on the daily chart, typically a bullish continuation pattern. With recent inflation data coming in higher than expected and central banks signaling a more dovish stance, gold could benefit from safe-haven flows. The metal has been holding above the $1,950 support zone with increasing volume on up days. Watch for a breakthrough $2,000 which could trigger a run toward previous all-time highs.",
    pair: "GOLD",
    date: "2023-05-10",
    author: "Michael Lee",
    tags: ["Technical", "Fundamental", "Commodities"],
    assetType: "commodities",
    timeframe: "Daily"
  }
];

const AnalysisPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [assetFilter, setAssetFilter] = useState<string | null>(null);
  const [timeframeFilter, setTimeframeFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);

  // Filter analysis based on search term and filters
  const filteredAnalysis = sampleAnalysis.filter((analysis) => {
    const matchesSearch = 
      searchTerm === "" || 
      analysis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAsset = 
      assetFilter === null || analysis.assetType === assetFilter;
    
    const matchesTimeframe = 
      timeframeFilter === null || analysis.timeframe === timeframeFilter;
    
    const matchesTag = 
      tagFilter === null || analysis.tags.includes(tagFilter);
    
    return matchesSearch && matchesAsset && matchesTimeframe && matchesTag;
  });

  // Get unique tags for filter
  const allTags = Array.from(new Set(sampleAnalysis.flatMap(a => a.tags)));
  
  // Get unique timeframes for filter
  const allTimeframes = Array.from(new Set(sampleAnalysis.map(a => a.timeframe)));

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2">Market Analysis</h1>
        <p className="text-muted-foreground mb-6">
          In-depth technical and fundamental analysis of major markets.
        </p>

        {/* Filters Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, pair, or keyword..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Select value={assetFilter || ""} onValueChange={(val) => setAssetFilter(val === "" ? null : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Assets</SelectItem>
                <SelectItem value="forex">Forex</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="commodities">Commodities</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={timeframeFilter || ""} onValueChange={(val) => setTimeframeFilter(val === "" ? null : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Timeframes</SelectItem>
                {allTimeframes.map((tf) => (
                  <SelectItem key={tf} value={tf}>{tf}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={tagFilter || ""} onValueChange={(val) => setTagFilter(val === "" ? null : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Analysis Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <Button variant="outline" className="w-full" onClick={() => {
              setSearchTerm("");
              setAssetFilter(null);
              setTimeframeFilter(null);
              setTagFilter(null);
            }}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Analysis List */}
          <div className="md:col-span-1 space-y-4">
            {filteredAnalysis.length > 0 ? (
              filteredAnalysis.map((analysis) => (
                <Card 
                  key={analysis.id} 
                  className={`cursor-pointer hover-card ${selectedAnalysis?.id === analysis.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedAnalysis(analysis)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{analysis.title}</CardTitle>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{analysis.pair}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{analysis.timeframe}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {analysis.summary}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 flex gap-1 flex-wrap">
                    {analysis.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <p className="text-muted-foreground">No analysis found matching your filters.</p>
                <Button variant="link" onClick={() => {
                  setSearchTerm("");
                  setAssetFilter(null);
                  setTimeframeFilter(null);
                  setTagFilter(null);
                }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>

          {/* Analysis Details */}
          <div className="md:col-span-2">
            {selectedAnalysis ? (
              <div className="glass-card h-full p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedAnalysis.title}</h2>
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-3 mb-4">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {selectedAnalysis.date}
                    </div>
                    <div>
                      by {selectedAnalysis.author}
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      {selectedAnalysis.assetType.charAt(0).toUpperCase() + selectedAnalysis.assetType.slice(1)}
                    </div>
                  </div>
                  
                  <Tabs defaultValue="chart">
                    <TabsList className="mb-4">
                      <TabsTrigger value="chart">Chart</TabsTrigger>
                      <TabsTrigger value="analysis">Full Analysis</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chart" className="mt-0">
                      <TradingViewWidget
                        symbol={
                          selectedAnalysis.assetType === "forex" 
                            ? `FX:${selectedAnalysis.pair.replace('/', '')}`
                            : selectedAnalysis.assetType === "crypto"
                              ? `BITSTAMP:${selectedAnalysis.pair.replace('/', '')}`
                              : selectedAnalysis.pair
                        }
                        height={400}
                        interval={
                          selectedAnalysis.timeframe === "Weekly" ? "W" :
                          selectedAnalysis.timeframe === "Daily" ? "D" :
                          selectedAnalysis.timeframe === "4 Hour" ? "240" :
                          selectedAnalysis.timeframe === "1 Hour" ? "60" :
                          "D"  // Default to daily
                        }
                      />
                    </TabsContent>
                    <TabsContent value="analysis" className="mt-0">
                      <div className="prose prose-invert max-w-none">
                        <p className="text-lg font-semibold mb-2">{selectedAnalysis.summary}</p>
                        <p className="whitespace-pre-line">{selectedAnalysis.content}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            ) : (
              <div className="glass-card h-full flex flex-col items-center justify-center p-8 text-center">
                <BarChart className="h-16 w-16 text-muted-foreground/40 mb-4" />
                <h3 className="text-xl font-medium mb-2">Select an Analysis</h3>
                <p className="text-muted-foreground">
                  Choose an analysis from the left panel to view its details and chart.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
