
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
  ChartLineUp, 
  Signal as SignalIcon, 
  BookOpen, 
  TrendingUp, 
  TrendingDown,
  Bell
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
      <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional<br /> 
              <span className="text-primary">Trading Analysis</span><br />
              for Serious Traders
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get real-time signals, in-depth market analysis, and premium trading indicators backed by professional traders.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/signals">
                  <SignalIcon className="mr-2 h-5 w-5" />
                  Latest Signals
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link to="/analysis">
                  <BarChart className="mr-2 h-5 w-5" />
                  Market Analysis
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full max-w-xl animate-slide-in">
            <TradingViewWidget 
              height={400} 
              symbol="BITSTAMP:BTCUSD" 
              interval="D"
              hide_side_toolbar={true}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trading Tools for <span className="text-primary">Every Strategy</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6 hover-card">
              <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                <SignalIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Signals</h3>
              <p className="text-muted-foreground mb-4">
                Get actionable trading signals with precise entry, stop-loss, and take-profit levels.
              </p>
              <Button variant="link" asChild className="p-0">
                <Link to="/signals" className="flex items-center">
                  View Signals <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="glass-card p-6 hover-card">
              <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Deep dives into market conditions, trends, and trading opportunities.
              </p>
              <Button variant="link" asChild className="p-0">
                <Link to="/analysis" className="flex items-center">
                  Read Analysis <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="glass-card p-6 hover-card">
              <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                <ChartLineUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Indicators</h3>
              <p className="text-muted-foreground mb-4">
                Powerful, battle-tested indicators to enhance your trading strategy.
              </p>
              <Button variant="link" asChild className="p-0">
                <Link to="/indicators" className="flex items-center">
                  Explore Indicators <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Signals Section */}
      <section className="py-16 px-4 bg-accent/30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Recent Signals</h2>
            <Button variant="outline" asChild>
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
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Indicators</h2>
            <Button variant="outline" asChild>
              <Link to="/indicators">View All Indicators</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {featuredIndicators.map((indicator) => (
              <IndicatorCard key={indicator.id} indicator={indicator} />
            ))}
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-16 px-4 bg-accent/30">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center mb-12">Performance Track Record</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-positive" />
              </div>
              <div className="text-3xl font-bold mb-1">87%</div>
              <div className="text-sm text-muted-foreground">Win Rate (Last 3 Months)</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                <SignalIcon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">456</div>
              <div className="text-sm text-muted-foreground">Signals This Year</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                <TrendingDown className="h-8 w-8 text-negative" />
              </div>
              <div className="text-3xl font-bold mb-1">1.7:1</div>
              <div className="text-sm text-muted-foreground">Average Risk/Reward</div>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-2">
                <BookOpen className="h-8 w-8 text-gold" />
              </div>
              <div className="text-3xl font-bold mb-1">24</div>
              <div className="text-sm text-muted-foreground">Educational Articles</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/10">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Bell className="h-10 w-10 text-primary animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Never Miss a Trading Opportunity</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get instant notifications for high-probability trade setups and market analysis directly on your phone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              <SignalIcon className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg">
              <Bell className="mr-2 h-5 w-5" />
              Join Our Telegram
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
