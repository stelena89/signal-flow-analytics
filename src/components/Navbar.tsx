
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
  LogIn,
  LogOut 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { t } = useLanguage();
  const { user, signOut } = useAuth();

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

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "?";
    
    const fullName = user.user_metadata?.full_name;
    if (!fullName) return user.email?.charAt(0).toUpperCase() || "?";
    
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    return names[0].charAt(0).toUpperCase();
  };

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
          <ThemeToggle />
          <LanguageSwitcher />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer w-full">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                {t("app.login")}
              </Button>
            </Link>
          )}

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
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                          <AvatarFallback>{getUserInitials()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.user_metadata?.full_name || user.email?.split('@')[0]}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Link to="/dashboard" onClick={() => setIsSheetOpen(false)}>
                        <Button variant="outline" className="w-full justify-start mb-2">
                          <User className="h-4 w-4 mr-2" />
                          {t("app.dashboard")}
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start mb-2"
                        onClick={() => {
                          signOut();
                          setIsSheetOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        {t("app.signout")}
                      </Button>
                    </>
                  ) : (
                    <Link to="/login" onClick={() => setIsSheetOpen(false)}>
                      <Button className="w-full justify-start">
                        <LogIn className="h-4 w-4 mr-2" />
                        {t("app.login")} / {t("app.register")}
                      </Button>
                    </Link>
                  )}
                  <div className="mt-4 flex gap-2">
                    <ThemeToggle />
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
