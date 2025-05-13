
import React, { createContext, useState, useContext, ReactNode } from "react";

type Language = "en" | "ar";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English translations
const enTranslations: Record<string, string> = {
  // Common
  "app.name": "TradeAnalytics Pro",
  "app.login": "Login",
  "app.register": "Register",
  "app.logout": "Logout",
  "app.dashboard": "Dashboard",
  
  // Navigation
  "nav.home": "Home",
  "nav.analysis": "Market Analysis",
  "nav.signals": "Signals",
  "nav.charts": "Charts Hub",
  "nav.indicators": "My Indicators",
  "nav.blog": "Blog",
  "nav.about": "About",
  "nav.contact": "Contact",
  
  // Login/Register Page
  "login.title": "Login to your account",
  "login.description": "Enter your credentials to access your dashboard and signals.",
  "login.email": "Email",
  "login.password": "Password",
  "login.forgotPassword": "Forgot your password?",
  "login.signin": "Sign In",
  "login.orContinueWith": "OR CONTINUE WITH",
  
  "register.title": "Create an account",
  "register.description": "Join thousands of traders using our professional analysis.",
  "register.name": "Name",
  "register.email": "Email",
  "register.password": "Password",
  "register.confirmPassword": "Confirm Password",
  "register.termsText": "By registering, you agree to our",
  "register.termsLink": "Terms of Service",
  "register.privacyLink": "Privacy Policy",
  "register.and": "and",
  "register.createAccount": "Create Account",
  "register.orRegisterWith": "OR REGISTER WITH",
  
  // Signals Page
  "signals.title": "Trading Signals",
  "signals.description": "Real-time and historical trading signals with precise entry, stop-loss, and take-profit levels.",
  "signals.subscribe": "Subscribe to Signals",
  "signals.tableView": "Table View",
  "signals.calendarView": "Calendar View",
  "signals.search": "Search by pair...",
  "signals.assetType": "Asset Type",
  "signals.status": "Status",
  "signals.timeframe": "Timeframe",
  "signals.direction": "Direction",
  "signals.allAssets": "All Assets",
  "signals.forex": "Forex",
  "signals.crypto": "Crypto",
  "signals.commodities": "Commodities",
  "signals.allStatuses": "All Statuses",
  "signals.allTimeframes": "All Timeframes",
  "signals.allDirections": "All Directions",
  "signals.buy": "BUY",
  "signals.sell": "SELL",
  "signals.noSignalsFound": "No signals found matching your filters.",
  "signals.clearFilters": "Clear all filters",
  "signals.calendarSoon": "Calendar View Coming Soon",
  "signals.calendarDescription": "We're working on a calendar view that will allow you to see signals organized by date. Please check back soon or use the table view for now.",
  
  // Signal Details
  "signal.details": "Signal Details",
  "signal.pair": "Pair",
  "signal.type": "Type",
  "signal.entry": "Entry",
  "signal.stopLoss": "Stop Loss",
  "signal.takeProfit": "Take Profit",
  "signal.timeframe": "Timeframe",
  "signal.date": "Date",
  "signal.status": "Status",
  "signal.result": "Result",
  "signal.chart": "Signal Chart",
  "signal.viewDetails": "View Details",
  
  // Table Headers
  "table.pair": "Pair",
  "table.type": "Type",
  "table.entry": "Entry",
  "table.stopLoss": "Stop Loss", 
  "table.takeProfit": "Take Profit",
  "table.timeframe": "Timeframe",
  "table.date": "Date",
  "table.status": "Status",
  "table.result": "Result"
};

