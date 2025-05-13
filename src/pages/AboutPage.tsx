
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  User, 
  Award, 
  Clock, 
  BarChart, 
  ChartLine, 
  Signal, 
  BookOpen, 
  Twitter,
  Youtube,
  Instagram,
  MessageCircle,
  Mail
} from "lucide-react";

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 px-4 bg-accent/30">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-primary">TradeAnalytics Pro</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Professional trading analysis and education to help you succeed in the markets.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link to="/contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/signals">
                  <Signal className="mr-2 h-5 w-5" />
                  Try Our Signals
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-64 h-64 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-32 w-32 text-primary/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground">
              From retail trader to professional analyst - the journey that led to TradeAnalytics Pro
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="mb-4">
                TradeAnalytics Pro was founded in 2018 by a team of professional traders with over 20 years of combined experience in the forex, cryptocurrency, and stock markets.
              </p>
              <p className="mb-4">
                After years of experiencing the challenges and pitfalls that retail traders face, we recognized a critical gap in the market: the lack of professional-grade analysis and signals backed by institutional trading methods.
              </p>
              <p>
                Our mission is to bridge this gap by providing retail traders with the same level of analysis, tools, and education that institutional traders rely on. We believe that with the right guidance, anyone can achieve consistent success in the markets.
              </p>
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Our Philosophy</h3>
                      <p className="text-muted-foreground">
                        We believe in transparency, education, and empowerment. Our goal is not just to provide signals, but to help you understand the "why" behind each trade so you can eventually develop your own edge.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Our Approach</h3>
                      <p className="text-muted-foreground">
                        We combine advanced technical analysis with fundamental insights and institutional order flow concepts to identify high-probability trading opportunities across multiple timeframes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-4 bg-accent/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-muted-foreground">
              Comprehensive trading resources for traders at every level
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover-card">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Signal className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trading Signals</h3>
                  <p className="text-muted-foreground">
                    Precise entry, stop-loss, and take-profit levels for forex, cryptocurrencies, and commodities across multiple timeframes.
                  </p>
                  <Button variant="link" asChild className="mt-4">
                    <Link to="/signals">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <BarChart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Market Analysis</h3>
                  <p className="text-muted-foreground">
                    In-depth technical and fundamental analysis of major markets, with clear explanations and visual chart breakdowns.
                  </p>
                  <Button variant="link" asChild className="mt-4">
                    <Link to="/analysis">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <ChartLine className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Custom Indicators</h3>
                  <p className="text-muted-foreground">
                    Professional-grade trading indicators designed to identify high-probability setups and enhance your chart analysis.
                  </p>
                  <Button variant="link" asChild className="mt-4">
                    <Link to="/indicators">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <p className="text-muted-foreground">
                    Comprehensive trading education through articles, videos, and courses for beginners to advanced traders.
                  </p>
                  <Button variant="link" asChild className="mt-4">
                    <Link to="/blog">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    Join our community of traders to share ideas, discuss markets, and grow together in a supportive environment.
                  </p>
                  <Button variant="link" asChild className="mt-4">
                    <Link to="/contact">Join Community</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-primary/10 p-4 mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Support</h3>
                  <p className="text-muted-foreground">
                    Dedicated support to help you get the most out of our services and answer any questions you may have.
                  </p>
                  <Button variant="link" asChild className="mt-4">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground">
              Professional traders and analysts dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-card">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-primary/40" />
                  </div>
                  <h3 className="text-xl font-semibold">John Smith</h3>
                  <p className="text-primary mb-2">Founder & Lead Analyst</p>
                  <p className="text-muted-foreground text-sm mb-4">
                    Former institutional forex trader with 12+ years of experience. Specializes in price action and order flow analysis.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Instagram className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-primary/40" />
                  </div>
                  <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                  <p className="text-primary mb-2">Technical Analyst</p>
                  <p className="text-muted-foreground text-sm mb-4">
                    Cryptocurrency expert with 8+ years of trading experience. Focuses on harmonic patterns and Wyckoff methodology.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Youtube className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-primary/40" />
                  </div>
                  <h3 className="text-xl font-semibold">Michael Lee</h3>
                  <p className="text-primary mb-2">Education Director</p>
                  <p className="text-muted-foreground text-sm mb-4">
                    Trading educator with a background in finance. Passionate about making complex trading concepts accessible to everyone.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Youtube className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Trading?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of traders who have improved their results with our professional analysis and tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/signals">
                <Signal className="mr-2 h-5 w-5" />
                Get Started
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
