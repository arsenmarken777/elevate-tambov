import { useEffect, useState } from "react";

const SeasonalBackground = () => {
  const [season, setSeason] = useState<"winter" | "spring" | "summer" | "autumn">("summer");

  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 11 || month <= 1) setSeason("winter");
    else if (month >= 2 && month <= 4) setSeason("spring");
    else if (month >= 5 && month <= 7) setSeason("summer");
    else setSeason("autumn");
  }, []);

  const renderSnowflakes = () => {
    return Array.from({ length: 60 }, (_, i) => (
      <div
        key={i}
        className="absolute text-white/50 pointer-events-none animate-snowfall backdrop-blur-[1px]"
        style={{
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 14 + 10}px`,
          animationDelay: `${Math.random() * 10}s`,
          animationDuration: `${Math.random() * 10 + 15}s`,
          textShadow: '0 0 8px rgba(255,255,255,0.8)',
        }}
      >
        ❄
      </div>
    ));
  };

  const renderLeaves = () => {
    return Array.from({ length: 40 }, (_, i) => (
      <div
        key={i}
        className="absolute pointer-events-none animate-snowfall"
        style={{
          left: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 20 + 15}px`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: `${Math.random() * 12 + 10}s`,
          filter: `blur(${Math.random() * 1}px)`,
          color: ['#FF6B35', '#FFA500', '#FF8C42', '#DC2626'][Math.floor(Math.random() * 4)],
          opacity: 0.4,
        }}
      >
        🍂
      </div>
    ));
  };

  const renderFlowers = () => {
    return Array.from({ length: 30 }, (_, i) => (
      <div
        key={i}
        className="absolute pointer-events-none animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 28 + 22}px`,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${Math.random() * 4 + 3}s`,
          opacity: 0.3,
        }}
      >
        {['🌸', '🌺', '🌼', '🌷'][Math.floor(Math.random() * 4)]}
      </div>
    ));
  };

  const renderSun = () => (
    <div className="absolute top-10 right-10 text-8xl animate-float pointer-events-none">
      ☀️
    </div>
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {season === "winter" && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-cyan-50 to-indigo-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(59,130,246,0.3)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(147,197,253,0.25)_0%,_transparent_60%)]" />
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-200/30 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-cyan-200/25 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }} />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-indigo-200/20 rounded-full blur-[90px] animate-float" style={{ animationDelay: '4s', animationDuration: '10s' }} />
          {renderSnowflakes()}
        </div>
      )}
      {season === "spring" && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-pink-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(16,185,129,0.25)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(236,72,153,0.2)_0%,_transparent_60%)]" />
          <div className="absolute top-20 left-20 w-[450px] h-[450px] bg-emerald-200/30 rounded-full blur-[110px] animate-float" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200/25 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s', animationDuration: '9s' }} />
          <div className="absolute top-1/3 right-1/3 w-[350px] h-[350px] bg-teal-200/20 rounded-full blur-[90px] animate-float" style={{ animationDelay: '1s', animationDuration: '11s' }} />
          {renderFlowers()}
        </div>
      )}
      {season === "summer" && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-sky-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(251,191,36,0.35)_0%,_transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_rgba(59,130,246,0.25)_0%,_transparent_60%)]" />
          <div className="absolute top-10 right-10 w-48 h-48 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full animate-pulse-glow" />
            <div className="absolute inset-3 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full animate-float" />
            <div className="absolute inset-6 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-full" />
          </div>
          <div className="absolute top-32 left-10 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 right-32 w-[450px] h-[450px] bg-orange-200/25 rounded-full blur-[110px] animate-float" style={{ animationDelay: '3s', animationDuration: '12s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-sky-200/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '5s', animationDuration: '14s' }} />
        </div>
      )}
      {season === "autumn" && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-red-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_rgba(249,115,22,0.3)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,_rgba(239,68,68,0.25)_0%,_transparent_60%)]" />
          <div className="absolute top-16 right-16 w-[480px] h-[480px] bg-orange-200/30 rounded-full blur-[115px] animate-float" />
          <div className="absolute bottom-24 left-24 w-[420px] h-[420px] bg-red-200/25 rounded-full blur-[105px] animate-float" style={{ animationDelay: '2s', animationDuration: '10s' }} />
          <div className="absolute top-1/2 right-1/4 w-[380px] h-[380px] bg-amber-200/20 rounded-full blur-[95px] animate-float" style={{ animationDelay: '4s', animationDuration: '13s' }} />
          {renderLeaves()}
        </div>
      )}
    </div>
  );
};

export default SeasonalBackground;
