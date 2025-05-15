
import { useState, useEffect } from "react";
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
  Calendar,
  Clock,
  ChartLine
} from "lucide-react";
import TradingViewWidget from "@/components/TradingViewWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Signal, fetchSignals } from "@/services/signalService";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const SignalsPage = () => {
  const { t } = useLanguage();
  const { session } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [assetFilter, setAssetFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [timeframeFilter, setTimeframeFilter] = useState<string | null>(null);
  const [directionFilter, setDirectionFilter] = useState<string | null>(null);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);

  // Fetch signals from Supabase
  const { data: signals = [], isLoading, error } = useQuery({
    queryKey: ["signals"],
    queryFn: fetchSignals,
    enabled: !!session
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error loading signals",
        description: "There was a problem fetching the trading signals. Please try again.",
        variant: "destructive",
      });
    }
  }, [error]);

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
  const filteredSignals = signals.filter((signal) => {
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
  const uniqueTimeframes = Array.from(new Set(signals.map(s => s.timeframe)));
  const uniqueStatuses = Array.from(new Set(signals.map(s => s.status)));

  const handleRowClick = (signal: Signal) => {
    setSelectedSignal(signal);
  };

  if (!session) {
    return (
      <div className="py-8 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">{t("signals.title")}</h1>
        <p className="mb-4">Please log in to view trading signals.</p>
        <Button asChild>
          <a href="/login">Login</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("signals.title")}</h1>
            <p className="text-muted-foreground">
              {t("signals.description")}
            </p>
          </div>
          <Button className="mt-2 md:mt-0">
            <Clock className="mr-2 h-4 w-4" />
            {t("signals.subscribe")}
          </Button>
        </div>

        <Tabs defaultValue="table" className="w-full mb-6">
          <TabsList>
            <TabsTrigger value="table">{t("signals.tableView")}</TabsTrigger>
            <TabsTrigger value="calendar">{t("signals.calendarView")}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="table" className="space-y-4">
            {/* Filters Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
              <div className="md:col-span-3">
                <Input
                  placeholder={t("signals.search")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Select value={assetFilter || "all"} onValueChange={(val) => setAssetFilter(val === "all" ? null : val)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("signals.assetType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("signals.allAssets")}</SelectItem>
                    <SelectItem value="forex">{t("signals.forex")}</SelectItem>
                    <SelectItem value="crypto">{t("signals.crypto")}</SelectItem>
                    <SelectItem value="commodity">{t("signals.commodities")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Select value={statusFilter || "all"} onValueChange={(val) => setStatusFilter(val === "all" ? null : val)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("signals.status")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("signals.allStatuses")}</SelectItem>
                    {uniqueStatuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Select value={timeframeFilter || "all"} onValueChange={(val) => setTimeframeFilter(val === "all" ? null : val)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("signals.timeframe")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("signals.allTimeframes")}</SelectItem>
                    {uniqueTimeframes.map((tf) => (
                      <SelectItem key={tf} value={tf}>{tf}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Select value={directionFilter || "all"} onValueChange={(val) => setDirectionFilter(val === "all" ? null : val)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("signals.direction")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("signals.allDirections")}</SelectItem>
                    <SelectItem value="BUY">{t("signals.buy")}</SelectItem>
                    <SelectItem value="SELL">{t("signals.sell")}</SelectItem>
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
                    <TableHead>{t("table.pair")}</TableHead>
                    <TableHead>{t("table.type")}</TableHead>
                    <TableHead>{t("table.entry")}</TableHead>
                    <TableHead>{t("table.stopLoss")}</TableHead>
                    <TableHead>{t("table.takeProfit")}</TableHead>
                    <TableHead>{t("table.timeframe")}</TableHead>
                    <TableHead>{t("table.date")}</TableHead>
                    <TableHead>{t("table.status")}</TableHead>
                    <TableHead>{t("table.result")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center h-24">
                        <p className="text-muted-foreground">Loading signals...</p>
                      </TableCell>
                    </TableRow>
                  ) : filteredSignals.length > 0 ? (
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
                            {signal.type === "BUY" ? t("signals.buy") : t("signals.sell")}
                          </Badge>
                        </TableCell>
                        <TableCell>{signal.entry}</TableCell>
                        <TableCell className="text-negative">{signal.stop_loss}</TableCell>
                        <TableCell className="text-positive">{signal.take_profit}</TableCell>
                        <TableCell>{signal.timeframe}</TableCell>
                        <TableCell>{new Date(signal.date).toLocaleString()}</TableCell>
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
                          {signal.pips !== undefined && signal.pips !== null && (
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
                        <p className="text-muted-foreground">{t("signals.noSignalsFound")}</p>
                        <Button variant="link" onClick={() => {
                          setSearchTerm("");
                          setAssetFilter(null);
                          setStatusFilter(null);
                          setTimeframeFilter(null);
                          setDirectionFilter(null);
                        }}>
                          {t("signals.clearFilters")}
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
                  {t("signals.calendarView")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-12">
                  <div className="flex flex-col items-center text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">{t("signals.calendarSoon")}</h3>
                    <p className="text-muted-foreground max-w-md mt-2">
                      {t("signals.calendarDescription")}
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
            <h2 className="text-2xl font-bold mb-4">{t("signal.details")}</h2>
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
                        {selectedSignal.type === "BUY" ? t("signals.buy") : t("signals.sell")}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-muted-foreground text-sm">{t("signal.entry")}</p>
                          <p className="font-medium">{selectedSignal.entry}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">{t("signal.stopLoss")}</p>
                          <p className="font-medium text-negative">{selectedSignal.stop_loss}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">{t("signal.takeProfit")}</p>
                          <p className="font-medium text-positive">{selectedSignal.take_profit}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-sm">{t("signal.timeframe")}</p>
                          <p className="font-medium">{selectedSignal.timeframe}</p>
                        </div>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <p className="text-muted-foreground text-sm">{t("signal.date")}</p>
                        <p className="font-medium">{new Date(selectedSignal.date).toLocaleString()}</p>
                      </div>
                      
                      <div className="pt-2 border-t border-border">
                        <p className="text-muted-foreground text-sm">{t("signal.status")}</p>
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
                      
                      {selectedSignal.pips !== undefined && selectedSignal.pips !== null && (
                        <div className="pt-2 border-t border-border">
                          <p className="text-muted-foreground text-sm">{t("signal.result")}</p>
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
                      {t("signal.chart")}
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
