
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Home, 
  BarChart, 
  Signal, 
  ChartLine, 
  Settings, 
  User, 
  BookOpen, 
  Info, 
  Menu, 
  LogIn 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { t } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { title: t("nav.home"), path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { title: t("nav.analysis"), path: "/analysis", icon: <BarChart className="h-4 w-4 mr-2" /> },
    { title: t("nav.signals"), path: "/signals", icon: <Signal className="h-4 w-4 mr-2" /> },
    { title: t("nav.charts"), path: "/charts", icon: <ChartLine className="h-4 w-4 mr-2" /> },
    { title: t("nav.indicators"), path: "/indicators", icon: <Settings className="h-4 w-4 mr-2" /> },
    { title: t("nav.blog"), path: "/blog", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { title: t("nav.about"), path: "/about", icon: <Info className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <ChartLine className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">{t("app.name")}</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium flex items-center transition-colors hover:text-primary ${
                isActive(link.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
        </nav>

        {/* User Controls */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              {t("app.login")}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col gap-6 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium flex items-center transition-colors hover:text-primary ${
                      isActive(link.path) ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsSheetOpen(false)}
                  >
                    {link.icon}
                    {link.title}
                  </Link>
                ))}
                <div className="border-t border-border pt-4 mt-2">
                  <Link to="/dashboard" onClick={() => setIsSheetOpen(false)}>
                    <Button variant="outline" className="w-full justify-start mb-2">
                      <User className="h-4 w-4 mr-2" />
                      {t("app.dashboard")}
                    </Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsSheetOpen(false)}>
                    <Button className="w-full justify-start">
                      <LogIn className="h-4 w-4 mr-2" />
                      {t("app.login")} / {t("app.register")}
                    </Button>
                  </Link>
                  <div className="mt-4">
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
