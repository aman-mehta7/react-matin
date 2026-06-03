"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

const Button = ({ children, onClick }) => {
  const buttonRef = useRef(null);
  const fillRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic effect
  const handleMouseMove = (e) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    const btn = buttonRef.current;
    const fill = fillRef.current;
    if (!btn || !fill) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Liquid fill from cursor position
    gsap.set(fill, { x, y, scale: 0, opacity: 1 });
    gsap.to(fill, {
      scale: 6,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    const btn = buttonRef.current;
    const fill = fillRef.current;
    if (!btn || !fill) return;

    // Snap back to natural position
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });

    // Liquid drain
    gsap.to(fill, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative overflow-hidden rounded-full px-10 py-4 cursor-pointer"
      style={{ willChange: "transform" }}
    >
      {/* Static border ring */}
      <span className="absolute inset-0 rounded-full border border-white/20 transition-colors duration-500 group-hover:border-white/50" />

      {/* Outer Glow Ring */}
      <span
        className={`absolute inset-[-2px] rounded-full transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(99,179,237,0.3), transparent 70%)",
          filter: "blur(4px)",
        }}
      />

      {/* Liquid Fill Blob (follows cursor) */}
      <span
        ref={fillRef}
        className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white pointer-events-none"
        style={{ opacity: 0, scale: 0 }}
      />

      {/* Label */}
      <span className="relative z-10 flex items-center gap-3 font-semibold text-sm tracking-widest uppercase">
        {/* Text swaps color on hover */}
        <span
          className={`transition-colors duration-300 ${
            isHovered ? "text-black" : "text-white"
          }`}
        >
          {children}
        </span>

        {/* Arrow indicator */}
        <span
          className={`flex items-center overflow-hidden transition-all duration-300 ${
            isHovered ? "w-5 text-black" : "w-0 text-white"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </span>
    </button>
  );
};

export default Button;