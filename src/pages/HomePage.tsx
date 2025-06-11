
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TradingViewWidget from "@/components/TradingViewWidget";
import SignalCard, { Signal } from "@/components/SignalCard";
import IndicatorCard, { Indicator } from "@/components/IndicatorCard";
import NewsletterPopup from "@/components/NewsletterPopup";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BarChart, 
  ChartLine, 
  Signal as SignalIcon, 
  BookOpen, 
  TrendingUp, 
  TrendingDown,
  Bell,
  Shield,
  Target,
  Award
} from "lucide-react";

// Sample data for demonstration
const recentSignals: Signal[] = [
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
  }
];

const featuredIndicators: Indicator[] = [
  {
    id: "1",
    name: "Smart Money Concepts",
    description: "Identify smart money concepts like liquidity, order blocks, and breaker blocks.",
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
    description: "View RSI values across multiple timeframes in a single chart.",
    price: 0,
    image: "",
    category: "Oscillator",
    isPremium: false,
    rating: 4.5,
    timeframes: ["5m", "15m", "1h", "4h", "1d"]
  }
];

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 relative">
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Award className="mr-2 h-4 w-4" />
              Trusted by 10,000+ Traders
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Professional<br /> 
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 text-transparent bg-clip-text">Trading Signals</span><br />
              for Market Leaders
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed">
              Access institutional-grade trading signals, comprehensive market analysis, and premium indicators from seasoned professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-lg">
                <Link to="/signals">
                  <SignalIcon className="mr-2 h-5 w-5" />
                  View Live Signals
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/analysis">
                  <BarChart className="mr-2 h-5 w-5" />
                  Market Analysis
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl animate-slide-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <TradingViewWidget 
                height={400} 
                symbol="BITSTAMP:BTCUSD" 
                interval="D"
                hide_side_toolbar={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Professional Tools
            </Badge>
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Everything You Need to <span className="text-primary">Trade Successfully</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive suite of trading tools is designed by professionals for professionals who demand excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-card hover-card border border-border">
              <div className="rounded-full bg-primary/10 p-4 w-fit mb-6">
                <SignalIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Real-Time Signals</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Receive instant notifications for high-probability setups with precise entry, stop-loss, and take-profit levels.
              </p>
              <Button variant="link" asChild className="p-0 text-primary">
                <Link to="/signals" className="flex items-center font-medium">
                  View Signals <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-card hover-card border border-border">
              <div className="rounded-full bg-primary/10 p-4 w-fit mb-6">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Market Analysis</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                In-depth technical and fundamental analysis covering major markets, trends, and trading opportunities.
              </p>
              <Button variant="link" asChild className="p-0 text-primary">
                <Link to="/analysis" className="flex items-center font-medium">
                  Read Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-card hover-card border border-border">
              <div className="rounded-full bg-primary/10 p-4 w-fit mb-6">
                <ChartLine className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground">Premium Indicators</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Advanced technical indicators and tools tested by professional traders for optimal market timing.
              </p>
              <Button variant="link" asChild className="p-0 text-primary">
                <Link to="/indicators" className="flex items-center font-medium">
                  Explore Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Signals Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">Recent Signals</h2>
              <p className="text-muted-foreground">Latest trading opportunities from our expert analysts</p>
            </div>
            <Button variant="outline" asChild className="shadow-sm">
              <Link to="/signals">View All Signals</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Indicators Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">Featured Indicators</h2>
              <p className="text-muted-foreground">Professional-grade tools for advanced technical analysis</p>
            </div>
            <Button variant="outline" asChild className="shadow-sm">
              <Link to="/indicators">View All Indicators</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredIndicators.map((indicator) => (
              <IndicatorCard key={indicator.id} indicator={indicator} />
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-positive/10 text-positive border-positive/20">
              Proven Results
            </Badge>
            <h2 className="text-3xl font-bold text-foreground">Performance Track Record</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-white dark:bg-card p-6 rounded-2xl shadow-card border border-border">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-positive/10 p-3">
                  <TrendingUp className="h-8 w-8 text-positive" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 text-foreground">87%</div>
              <div className="text-sm text-muted-foreground font-medium">Win Rate</div>
              <div className="text-xs text-muted-foreground mt-1">Last 3 Months</div>
            </div>

            <div className="text-center bg-white dark:bg-card p-6 rounded-2xl shadow-card border border-border">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <SignalIcon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 text-foreground">456</div>
              <div className="text-sm text-muted-foreground font-medium">Signals</div>
              <div className="text-xs text-muted-foreground mt-1">This Year</div>
            </div>

            <div className="text-center bg-white dark:bg-card p-6 rounded-2xl shadow-card border border-border">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-gold/10 p-3">
                  <Target className="h-8 w-8 text-gold" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 text-foreground">1.7:1</div>
              <div className="text-sm text-muted-foreground font-medium">Risk/Reward</div>
              <div className="text-xs text-muted-foreground mt-1">Average Ratio</div>
            </div>

            <div className="text-center bg-white dark:bg-card p-6 rounded-2xl shadow-card border border-border">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 text-foreground">24</div>
              <div className="text-sm text-muted-foreground font-medium">Articles</div>
              <div className="text-xs text-muted-foreground mt-1">Educational Content</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/90">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-white/10 p-4">
              <Bell className="h-12 w-12 text-white animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-6 text-white">Never Miss a Trading Opportunity</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful traders who rely on our professional signals and analysis to make informed trading decisions in volatile markets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-lg">
              <SignalIcon className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Bell className="mr-2 h-5 w-5" />
              Join Our Community
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Popup */}
      <NewsletterPopup />
    </>
  );
};

export default HomePage;
