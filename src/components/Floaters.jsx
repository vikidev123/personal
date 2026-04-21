import React, { useMemo } from "react";

const ICONS = ["💗", "💕", "💖", "🌸", "✨", "🎀", "💘"];

const Floaters = ({ count = 22 }) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const size = 14 + Math.random() * 28;
        const duration = 9 + Math.random() * 10;
        const delay = Math.random() * -20;
        const icon = ICONS[Math.floor(Math.random() * ICONS.length)];
        const opacity = 0.55 + Math.random() * 0.4;
        return { i, left, size, duration, delay, icon, opacity };
      }),
    [count]
  );

  return (
    <div className="floaters" aria-hidden="true" data-testid="floaters-bg">
      {items.map((it) => (
        <span
          key={it.i}
          className="floater"
          style={{
            left: `${it.left}%`,
            fontSize: `${it.size}px`,
            animationDuration: `${it.duration}s`,
            animationDelay: `${it.delay}s`,
            opacity: it.opacity,
          }}
        >
          {it.icon}
        </span>
      ))}
    </div>
  );
};

export default Floaters;