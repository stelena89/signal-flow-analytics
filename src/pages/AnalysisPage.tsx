import { useState, useEffect } from "react";
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
import { BarChart } from "lucide-react";
import { Analysis, fetchAnalyses } from "@/services/analysisService";
import { useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const AnalysisPage = () => {
  const { user, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [assetFilter, setAssetFilter] = useState<string | null>(null);
  const [timeframeFilter, setTimeframeFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);

  // Fetch analyses from Supabase
  const { data: analyses = [], isLoading, error } = useQuery({
    queryKey: ["analyses"],
    queryFn: fetchAnalyses,
    enabled: !!user
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading analyses",
        description: "There was a problem fetching the market analyses. Please try again.",
        variant: "destructive",
      });
    }
  }, [error]);

  // Filter analysis based on search term and filters
  const filteredAnalysis = analyses.filter((analysis) => {
    const matchesSearch = 
      searchTerm === "" || 
      analysis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
      analysis.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAsset = 
      assetFilter === null || analysis.asset_type === assetFilter;
    
    const matchesTimeframe = 
      timeframeFilter === null || analysis.timeframe === timeframeFilter;
    
    const matchesTag = 
      tagFilter === null || (analysis.tags && analysis.tags.includes(tagFilter));
    
    return matchesSearch && matchesAsset && matchesTimeframe && matchesTag;
  });

  // Get unique tags for filter
  const allTags = Array.from(new Set(analyses.flatMap(a => a.tags || [])));
  
  // Get unique timeframes for filter
  const allTimeframes = Array.from(new Set(analyses.map(a => a.timeframe)));

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Market Analysis</h1>
            <p className="text-muted-foreground">
              In-depth technical and fundamental analysis of major markets.
            </p>
          </div>
          {/* Show create button only for admin users */}
          {user && isAdmin && (
            <Link to="/analysis/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Analysis
              </Button>
            </Link>
          )}
        </div>

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
            <Select value={assetFilter || "all"} onValueChange={(val) => setAssetFilter(val === "all" ? null : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assets</SelectItem>
                <SelectItem value="forex">Forex</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="commodities">Commodities</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={timeframeFilter || "all"} onValueChange={(val) => setTimeframeFilter(val === "all" ? null : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Timeframes</SelectItem>
                {allTimeframes.map((tf) => (
                  <SelectItem key={tf} value={tf}>{tf}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={tagFilter || "all"} onValueChange={(val) => setTagFilter(val === "all" ? null : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Analysis Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
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
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-48">
                <p className="text-muted-foreground">Loading analyses...</p>
              </div>
            ) : filteredAnalysis.length > 0 ? (
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
                    {analysis.tags && analysis.tags.map((tag) => (
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
                      {new Date(selectedAnalysis.date).toLocaleDateString()}
                    </div>
                    <div>
                      by {selectedAnalysis.author}
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      {selectedAnalysis.asset_type.charAt(0).toUpperCase() + selectedAnalysis.asset_type.slice(1)}
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
                          selectedAnalysis.asset_type === "forex" 
                            ? `FX:${selectedAnalysis.pair.replace('/', '')}`
                            : selectedAnalysis.asset_type === "crypto"
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
