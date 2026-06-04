import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import logo from "/logo/matin-logo.png";

const STATUS_MESSAGES = [
  "INITIALIZING NEURAL LINK...",
  "LOADING VOLUMETRIC DATA...",
  "SYNCHRONIZING SHADERS...",
  "COMPILING VOXEL GEOMETRY...",
  "ESTABLISHING SECURE PROTOCOL...",
  "SYSTEMS READY."
];

export default function SoftechLoader({ progress = 0, active = true }) {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const ringRef = useRef(null);
  const barRef = useRef(null);
  const linesRef = useRef([]);



  

  // --- 1. BOOT ANIMATION ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      gsap.set(".hud-element", { opacity: 0, scale: 1.1 });
      gsap.set(linesRef.current, { scaleX: 0 });

      tl.to(".hud-element", {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "expo.out",
      })
      .to(linesRef.current, {
        scaleX: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.inOut",
      }, "-=0.5")
      .to(logoRef.current, {
        filter: "drop-shadow(0 0 20px rgba(255,140,0,0.8))",
        repeat: -1,
        yoyo: true,
        duration: 2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- 2. PROGRESS LOGIC ---
  useEffect(() => {
    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power1.out"
    });
  }, [progress]);

  // --- 3. EXIT SEQUENCE ---
  useEffect(() => {
    if (!active && progress >= 100) {
      const tl = gsap.timeline({
        onComplete: () => setVisible(false)
      });

      tl.to(".hud-element", { y: -20, opacity: 0, stagger: 0.05, ease: "back.in(2)" })
        .to(containerRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
          ease: "expo.inOut"
        });
    }
  }, [active, progress]);

  // --- 4. BULLETPROOF SCROLL LOCK ---
  useEffect(() => {
    if (visible) {
      // 1. Prevent scroll via CSS
      const originalOverflow = document.documentElement.style.overflow;
      const originalHeight = document.documentElement.style.height;
      
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";

      // 2. Prevent scroll via Events (Essential for iOS/Mobile)
      const preventDefault = (e) => {
        if (visible) e.preventDefault();
      };

      // We use { passive: false } to allow e.preventDefault() to work
      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
      window.addEventListener('keydown', (e) => {
        if (["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown"].includes(e.code)) {
            e.preventDefault();
        }
      }, { passive: false });

      return () => {
        // Restore everything on cleanup
        document.documentElement.style.overflow = originalOverflow;
        document.documentElement.style.height = originalHeight;
        document.body.style.overflow = originalOverflow;
        document.body.style.height = originalHeight;
        window.removeEventListener('wheel', preventDefault);
        window.removeEventListener('touchmove', preventDefault);
      };
    }
  }, [visible]);

  if (!visible) return null;

  const currentStatus = STATUS_MESSAGES[Math.min(
    Math.floor((progress / 100) * STATUS_MESSAGES.length),
    STATUS_MESSAGES.length - 1
  )];

  

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] text-orange-500 font-mono overflow-hidden touch-none"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff8c00_1px,_transparent_1px)] [background-size:40px_40px]" />
        <div className="h-[2px] w-full bg-orange-500/40 absolute top-0 left-0 animate-scan-line" />
      </div>

      {/* HUD Corners */}
      {[
        "top-10 left-10 border-t-2 border-l-2",
        "top-10 right-10 border-t-2 border-r-2",
        "bottom-10 left-10 border-b-2 border-l-2",
        "bottom-10 right-10 border-b-2 border-r-2"
      ].map((pos, i) => (
        <div key={i} className={`absolute w-12 h-12 border-orange-500/30 hud-element ${pos}`} />
      ))}

      {/* Main Content */}
      <div className="relative flex flex-col items-center">
        <div className="relative w-64 h-64 flex items-center justify-center mb-12 hud-element">
          <svg className="absolute inset-0 w-full h-full rotate-[-90deg]">
            <circle cx="128" cy="128" r="120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 20" className="opacity-20" />
            <circle
              ref={ringRef}
              cx="128" cy="128" r="120"
              fill="none" stroke="currentColor" strokeWidth="2"
              strokeDasharray="754"
              style={{ strokeDashoffset: 754 - (754 * progress) / 100 }}
              className="transition-all duration-500"
            />
          </svg>
          <img ref={logoRef} src={logo} alt="Logo" className="w-32 z-10 filter grayscale brightness-125" />
        </div>

        <div className="w-80 space-y-2">
          <div className="flex justify-between text-[10px] tracking-[0.2em] hud-element">
            <span>{currentStatus}</span>
            <span className="font-bold">{Math.round(progress)}%</span>
          </div>
          <div className="h-[4px] w-full bg-orange-900/30 relative hud-element">
            <div ref={barRef} className="h-full bg-orange-500 shadow-[0_0_15px_rgba(255,140,0,0.8)]" />
          </div>
        </div>
      </div>

      {/* Decorative HUD Lines */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} ref={el => linesRef.current[i] = el} className="h-[1px] w-8 bg-orange-500/40 origin-left" />
        ))}
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .animate-scan-line {
          animation: scan-line 4s linear infinite;
        }
      `}</style>
    </div>,
    document.body
  );
}