
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={() => setLanguage(language === "en" ? "ar" : "en")}
      className="px-2"
    >
      {language === "en" ? "العربية" : "English"}
    </Button>
  );
};

export default LanguageSwitcher;
