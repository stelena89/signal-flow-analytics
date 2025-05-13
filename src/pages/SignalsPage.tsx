
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart, 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  Download,
  Calendar,
  Clock,
  ChartLine
} from "lucide-react";
import { Signal } from "@/components/SignalCard";
import TradingViewWidget from "@/components/TradingViewWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample signals data
const sampleSignals: Signal[] = [
  {
    id: "1",
    pair: "EUR/USD",
    type: "BUY",
    entry: "1.0925",
    stopLoss: "1.0885",
    takeProfit: "1.0985",
    timeframe: "4H",
    date: "2023-05-12 14:30",
    status: "TP HIT",
    pips: 60
  },
  {
    id: "2",
    pair: "BTC/USD",
    type: "SELL",
    entry: "43250",
    stopLoss: "43750",
    takeProfit: "42250",
    timeframe: "1D",
    date: "2023-05-14 09:15",
    status: "ACTIVE",
  },
  {
    id: "3",
    pair: "GBP/JPY",
    type: "BUY",
    entry: "168.50",
    stopLoss: "167.80",
    takeProfit: "169.50",
    timeframe: "1H",
    date: "2023-05-13 11:45",
    status: "SL HIT",
    pips: -70
  },
  {
    id: "4",
    pair: "XAU/USD",
    type: "BUY",
    entry: "1950.20",
    stopLoss: "1935.50",
    takeProfit: "1980.00",
    timeframe: "4H",
    date: "2023-05-11 10:20",
    status: "TP HIT",
    pips: 298
  },
  {
    id: "5",
    pair: "ETH/USD",
    type: "BUY",
    entry: "2150.00",
    stopLoss: "2100.00",
    takeProfit: "2250.00",
    timeframe: "4H",
    date: "2023-05-10 15:40",
    status: "CLOSED",
    pips: 35
  },
  {
    id: "6",
    pair: "USD/JPY",
    type: "SELL",
    entry: "134.25",
    stopLoss: "134.75",
    takeProfit: "133.25",
    timeframe: "1H",
    date: "2023-05-09 08:15",
    status: "TP HIT",
    pips: 100
  },
  {
    id: "7",
    pair: "AUD/USD",
    type: "SELL",
    entry: "0.6680",
    stopLoss: "0.6720",
    takeProfit: "0.6600",
    timeframe: "1D",
    date: "2023-05-08 22:30",
    status: "ACTIVE",
  }
];

const SignalsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [assetFilter, setAssetFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [timeframeFilter, setTimeframeFilter] = useState<string | null>(null);
  const [directionFilter, setDirectionFilter] = useState<string | null>(null);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  // Determine asset type based on pair
  const getAssetType = (pair: string): string => {
    if (pair.includes("USD/") || pair.includes("EUR/") || pair.includes("GBP/") || pair.includes("JPY") || pair.includes("AUD/") || pair.includes("NZD/") || pair.includes("CAD/") || pair.includes("CHF/")) {
      return "forex";
    } else if (pair.includes("BTC") || pair.includes("ETH") || pair.includes("XRP") || pair.includes("LTC")) {
      return "crypto";
    } else if (pair.includes("XAU") || pair.includes("XAG") || pair.includes("OIL")) {
      return "commodity";
    } else {
      return "other";
    }
  };

  // Filter signals based on search term and filters
  const filteredSignals = sampleSignals.filter((signal) => {
    const matchesSearch = 
      searchTerm === "" || 
      signal.pair.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAsset = 
      assetFilter === null || getAssetType(signal.pair) === assetFilter;
    
    const matchesStatus = 
      statusFilter === null || signal.status === statusFilter;
    
    const matchesTimeframe = 
      timeframeFilter === null || signal.timeframe === timeframeFilter;
    
    const matchesDirection = 
      directionFilter === null || signal.type === directionFilter;
    
    return matchesSearch && matchesAsset && matchesStatus && matchesTimeframe && matchesDirection;
  });

  // Extract unique timeframes, statuses for filters
  const uniqueTimeframes = Array.from(new Set(sampleSignals.map(s => s.timeframe)));
  const uniqueStatuses = Array.from(new Set(sampleSignals.map(s => s.status)));

  const handleRowClick = (signal: Signal) => {
    setSelectedSignal(signal);
  };

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Trading Signals</h1>
            <p className="text-muted-foreground">
              Real-time and historical trading signals with precise entry, stop-loss, and take-profit levels.
            </p>
          </div>
          <Button className="mt-2 md:mt-0">
            <Clock className="mr-2 h-4 w-4" />
            Subscribe to Signals
          </Button>
        </div>

        <Tabs defaultValue="table" className="w-full mb-6">
          <TabsList>
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="table" className="space-y-4">
            {/* Filters Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
              <div className="md:col-span-3">
                <Input
                  placeholder="Search by pair..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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
                    <SelectItem value="commodity">Commodities</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Select value={statusFilter || ""} onValueChange={(val) => setStatusFilter(val === "" ? null : val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    {uniqueStatuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
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
                    {uniqueTimeframes.map((tf) => (
                      <SelectItem key={tf} value={tf}>{tf}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Select value={directionFilter || ""} onValueChange={(val) => setDirectionFilter(val === "" ? null : val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Directions</SelectItem>
                    <SelectItem value="BUY">BUY</SelectItem>
                    <SelectItem value="SELL">SELL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-1">
                <Button variant="outline" className="w-full" onClick={() => {
                  setSearchTerm("");
                  setAssetFilter(null);
                  setStatusFilter(null);
                  setTimeframeFilter(null);
                  setDirectionFilter(null);
                }}>
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Table with Signals */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pair</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Entry</TableHead>
                    <TableHead>Stop Loss</TableHead>
                    <TableHead>Take Profit</TableHead>
                    <TableHead>Timeframe</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSignals.length > 0 ? (
                    filteredSignals.map((signal) => (
                      <TableRow 
                        key={signal.id} 
                        className={`cursor-pointer ${selectedSignal?.id === signal.id ? 'bg-accent/20' : ''}`}
                        onClick={() => handleRowClick(signal)}
                      >
                        <TableCell className="font-medium">{signal.pair}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell>{signal.entry}</TableCell>
                        <TableCell className="text-negative">{signal.stopLoss}</TableCell>
                        <TableCell className="text-positive">{signal.takeProfit}</TableCell>
                        <TableCell>{signal.timeframe}</TableCell>
                        <TableCell>{signal.date}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              signal.status === "ACTIVE" ? "bg-blue-500/20 text-blue-400" :
                              signal.status === "TP HIT" ? "bg-positive/20 text-positive" :
                              signal.status === "SL HIT" ? "bg-negative/20 text-negative" :
                              "bg-neutral/20 text-neutral"
                            }
                          >
                            {signal.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {signal.pips !== undefined && (
                            <span className={signal.pips >= 0 ? "text-positive" : "text-negative"}>
                              {signal.pips >= 0 ? "+" : ""}{signal.pips} pips
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center h-24">
                        <p className="text-muted-foreground">No signals found matching your filters.</p>
                        <Button variant="link" onClick={() => {
                          setSearchTerm("");
                          setAssetFilter(null);
                          setStatusFilter(null);
                          setTimeframeFilter(null);
                          setDirectionFilter(null);
                        }}>
                          Clear all filters
                        </Button>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Signals Calendar View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Calendar View Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mt-2">
                      We're working on a calendar view that will allow you to see signals organized by date. 
                      Please check back soon or use the table view for now.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Selected Signal Detail */}
        {selectedSignal && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Signal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedSignal.pair}</span>
                      <Badge 
                        className={selectedSignal.type === "BUY" ? "signal-badge-buy" : "signal-badge-sell"}
                      >
                        {selectedSignal.type === "BUY" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {selectedSignal.type}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-muted-foreground text-sm">Entry</p>
                          <p className="font-medium">{selectedSignal.entry}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Stop Loss</p>
                          <p className="font-medium text-negative">{selectedSignal.stopLoss}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Take Profit</p>
                          <p className="font-medium text-positive">{selectedSignal.takeProfit}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">Timeframe</p>
                          <p className="font-medium">{selectedSignal.timeframe}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <p className="text-muted-foreground text-sm">Date</p>
                        <p className="font-medium">{selectedSignal.date}</p>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <p className="text-muted-foreground text-sm">Status</p>
                        <Badge
                          className={
                            selectedSignal.status === "ACTIVE" ? "bg-blue-500/20 text-blue-400" :
                            selectedSignal.status === "TP HIT" ? "bg-positive/20 text-positive" :
                            selectedSignal.status === "SL HIT" ? "bg-negative/20 text-negative" :
                            "bg-neutral/20 text-neutral"
                          }
                        >
                          {selectedSignal.status}
                        </Badge>
                      </div>
                      
                      {selectedSignal.pips !== undefined && (
                        <div className="pt-2 border-t border-border">
                          <p className="text-muted-foreground text-sm">Result</p>
                          <p className={selectedSignal.pips >= 0 ? "font-medium text-positive" : "font-medium text-negative"}>
                            {selectedSignal.pips >= 0 ? "+" : ""}{selectedSignal.pips} pips
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ChartLine className="h-5 w-5 mr-2" />
                      Signal Chart
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TradingViewWidget
                      symbol={
                        selectedSignal.pair.includes("BTC") || selectedSignal.pair.includes("ETH") 
                          ? `BITSTAMP:${selectedSignal.pair.replace('/', '')}`
                          : selectedSignal.pair.includes("XAU")
                            ? "TVC:GOLD"
                            : `FX:${selectedSignal.pair.replace('/', '')}`
                      }
                      interval={
                        selectedSignal.timeframe === "1H" ? "60" :
                        selectedSignal.timeframe === "4H" ? "240" :
                        selectedSignal.timeframe === "1D" ? "D" :
                        "D"
                      }
                      height={400}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignalsPage;
