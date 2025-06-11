
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
  CheckCircle,
  Shield,
  Zap
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
      <section className="relative py-24 px-4 overflow-hidden hero-gradient">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <CheckCircle className="w-3 h-3 mr-1" />
                Trusted by 10,000+ traders
              </Badge>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Professional<br /> 
              <span className="professional-text">Trading Intelligence</span><br />
              Made Simple
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Advanced market analysis, real-time signals, and institutional-grade tools to help you trade with confidence and precision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-12 px-8 font-semibold">
                <Link to="/signals">
                  <SignalIcon className="mr-2 h-5 w-5" />
                  View Live Signals
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="h-12 px-8 font-semibold">
                <Link to="/analysis">
                  <BarChart className="mr-2 h-5 w-5" />
                  Market Analysis
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl animate-slide-in">
            <div className="professional-card p-6 rounded-xl">
              <TradingViewWidget 
                height={450} 
                symbol="BITSTAMP:BTCUSD" 
                interval="D"
                hide_side_toolbar={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to <span className="professional-text">Trade Better</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional-grade tools and analysis backed by institutional trading expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="professional-card p-8 hover-card rounded-xl">
              <div className="rounded-xl bg-primary/10 p-4 w-fit mb-6">
                <SignalIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Precision Signals</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Receive high-probability trade setups with exact entry points, stop-loss levels, and profit targets based on institutional analysis.
              </p>
              <Button variant="link" asChild className="p-0 h-auto font-semibold">
                <Link to="/signals" className="flex items-center">
                  Explore Signals <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="professional-card p-8 hover-card rounded-xl">
              <div className="rounded-xl bg-primary/10 p-4 w-fit mb-6">
                <BarChart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Market Intelligence</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Comprehensive market analysis combining technical patterns, fundamental drivers, and sentiment indicators.
              </p>
              <Button variant="link" asChild className="p-0 h-auto font-semibold">
                <Link to="/analysis" className="flex items-center">
                  View Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="professional-card p-8 hover-card rounded-xl">
              <div className="rounded-xl bg-primary/10 p-4 w-fit mb-6">
                <ChartLine className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Pro Indicators</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Advanced trading indicators designed to identify market structure, momentum shifts, and optimal entry points.
              </p>
              <Button variant="link" asChild className="p-0 h-auto font-semibold">
                <Link to="/indicators" className="flex items-center">
                  Browse Tools <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Signals Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Trade Signals</h2>
              <p className="text-muted-foreground">Real-time opportunities from our analysis team</p>
            </div>
            <Button variant="outline" asChild className="font-semibold">
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
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Professional Tools</h2>
              <p className="text-muted-foreground">Battle-tested indicators for serious traders</p>
            </div>
            <Button variant="outline" asChild className="font-semibold">
              <Link to="/indicators">Explore All Tools</Link>
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
          <h2 className="text-3xl font-bold text-center mb-16">Proven Track Record</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="rounded-xl bg-positive/10 p-4 w-fit mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-positive" />
              </div>
              <div className="text-4xl font-bold mb-2">87%</div>
              <div className="text-muted-foreground font-medium">Win Rate</div>
              <div className="text-sm text-muted-foreground">Last 3 months</div>
            </div>

            <div className="text-center">
              <div className="rounded-xl bg-primary/10 p-4 w-fit mx-auto mb-4">
                <SignalIcon className="h-10 w-10 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">456</div>
              <div className="text-muted-foreground font-medium">Signals</div>
              <div className="text-sm text-muted-foreground">This year</div>
            </div>

            <div className="text-center">
              <div className="rounded-xl bg-negative/10 p-4 w-fit mx-auto mb-4">
                <Shield className="h-10 w-10 text-negative" />
              </div>
              <div className="text-4xl font-bold mb-2">1.7:1</div>
              <div className="text-muted-foreground font-medium">Risk/Reward</div>
              <div className="text-sm text-muted-foreground">Average ratio</div>
            </div>

            <div className="text-center">
              <div className="rounded-xl bg-primary/10 p-4 w-fit mx-auto mb-4">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">24</div>
              <div className="text-muted-foreground font-medium">Articles</div>
              <div className="text-sm text-muted-foreground">Educational content</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="rounded-xl bg-primary/10 p-4 w-fit mx-auto mb-6">
            <Zap className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Ready to Trade Like a Pro?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Join thousands of traders who have elevated their performance with our professional analysis and tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-8 font-semibold">
              <SignalIcon className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 font-semibold">
              <Bell className="mr-2 h-5 w-5" />
              Join Community
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
