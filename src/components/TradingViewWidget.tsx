
import { useEffect, useRef } from "react";

interface TradingViewWidgetProps {
  symbol?: string;
  interval?: string;
  theme?: "dark" | "light";
  width?: string | number;
  height?: string | number;
  style?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
  locale?: string;
  toolbar_bg?: string;
  hide_top_toolbar?: boolean;
  hide_side_toolbar?: boolean;
  withdateranges?: boolean;
  details?: boolean;
  hotlist?: boolean;
  calendar?: boolean;
  studies?: string[];
  container?: string;
  className?: string;
}

const TradingViewWidget = ({
  symbol = "BITSTAMP:BTCUSD",
  interval = "D",
  theme = "dark",
  width = "100%",
  height = 500,
  style = "1",
  locale = "en",
  toolbar_bg = "#f1f3f6",
  hide_top_toolbar = false,
  hide_side_toolbar = false,
  withdateranges = true,
  details = true,
  hotlist = false,
  calendar = false,
  studies = [],
  container,
  className = "",
}: TradingViewWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const containerId = container || `tradingview_${Math.random().toString(36).substring(2, 9)}`;
    containerRef.current.id = containerId;

    const script = document.createElement("script");
    script.type = "text/javascript";
    
    // Construct the widget configuration
    const widgetConfig = {
      "symbol": symbol,
      "interval": interval,
      "timezone": "Etc/UTC",
      "theme": theme,
      "style": style,
      "locale": locale,
      "toolbar_bg": toolbar_bg,
      "enable_publishing": false,
      "hide_top_toolbar": hide_top_toolbar,
      "hide_side_toolbar": hide_side_toolbar,
      "withdateranges": withdateranges,
      "allow_symbol_change": true,
      "save_image": false,
      "container_id": containerId,
      "studies": studies,
      "show_popup_button": true
    };

    // Create the widget
    if (details) {
      script.innerHTML = `
        new TradingView.widget(${JSON.stringify(widgetConfig)});
      `;
    } else if (hotlist) {
      script.innerHTML = `
        new TradingView.MediumWidget({
          "symbols": [
            ["Bitcoin", "BITSTAMP:BTCUSD|1D"],
            ["Ethereum", "BITSTAMP:ETHUSD|1D"],
            ["EUR/USD", "FX:EURUSD|1D"],
            ["Gold", "TVC:GOLD|1D"]
          ],
          "chartOnly": false,
          "width": "${width}",
          "height": ${height},
          "locale": "${locale}",
          "colorTheme": "${theme}",
          "autosize": false,
          "showVolume": false,
          "hideDateRanges": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
          "noTimeScale": false,
          "valuesTracking": "1",
          "chartType": "line",
          "container_id": "${containerId}"
        });
      `;
    } else if (calendar) {
      script.innerHTML = `
        new TradingView.EconomicCalendarWidget({
          "width": "${width}",
          "height": ${height},
          "currencies": [
            "USD",
            "EUR",
            "JPY",
            "GBP",
            "AUD",
            "CAD",
            "CHF"
          ],
          "isTransparent": false,
          "colorTheme": "${theme}",
          "locale": "${locale}",
          "importanceFilter": "-1,0,1",
          "container_id": "${containerId}"
        });
      `;
    }

    containerRef.current.appendChild(script);
    widgetRef.current = script;

    return () => {
      if (widgetRef.current && containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, interval, theme, width, height, style, locale, toolbar_bg, hide_top_toolbar, hide_side_toolbar, withdateranges, details, hotlist, calendar, studies, container]);

  return (
    <div className={`tradingview-widget-container chart-container ${className}`}>
      <div ref={containerRef} style={{ width, height }} />
    </div>
  );
};

export default TradingViewWidget;
