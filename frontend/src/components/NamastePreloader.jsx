import React, { useState, useEffect } from "react";
import "./NamastePreloader.css";

const NamastePreloader = ({ onFinish }) => {
  const [status, setStatus] = useState("closed"); // 'closed' -> 'open' -> 'finished'

  useEffect(() => {
    // Disable body scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Hold doors closed for 1.6s
    const timer1 = setTimeout(() => {
      setStatus("open");
    }, 1600);

    // Complete animation & unmount overlay at 2.9s
    const timer2 = setTimeout(() => {
      setStatus("finished");
      document.body.style.overflow = "auto";
      if (onFinish) onFinish();
    }, 2900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      document.body.style.overflow = "auto";
    };
  }, [onFinish]);

  const handleSkip = () => {
    setStatus("finished");
    document.body.style.overflow = "auto";
    if (onFinish) onFinish();
  };

  if (status === "finished") return null;

  return (
    <div className={`namaste-preloader-container ${status}`}>
      {/* SKIP INTRO BUTTON */}
      {status === "closed" && (
        <button className="namaste-skip-btn" onClick={handleSkip}>
          Skip Intro &rarr;
        </button>
      )}

      {/* SVG GRADIENTS MATCHING SITE THEME (Gold & Royal Blue/Navy) */}
      <svg width="0" height="0" style={{ position: "absolute", opacity: 0 }}>
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="navyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
        </defs>
      </svg>

      {/* LEFT DOOR PANEL (Midnight Dark Navy & Slate) */}
      <div className="namaste-door-left">
        <div className="namaste-seam-glow"></div>
        <div className="namaste-door-content">
          <div className="namaste-hero-wrapper">
            {/* NAMASTE HANDS SVG EXACT KALYANI SCHOOL STYLE */}
            <svg
              className="namaste-svg-hands"
              viewBox="0 0 400 420"
              width="310"
              height="325"
            >
              {/* LEFT HAND (Gold Gradient) */}
              <g fill="url(#goldGradient)">
                {/* Main Hand Contour with Wrist Bulb & Finger Stack */}
                <path d="M 200,40 
                         C 192,52 182,75 176,98 
                         C 170,122 165,148 160,172 
                         C 155,195 148,212 136,225 
                         C 124,238 118,252 128,266 
                         C 138,278 152,272 164,254 
                         C 170,245 174,235 176,220 
                         C 168,252 152,288 132,320 
                         C 122,336 114,352 128,362 
                         C 142,370 156,356 168,340 
                         C 182,320 194,285 200,240 
                         L 200,40 Z" />

                {/* Finger Ridges / Layer Outlines */}
                <path d="M 188,72 C 182,95 176,122 172,150" stroke="#fef08a" strokeWidth="2.5" opacity="0.45" fill="none" strokeLinecap="round" />
                <path d="M 180,105 C 174,130 168,160 164,188" stroke="#fef08a" strokeWidth="2" opacity="0.35" fill="none" strokeLinecap="round" />
              </g>
            </svg>

            <h1 className="namaste-text">Namasté</h1>
            <p className="namaste-subtext">|| वसुधैव कुटुम्बकम् ||</p>
          </div>
        </div>
      </div>

      {/* RIGHT DOOR PANEL (Royal Blue & Indigo) */}
      <div className="namaste-door-right">
        <div className="namaste-seam-glow"></div>
        <div className="namaste-door-content">
          <div className="namaste-hero-wrapper">
            {/* NAMASTE HANDS SVG EXACT KALYANI SCHOOL STYLE */}
            <svg
              className="namaste-svg-hands"
              viewBox="0 0 400 420"
              width="310"
              height="325"
            >
              {/* RIGHT HAND (Royal Sapphire Navy / White) */}
              <g fill="url(#navyGradient)">
                {/* Main Hand Contour with Wrist Bulb & Finger Stack (Mirrored) */}
                <path d="M 200,40 
                         C 208,52 218,75 224,98 
                         C 230,122 235,148 240,172 
                         C 245,195 252,212 264,225 
                         C 276,238 282,252 272,266 
                         C 262,278 248,272 236,254 
                         C 230,245 226,235 224,220 
                         C 232,252 248,288 268,320 
                         C 278,336 286,352 272,362 
                         C 258,370 244,356 232,340 
                         C 218,320 206,285 200,240 
                         L 200,40 Z" />

                {/* Finger Ridges / Layer Outlines */}
                <path d="M 212,72 C 218,95 224,122 228,150" stroke="#ffffff" strokeWidth="2.5" opacity="0.45" fill="none" strokeLinecap="round" />
                <path d="M 220,105 C 226,130 232,160 236,188" stroke="#ffffff" strokeWidth="2" opacity="0.35" fill="none" strokeLinecap="round" />
              </g>
            </svg>

            <h1 className="namaste-text">Namasté</h1>
            <p className="namaste-subtext">|| वसुधैव कुटुम्बकम् ||</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NamastePreloader;
