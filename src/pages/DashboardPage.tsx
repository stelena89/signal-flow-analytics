
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignalCard, { Signal } from "@/components/SignalCard";
import TradingViewWidget from "@/components/TradingViewWidget";
import { 
  User, 
  Settings, 
  BarChart, 
  TrendingUp, 
  TrendingDown, 
  LogOut, 
  Bell,
  Bookmark,
  ChevronRight,
  Signal as SignalIcon,
  Mail
} from "lucide-react";

// Sample user data
const userData = {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  joinDate: "August 2022",
  subscription: {
    type: "Premium",
    validUntil: "28 Jun 2024",
    features: ["Real-time signals", "All market analysis", "Custom indicators", "Priority support"]
  }
};

// Sample signals data
const signalHistory: Signal[] = [
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

// Sample watchlist data
const watchlistItems = [
  { id: "1", name: "EUR/USD", last: "1.0956", change: "+0.23%" },
  { id: "2", name: "BTC/USD", last: "43,250.00", change: "-1.20%" },
  { id: "3", name: "Gold", last: "1,970.25", change: "+0.46%" },
  { id: "4", name: "S&P 500", last: "4,230.45", change: "-0.15%" },
  { id: "5", name: "ETH/USD", last: "2,150.75", change: "-0.78%" }
];

const DashboardPage = () => {
  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-accent w-12 h-12 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {userData.name}</h1>
              <p className="text-muted-foreground">
                Member since {userData.joinDate} • {userData.subscription.type} Plan
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <SignalIcon className="h-4 w-4 mr-2 text-primary" />
                    Signal Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">Win rate last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-positive" />
                    Average Gain
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-positive">+42 pips</div>
                  <p className="text-xs text-muted-foreground">Per winning trade</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <TrendingDown className="h-4 w-4 mr-2 text-negative" />
                    Average Loss
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-negative">-24 pips</div>
                  <p className="text-xs text-muted-foreground">Per losing trade</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>
                  Track your trading performance over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TradingViewWidget
                  symbol="CURRENCYCOM:US500"
                  interval="D"
                  height={350}
                  hide_side_toolbar={true}
                />
              </CardContent>
            </Card>

            {/* Signal History */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Signal History</h2>
                <Button variant="outline" size="sm">
                  View All
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {signalHistory.map((signal) => (
                  <SignalCard key={signal.id} signal={signal} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription Card */}
            <Card className="bg-primary/5 border border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Your Subscription
                </CardTitle>
                <CardDescription>
                  {userData.subscription.type} plan - Valid until {userData.subscription.validUntil}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {userData.subscription.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4">
                  Manage Subscription
                </Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="pb-2 border-b border-border">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <SignalIcon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">New Signal: BTC/USD</p>
                        <p className="text-xs text-muted-foreground">SELL @ 43250, SL 43750, TP 42250</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                </div>
                <div className="pb-2 border-b border-border">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <BarChart className="h-5 w-5 text-gold mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">New Analysis: Gold Outlook</p>
                        <p className="text-xs text-muted-foreground">Gold setting up for potential bullish run</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">1d ago</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-2">
                      <Mail className="h-5 w-5 text-positive mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Welcome to Premium!</p>
                        <p className="text-xs text-muted-foreground">Your premium subscription is now active</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">3d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Watchlist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bookmark className="h-5 w-5 mr-2" />
                  Your Watchlist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {watchlistItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <div className="font-medium">{item.name}</div>
                      <div className="flex items-center">
                        <div className="text-sm mr-3">{item.last}</div>
                        <div className={`text-xs ${item.change.startsWith('+') ? 'text-positive' : 'text-negative'}`}>
                          {item.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  Manage Watchlist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
