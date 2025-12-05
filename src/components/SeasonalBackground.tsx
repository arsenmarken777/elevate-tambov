import { useEffect, useState, useMemo } from "react";

const SeasonalBackground = () => {
  const [season, setSeason] = useState<"winter" | "spring" | "summer" | "autumn">("summer");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const month = new Date().getMonth();
    if (month >= 11 || month <= 1) setSeason("winter");
    else if (month >= 2 && month <= 4) setSeason("spring");
    else if (month >= 5 && month <= 7) setSeason("summer");
    else setSeason("autumn");
    
    // Check if mobile
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Reduce elements count significantly for mobile
  const elementCount = isMobile ? 8 : 15;

  const snowflakes = useMemo(() => {
    return Array.from({ length: elementCount }, (_, i) => ({
      id: i,
      left: `${(i * 100) / elementCount}%`,
      fontSize: `${12 + (i % 3) * 4}px`,
      delay: `${i * 0.5}s`,
      duration: `${15 + (i % 3) * 5}s`,
    }));
  }, [elementCount]);

  const leaves = useMemo(() => {
    return Array.from({ length: elementCount }, (_, i) => ({
      id: i,
      left: `${(i * 100) / elementCount}%`,
      fontSize: `${18 + (i % 3) * 6}px`,
      delay: `${i * 0.6}s`,
      duration: `${12 + (i % 3) * 4}s`,
      color: ['#FF6B35', '#FFA500', '#FF8C42', '#DC2626'][i % 4],
    }));
  }, [elementCount]);

  const flowers = useMemo(() => {
    return Array.from({ length: elementCount }, (_, i) => ({
      id: i,
      left: `${(i * 100) / elementCount}%`,
      top: `${(i * 25) % 100}%`,
      fontSize: `${24 + (i % 3) * 6}px`,
      delay: `${i * 0.4}s`,
      duration: `${4 + (i % 3) * 2}s`,
      emoji: ['🌸', '🌺', '🌼', '🌷'][i % 4],
    }));
  }, [elementCount]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {season === "winter" && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-cyan-50 to-indigo-100" />
          {!isMobile && (
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
          )}
          {snowflakes.map((flake) => (
            <div
              key={flake.id}
              className="absolute text-white/40 pointer-events-none animate-snowfall"
              style={{
                left: flake.left,
                fontSize: flake.fontSize,
                animationDelay: flake.delay,
                animationDuration: flake.duration,
                willChange: 'transform',
              }}
            >
              ❄
            </div>
          ))}
        </div>
      )}
      {season === "spring" && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-pink-100" />
          {!isMobile && (
            <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl" />
          )}
          {flowers.map((flower) => (
            <div
              key={flower.id}
              className="absolute pointer-events-none animate-float"
              style={{
                left: flower.left,
                top: flower.top,
                fontSize: flower.fontSize,
                animationDelay: flower.delay,
                animationDuration: flower.duration,
                opacity: 0.25,
                willChange: 'transform',
              }}
            >
              {flower.emoji}
            </div>
          ))}
        </div>
      )}
      {season === "summer" && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-sky-100" />
          {!isMobile && (
            <>
              <div className="absolute top-10 right-10 w-32 h-32 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full" />
              </div>
              <div className="absolute top-32 left-10 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl" />
            </>
          )}
        </div>
      )}
      {season === "autumn" && (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-red-100" />
          {!isMobile && (
            <div className="absolute top-16 right-16 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl" />
          )}
          {leaves.map((leaf) => (
            <div
              key={leaf.id}
              className="absolute pointer-events-none animate-snowfall"
              style={{
                left: leaf.left,
                fontSize: leaf.fontSize,
                animationDelay: leaf.delay,
                animationDuration: leaf.duration,
                color: leaf.color,
                opacity: 0.12,
                willChange: 'transform',
              }}
            >
              🍂
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SeasonalBackground;