// Arabic translations
const arTranslations: Record<string, string> = {
  // Common
  "app.name": "برو للتحليل المالي",
  "app.login": "تسجيل الدخول",
  "app.register": "إنشاء حساب",
  "app.logout": "تسجيل الخروج",
  "app.dashboard": "لوحة التحكم",
  
  // Navigation
  "nav.home": "الرئيسية",
  "nav.analysis": "تحليل السوق",
  "nav.signals": "الإشارات",
  "nav.charts": "مركز الرسوم البيانية",
  "nav.indicators": "المؤشرات الخاصة بي",
  "nav.blog": "المدونة",
  "nav.about": "من نحن",
  "nav.contact": "اتصل بنا",
  
  // Login/Register Page
  "login.title": "تسجيل الدخول إلى حسابك",
  "login.description": "أدخل بيانات الاعتماد للوصول إلى لوحة التحكم والإشارات.",
  "login.email": "البريد الإلكتروني",
  "login.password": "كلمة المرور",
  "login.forgotPassword": "نسيت كلمة المرور؟",
  "login.signin": "تسجيل الدخول",
  "login.orContinueWith": "أو المتابعة باستخدام",
  
  "register.title": "إنشاء حساب",
  "register.description": "انضم إلى آلاف المتداولين الذين يستخدمون تحليلنا المهني.",
  "register.name": "الاسم",
  "register.email": "البريد الإلكتروني",
  "register.password": "كلمة المرور",
  "register.confirmPassword": "تأكيد كلمة المرور",
  "register.termsText": "بالتسجيل، فإنك توافق على",
  "register.termsLink": "شروط الخدمة",
  "register.privacyLink": "سياسة الخصوصية",
  "register.and": "و",
  "register.createAccount": "إنشاء حساب",
  "register.orRegisterWith": "أو التسجيل باستخدام",
  
  // Signals Page
  "signals.title": "إشارات التداول",
  "signals.description": "إشارات تداول في الوقت الفعلي وتاريخية مع مستويات دقيقة للدخول ووقف الخسارة وتحقيق الربح.",
  "signals.subscribe": "اشترك في الإشارات",
  "signals.tableView": "عرض الجدول",
  "signals.calendarView": "عرض التقويم",
  "signals.search": "البحث حسب الزوج...",
  "signals.assetType": "نوع الأصل",
  "signals.status": "الحالة",
  "signals.timeframe": "الإطار الزمني",
  "signals.direction": "الاتجاه",
  "signals.allAssets": "جميع الأصول",
  "signals.forex": "العملات",
  "signals.crypto": "العملات الرقمية",
  "signals.commodities": "السلع",
  "signals.allStatuses": "جميع الحالات",
  "signals.allTimeframes": "جميع الأطر الزمنية",
  "signals.allDirections": "جميع الاتجاهات",
  "signals.buy": "شراء",
  "signals.sell": "بيع",
  "signals.noSignalsFound": "لم يتم العثور على إشارات تطابق المرشحات الخاصة بك.",
  "signals.clearFilters": "مسح جميع المرشحات",
  "signals.calendarSoon": "عرض التقويم قادم قريباً",
  "signals.calendarDescription": "نحن نعمل على طريقة عرض تقويمية ستتيح لك رؤية الإشارات المنظمة حسب التاريخ. يرجى العودة قريبًا أو استخدام عرض الجدول في الوقت الحالي.",
  
  // Signal Details
  "signal.details": "تفاصيل الإشارة",
  "signal.pair": "الزوج",
  "signal.type": "النوع",
  "signal.entry": "الدخول",
  "signal.stopLoss": "وقف الخسارة",
  "signal.takeProfit": "جني الربح",
  "signal.timeframe": "الإطار الزمني",
  "signal.date": "التاريخ",
  "signal.status": "الحالة",
  "signal.result": "النتيجة",
  "signal.chart": "الرسم البياني للإشارة",
  "signal.viewDetails": "عرض التفاصيل",
  
  // Table Headers
  "table.pair": "الزوج",
  "table.type": "النوع",
  "table.entry": "الدخول",
  "table.stopLoss": "وقف الخسارة", 
  "table.takeProfit": "جني الربح",
  "table.timeframe": "الإطار الزمني",
  "table.date": "التاريخ",
  "table.status": "الحالة",
  "table.result": "النتيجة"
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const translations = language === "en" ? enTranslations : arTranslations;

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === "ar" ? "rtl" : "ltr"} className={language === "ar" ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
