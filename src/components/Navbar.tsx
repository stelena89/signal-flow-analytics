
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

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { title: t("nav.home"), path: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { title: t("nav.analysis"), path: "/analysis", icon: <BarChart className="h-4 w-4 mr-2" /> },
    { title: t("nav.signals"), path: "/signals", icon: <Signal className="h-4 w-4 mr-2" /> },
    { title: t("nav.charts"), path: "/charts", icon: <ChartLine className="h-4 w-4 mr-2" /> },
    { title: t("nav.indicators"), path: "/indicators", icon: <Settings className="h-4 w-4 mr-2" /> },
    { title: t("nav.blog"), path: "/blog", icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { title: t("nav.about"), path: "/about", icon: <Info className="h-4 w-4 mr-2" /> },
  ];

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
    <header 
      className="
        sticky top-0 z-50 w-full
        bg-background/80 backdrop-blur-sm
        supports-[backdrop-filter]:bg-background/60
        shadow-lg border-b border-border/40
        transition-all duration-200
      "
      style={{
        // Subtle elevation and glass effect for dark + light
        boxShadow: "0 4px 20px 0 rgba(25, 70, 130, 0.07)",
        backdropFilter: "blur(10px)"
      }}
    >
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo & App Name */}
        <Link to="/" className="flex items-center gap-2">
          <ChartLine className="h-7 w-7 text-primary drop-shadow-sm" />
          <span className="font-extrabold text-xl tracking-tight text-primary hidden sm:inline-block">
            {t("app.name")}
          </span>
        </Link>
        
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex items-center px-3 py-2 rounded-lg
                transition-all duration-200
                ${isActive(link.path)
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-muted-foreground hover:text-primary hover:bg-muted/40"}
                font-medium text-sm
              `}
              style={{
                fontWeight: isActive(link.path) ? 700 : 500,
                letterSpacing: "0.02em"
              }}
            >
              {link.icon}
              {link.title}
            </Link>
          ))}
        </div>

        {/* User and controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full shadow-inner">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("app.account") ?? "Account"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {t("app.dashboard") ?? "Dashboard"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    {t("app.profile") ?? "Profile"}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-600 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  {t("app.signout") ?? "Sign out"}
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

          {/* Mobile Hamburger */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden shadow">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background/90 backdrop-blur-md shadow-2xl">
              <div className="flex flex-col gap-6 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      flex items-center px-3 py-2 rounded-lg font-medium text-sm
                      ${isActive(link.path)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/50"}
                    `}
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
                          <p className="font-semibold">{user.user_metadata?.full_name || user.email?.split('@')[0]}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
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
      </nav>
    </header>
  );
};

export default Navbar;

