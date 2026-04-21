import React from "react";

/**
 * Cute 2D cartoon rabbit with multiple expressions.
 * expression: "neutral" | "happy" | "sad" | "pleading" | "crying"
 */
const BunnyMascot = ({ expression = "neutral", size = 220 }) => {
  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      data-testid={`bunny-mascot-${expression}`}
      aria-label={`Cartoon rabbit looking ${expression}`}
    >
      {/* soft shadow */}
      <ellipse cx="110" cy="200" rx="55" ry="6" fill="#f7c9da" opacity="0.55" />

      {/* ears back fill */}
      <g>
        <ellipse cx="82" cy="52" rx="14" ry="38" fill="#ffd9e8" />
        <ellipse cx="82" cy="55" rx="7" ry="28" fill="#ffb3cc" />
        <ellipse cx="138" cy="52" rx="14" ry="38" fill="#ffd9e8" />
        <ellipse cx="138" cy="55" rx="7" ry="28" fill="#ffb3cc" />
      </g>

      {/* head */}
      <ellipse cx="110" cy="120" rx="72" ry="66" fill="#fff7fb" stroke="#f2b7cc" strokeWidth="2" />

      {/* cheeks */}
      <ellipse cx="70" cy="138" rx="10" ry="6" fill="#ffb6ce" opacity="0.75" />
      <ellipse cx="150" cy="138" rx="10" ry="6" fill="#ffb6ce" opacity="0.75" />

      {/* eyes */}
      <Eyes expression={expression} />

      {/* nose */}
      <path
        d="M106 130 Q110 135 114 130 Q112 136 110 136 Q108 136 106 130 Z"
        fill="#ff88ad"
      />

      {/* mouth */}
      <Mouth expression={expression} />

      {/* whiskers */}
      <g stroke="#e8a0bc" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
        <line x1="50" y1="142" x2="70" y2="144" />
        <line x1="50" y1="150" x2="70" y2="150" />
        <line x1="150" y1="144" x2="170" y2="142" />
        <line x1="150" y1="150" x2="170" y2="150" />
      </g>

      {/* little bow */}
      <g transform="translate(148 78)">
        <path d="M0 0 L-10 -8 L-10 8 Z" fill="#ff78a8" />
        <path d="M0 0 L10 -8 L10 8 Z" fill="#ff78a8" />
        <circle cx="0" cy="0" r="3" fill="#ffb6ce" />
      </g>

      {/* tears for crying */}
      {(expression === "crying" || expression === "sad") && (
        <g>
          <path d="M82 150 Q80 168 84 168 Q88 168 86 150 Z" fill="#8ecdfb" opacity={expression === "crying" ? 0.95 : 0.0} />
          <path d="M138 150 Q136 168 140 168 Q144 168 142 150 Z" fill="#8ecdfb" opacity={expression === "crying" ? 0.95 : 0.0} />
        </g>
      )}

      {/* sparkles when happy */}
      {expression === "happy" && (
        <g fill="#ffcf3f">
          <Sparkle x={40} y={60} />
          <Sparkle x={180} y={70} />
          <Sparkle x={30} y={160} />
          <Sparkle x={185} y={155} />
        </g>
      )}
    </svg>
  );
};

const Eyes = ({ expression }) => {
  if (expression === "happy") {
    // closed happy arcs
    return (
      <g stroke="#3a1f2c" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M78 118 Q86 108 94 118" />
        <path d="M126 118 Q134 108 142 118" />
      </g>
    );
  }
  if (expression === "sad" || expression === "crying") {
    // droopy eyes
    return (
      <g>
        <ellipse cx="86" cy="122" rx="5.5" ry="7" fill="#3a1f2c" />
        <ellipse cx="134" cy="122" rx="5.5" ry="7" fill="#3a1f2c" />
        <circle cx="84" cy="120" r="2" fill="#fff" />
        <circle cx="132" cy="120" r="2" fill="#fff" />
        {/* sad brows */}
        <path d="M74 108 Q86 104 96 112" stroke="#3a1f2c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M124 112 Q134 104 146 108" stroke="#3a1f2c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    );
  }
  if (expression === "pleading") {
    // big glossy puppy eyes
    return (
      <g>
        <ellipse cx="86" cy="122" rx="9" ry="11" fill="#3a1f2c" />
        <ellipse cx="134" cy="122" rx="9" ry="11" fill="#3a1f2c" />
        <circle cx="83" cy="118" r="3" fill="#fff" />
        <circle cx="131" cy="118" r="3" fill="#fff" />
        <circle cx="90" cy="126" r="1.8" fill="#fff" />
        <circle cx="138" cy="126" r="1.8" fill="#fff" />
        <path d="M74 110 Q86 102 98 112" stroke="#3a1f2c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M122 112 Q134 102 146 110" stroke="#3a1f2c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    );
  }
  // neutral
  return (
    <g>
      <ellipse cx="86" cy="122" rx="6" ry="8" fill="#3a1f2c" />
      <ellipse cx="134" cy="122" rx="6" ry="8" fill="#3a1f2c" />
      <circle cx="84" cy="119" r="2" fill="#fff" />
      <circle cx="132" cy="119" r="2" fill="#fff" />
    </g>
  );
};

const Mouth = ({ expression }) => {
  if (expression === "happy") {
    return (
      <g>
        <path
          d="M100 142 Q110 156 120 142"
          stroke="#b33a65"
          strokeWidth="2.5"
          fill="#ff88ad"
          strokeLinecap="round"
        />
        {/* tongue peek */}
        <path d="M106 148 Q110 152 114 148" fill="#ff5f8a" />
      </g>
    );
  }
  if (expression === "sad" || expression === "crying") {
    return (
      <path
        d="M100 152 Q110 142 120 152"
        stroke="#b33a65"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    );
  }
  if (expression === "pleading") {
    return (
      <path
        d="M102 148 Q110 152 118 148"
        stroke="#b33a65"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    );
  }
  // neutral tiny smile
  return (
    <path
      d="M103 146 Q110 150 117 146"
      stroke="#b33a65"
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
    />
  );
};

const Sparkle = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <path d="M0 -6 L1.4 -1.4 L6 0 L1.4 1.4 L0 6 L-1.4 1.4 L-6 0 L-1.4 -1.4 Z" />
  </g>
);

export default BunnyMascot;