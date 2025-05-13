
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IndicatorCard, { Indicator } from "@/components/IndicatorCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ArrowUpDown,
  Settings,
  TerminalSquare
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample indicators data
const sampleIndicators: Indicator[] = [
  {
    id: "1",
    name: "Smart Money Concepts",
    description: "Identify smart money concepts like liquidity, order blocks, and breaker blocks with precision. This premium indicator visualizes key market structure elements.",
    price: 149,
    image: "",
    category: "Price Action",
    isPremium: true,
    rating: 4.8,
    timeframes: ["All"]
  },
  {
    id: "2",
    name: "Multi-Timeframe RSI",
    description: "View RSI values across multiple timeframes in a single chart to confirm trends and spot divergences quickly.",
    price: 0,
    image: "",
    category: "Oscillator",
    isPremium: false,
    rating: 4.5,
    timeframes: ["5m", "15m", "1h", "4h", "1d"]
  },
  {
    id: "3",
    name: "Volume Profile Plus",
    description: "Advanced volume profile with value areas, POC, and developing areas. Identify key price levels where most trading activity occurs.",
    price: 89,
    image: "",
    category: "Volume",
    isPremium: true,
    rating: 4.7,
    timeframes: ["All"]
  },
  {
    id: "4",
    name: "Wyckoff Tools",
    description: "Complete suite of Wyckoff analysis tools, including phase identification, accumulation/distribution schematic overlays, and effort vs result indicators.",
    price: 129,
    image: "",
    category: "Wyckoff",
    isPremium: true,
    rating: 4.9,
    timeframes: ["1h", "4h", "1d", "1w"]
  },
  {
    id: "5",
    name: "Fibonacci Extension Suite",
    description: "Comprehensive Fibonacci tools with auto-detection of swing highs and lows, plus multiple extension levels and time projections.",
    price: 79,
    image: "",
    category: "Fibonacci",
    isPremium: true,
    rating: 4.6,
    timeframes: ["All"]
  },
  {
    id: "6",
    name: "Enhanced VWAP",
    description: "Volume Weighted Average Price with standard deviation bands, multi-timeframe capabilities, and anchored VWAP options.",
    price: 0,
    image: "",
    category: "Volume",
    isPremium: false,
    rating: 4.4,
    timeframes: ["5m", "15m", "1h", "4h"]
  },
  {
    id: "7",
    name: "Support & Resistance Detector",
    description: "Automatic detection of key support and resistance levels based on price history and market structure analysis.",
    price: 69,
    image: "",
    category: "Price Action",
    isPremium: true,
    rating: 4.3,
    timeframes: ["1h", "4h", "1d"]
  },
  {
    id: "8",
    name: "Harmonic Pattern Scanner",
    description: "Automatically detect and label harmonic patterns including Gartley, Butterfly, Bat, and Crab formations with price projections.",
    price: 99,
    image: "",
    category: "Pattern Recognition",
    isPremium: true,
    rating: 4.5,
    timeframes: ["1h", "4h", "1d"]
  }
];

const IndicatorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [timeframeFilter, setTimeframeFilter] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("rating-desc");

  // Extract unique categories for filter
  const uniqueCategories = Array.from(new Set(sampleIndicators.map(i => i.category)));
  
  // Extract unique timeframes for filter
  const allTimeframes = Array.from(new Set(sampleIndicators.flatMap(i => i.timeframes)))
    .filter(tf => tf !== "All");

  // Filter indicators based on search term and filters
  let filteredIndicators = sampleIndicators.filter((indicator) => {
    const matchesSearch = 
      searchTerm === "" || 
      indicator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === null || indicator.category === categoryFilter;
    
    const matchesPrice = 
      priceFilter === null ||
      (priceFilter === "free" && indicator.price === 0) ||
      (priceFilter === "paid" && indicator.price > 0);
    
    const matchesTimeframe = 
      timeframeFilter === null || 
      indicator.timeframes.includes(timeframeFilter) || 
      indicator.timeframes.includes("All");
    
    return matchesSearch && matchesCategory && matchesPrice && matchesTimeframe;
  });

  // Sort indicators based on selected sort order
  filteredIndicators = filteredIndicators.sort((a, b) => {
    switch (sortOrder) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "rating-desc":
        return b.rating - a.rating;
      case "rating-asc":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Trading Indicators</h1>
            <p className="text-muted-foreground">
              Professional indicators to enhance your trading strategy and chart analysis.
            </p>
          </div>
          <Button className="mt-2 md:mt-0">
            <TerminalSquare className="mr-2 h-4 w-4" />
            Request Custom Indicator
          </Button>
        </div>

        {/* Filters Section */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search indicators..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Select value={categoryFilter || "all"} onValueChange={(val) => setCategoryFilter(val === "all" ? null : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
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
            <Select value={priceFilter || "all"} onValueChange={(val) => setPriceFilter(val === "all" ? null : val)}>
              <SelectTrigger>
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="free">Free Only</SelectItem>
                <SelectItem value="paid">Premium Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <ArrowUpDown className="h-4 w-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating-desc">Top Rated</SelectItem>
                <SelectItem value="rating-asc">Lowest Rated</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            <Button variant="outline" className="w-full" onClick={() => {
              setSearchTerm("");
              setCategoryFilter(null);
              setPriceFilter(null);
              setTimeframeFilter(null);
              setSortOrder("rating-desc");
            }}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* View Type Tabs */}
        <Tabs defaultValue="grid" className="mb-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="text-sm text-muted-foreground">
              Showing {filteredIndicators.length} of {sampleIndicators.length} indicators
            </div>
          </div>
          
          <TabsContent value="grid" className="mt-6">
            {filteredIndicators.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredIndicators.map((indicator) => (
                  <IndicatorCard key={indicator.id} indicator={indicator} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No indicators found</p>
                <p className="text-muted-foreground text-center mt-2 max-w-md">
                  No indicators match your current filters. Try adjusting your search or filter criteria.
                </p>
                <Button variant="link" onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter(null);
                  setPriceFilter(null);
                  setTimeframeFilter(null);
                }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="list" className="mt-6">
            {filteredIndicators.length > 0 ? (
              <div className="space-y-4">
                {filteredIndicators.map((indicator) => (
                  <div key={indicator.id} className="flex flex-col md:flex-row gap-4 glass-card p-4">
                    <div className="flex-shrink-0 w-full md:w-48 h-32 bg-chart-bg rounded-lg flex items-center justify-center">
                      <Settings className="h-12 w-12 text-muted-foreground/20" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{indicator.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-foreground">{indicator.category}</span>
                            <span className="mx-2">•</span>
                            <span>Rating: {indicator.rating}/5</span>
                          </div>
                        </div>
                        <div className="text-primary font-medium">
                          {indicator.price === 0 ? "Free" : `$${indicator.price}`}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{indicator.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                          {indicator.timeframes.map((timeframe) => (
                            <div key={timeframe} className="pill-tag bg-accent/50 text-accent-foreground">
                              {timeframe}
                            </div>
                          ))}
                        </div>
                        <Button size="sm">
                          {indicator.price === 0 ? "Download" : "Purchase"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No indicators found</p>
                <p className="text-muted-foreground text-center mt-2 max-w-md">
                  No indicators match your current filters. Try adjusting your search or filter criteria.
                </p>
                <Button variant="link" onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter(null);
                  setPriceFilter(null);
                  setTimeframeFilter(null);
                }}>
                  Clear all filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IndicatorsPage;
