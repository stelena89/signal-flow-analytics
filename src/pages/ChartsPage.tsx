import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TradingViewWidget from "@/components/TradingViewWidget";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ChartLine, 
  BarChart, 
  Save, 
  Copy, 
  Settings,
  CandlestickChart,
  MessageCircle,
  Calendar
} from "lucide-react";

const ChartsPage = () => {
  const [selectedPair, setSelectedPair] = useState("BITSTAMP:BTCUSD");
  const [selectedInterval, setSelectedInterval] = useState("D");
  const [selectedTemplate, setSelectedTemplate] = useState("default");

  const chartTemplates = [
    { 
      id: "default", 
      name: "Default",
      description: "Standard chart with no indicators",
      icon: <ChartLine className="h-5 w-5" /> 
    },
    { 
      id: "trend-following", 
      name: "Trend Following",
      description: "EMA, MACD, and RSI for trend identification",
      icon: <ChartLine className="h-5 w-5" />,
      studies: ["MACD@tv-basicstudies", "RSI@tv-basicstudies", "EMA@tv-basicstudies"]
    },
    { 
      id: "support-resistance", 
      name: "Support & Resistance",
      description: "Pivot points and volume profile",
      icon: <CandlestickChart className="h-5 w-5" />,
      studies: ["PivotPointsStandard@tv-basicstudies", "Volume@tv-basicstudies"]
    },
    { 
      id: "volatility", 
      name: "Volatility Analysis",
      description: "Bollinger Bands and ATR for volatility measurement",
      icon: <BarChart className="h-5 w-5" />,
      studies: ["BB@tv-basicstudies", "ATR@tv-basicstudies"]
    }
  ];

  const forexPairs = [
    { value: "FX:EURUSD", label: "EUR/USD" },
    { value: "FX:GBPUSD", label: "GBP/USD" },
    { value: "FX:USDJPY", label: "USD/JPY" },
    { value: "FX:AUDUSD", label: "AUD/USD" },
    { value: "FX:USDCAD", label: "USD/CAD" },
    { value: "FX:USDCHF", label: "USD/CHF" },
    { value: "FX:NZDUSD", label: "NZD/USD" },
    { value: "FX:GBPJPY", label: "GBP/JPY" },
  ];

  const cryptoPairs = [
    { value: "BITSTAMP:BTCUSD", label: "BTC/USD" },
    { value: "BITSTAMP:ETHUSD", label: "ETH/USD" },
    { value: "BINANCE:SOLUSDT", label: "SOL/USDT" },
    { value: "BINANCE:DOGEUSDT", label: "DOGE/USDT" },
    { value: "BINANCE:ADAUSDT", label: "ADA/USDT" },
    { value: "BINANCE:XRPUSDT", label: "XRP/USDT" },
  ];

  const commoditiesPairs = [
    { value: "TVC:GOLD", label: "Gold" },
    { value: "TVC:SILVER", label: "Silver" },
    { value: "TVC:USOIL", label: "Crude Oil" },
    { value: "TVC:UKOIL", label: "Brent Oil" },
    { value: "TVC:COPPER", label: "Copper" },
  ];

  const intervals = [
    { value: "1", label: "1m" },
    { value: "5", label: "5m" },
    { value: "15", label: "15m" },
    { value: "30", label: "30m" },
    { value: "60", label: "1h" },
    { value: "240", label: "4h" },
    { value: "D", label: "1d" },
    { value: "W", label: "1w" },
    { value: "M", label: "1M" },
  ];

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2">Charts Hub</h1>
        <p className="text-muted-foreground mb-6">
          Interactive trading charts with custom layouts and indicators.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Asset Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <ChartLine className="h-4 w-4 mr-2" />
                  Chart Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Symbol</label>
                  <Tabs defaultValue="crypto" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-2">
                      <TabsTrigger value="crypto">Crypto</TabsTrigger>
                      <TabsTrigger value="forex">Forex</TabsTrigger>
                      <TabsTrigger value="commodities">Commodities</TabsTrigger>
                    </TabsList>
                    <TabsContent value="crypto" className="mt-0">
                      <Select
                        value={selectedPair}
                        onValueChange={(value) => setSelectedPair(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select pair" />
                        </SelectTrigger>
                        <SelectContent>
                          {cryptoPairs.map((pair) => (
                            <SelectItem key={pair.value} value={pair.value}>
                              {pair.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TabsContent>
                    <TabsContent value="forex" className="mt-0">
                      <Select
                        value={selectedPair}
                        onValueChange={(value) => setSelectedPair(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select pair" />
                        </SelectTrigger>
                        <SelectContent>
                          {forexPairs.map((pair) => (
                            <SelectItem key={pair.value} value={pair.value}>
                              {pair.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TabsContent>
                    <TabsContent value="commodities" className="mt-0">
                      <Select
                        value={selectedPair}
                        onValueChange={(value) => setSelectedPair(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select pair" />
                        </SelectTrigger>
                        <SelectContent>
                          {commoditiesPairs.map((pair) => (
                            <SelectItem key={pair.value} value={pair.value}>
                              {pair.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TabsContent>
                  </Tabs>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Timeframe</label>
                  <Select
                    value={selectedInterval}
                    onValueChange={(value) => setSelectedInterval(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      {intervals.map((interval) => (
                        <SelectItem key={interval.value} value={interval.value}>
                          {interval.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Template</label>
                  <Select
                    value={selectedTemplate}
                    onValueChange={(value) => setSelectedTemplate(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {chartTemplates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          <div className="flex items-center">
                            {template.icon}
                            <span className="ml-2">{template.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Button className="w-full" disabled={selectedTemplate === "default"}>
                    <Settings className="mr-2 h-4 w-4" />
                    Customize Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Template Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <ChartLine className="h-4 w-4 mr-2" />
                  Template Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {chartTemplates.find(t => t.id === selectedTemplate)?.description || "No template selected"}
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Layout
              </Button>
              <Button variant="outline" className="w-full">
                <Copy className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

            {/* Additional Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Additional Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Economic Calendar
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Trading Community
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" />
                  Market Overview
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Chart Area */}
          <div className="lg:col-span-3">
            <Card className="mb-4">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg flex items-center">
                  <span>
                    {
                      selectedPair.includes("BTC") ? "Bitcoin (BTC/USD)" :
                      selectedPair.includes("ETH") ? "Ethereum (ETH/USD)" :
                      selectedPair.includes("EURUSD") ? "Euro / US Dollar (EUR/USD)" :
                      selectedPair.includes("GOLD") ? "Gold (XAU/USD)" :
                      selectedPair
                    }
                  </span>
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    {
                      selectedInterval === "1" ? "1 Minute" :
                      selectedInterval === "5" ? "5 Minutes" :
                      selectedInterval === "15" ? "15 Minutes" :
                      selectedInterval === "30" ? "30 Minutes" :
                      selectedInterval === "60" ? "1 Hour" :
                      selectedInterval === "240" ? "4 Hours" :
                      selectedInterval === "D" ? "1 Day" :
                      selectedInterval === "W" ? "1 Week" :
                      selectedInterval === "M" ? "1 Month" :
                      selectedInterval
                    }
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <TradingViewWidget
                  symbol={selectedPair}
                  interval={selectedInterval}
                  height={700}
                  studies={chartTemplates.find(t => t.id === selectedTemplate)?.studies}
                  hide_side_toolbar={false}
                  hide_top_toolbar={false}
                  details={true}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
