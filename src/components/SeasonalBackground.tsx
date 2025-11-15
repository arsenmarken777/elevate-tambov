import { useEffect, useState } from "react";

const SeasonalBackground = () => {
  const [season, setSeason] = useState<"winter" | "spring" | "summer" | "autumn">("spring");

  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 11 || month <= 1) setSeason("winter");
    else if (month >= 2 && month <= 4) setSeason("spring");
    else if (month >= 5 && month <= 7) setSeason("summer");
    else setSeason("autumn");
  }, []);

  const renderSnowflakes = () => {
    return Array.from({ length: 50 }, (_, i) => (
      <div
        key={i}
        className="absolute text-white/30 pointer-events-none animate-snowfall"
        style={{
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 10 + 10}px`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${Math.random() * 10 + 10}s`,
        }}
      >
        ❄
      </div>
    ));
  };

  const renderLeaves = () => {
    return Array.from({ length: 30 }, (_, i) => (
      <div
        key={i}
        className="absolute text-secondary/20 pointer-events-none animate-snowfall"
        style={{
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 15 + 15}px`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${Math.random() * 12 + 8}s`,
        }}
      >
        🍂
      </div>
    ));
  };

  const renderFlowers = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute pointer-events-none animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 20 + 20}px`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        }}
      >
        🌸
      </div>
    ));
  };

  const renderSun = () => (
    <div className="absolute top-10 right-10 text-8xl animate-float pointer-events-none">
      ☀️
    </div>
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {season === "winter" && (
        <div className="relative w-full h-full bg-gradient-to-b from-blue-50/50 to-blue-100/30">
          {renderSnowflakes()}
        </div>
      )}
      {season === "spring" && (
        <div className="relative w-full h-full bg-gradient-to-b from-green-50/30 to-pink-50/30">
          {renderFlowers()}
        </div>
      )}
      {season === "summer" && (
        <div className="relative w-full h-full bg-gradient-to-b from-yellow-50/40 to-blue-50/30">
          {renderSun()}
        </div>
      )}
      {season === "autumn" && (
        <div className="relative w-full h-full bg-gradient-to-b from-orange-50/30 to-amber-50/30">
          {renderLeaves()}
        </div>
      )}
    </div>
  );
};

export default SeasonalBackground;
