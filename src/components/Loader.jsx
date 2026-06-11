  // import { useEffect, useRef, useState } from "react";
  // import { createPortal } from "react-dom";
  // import gsap from "gsap";
  // import logo from "/logo/matin-logo.png";

  // const STATUS_MESSAGES = [
  //   "INITIALIZING NEURAL LINK...",
  //   "LOADING VOLUMETRIC DATA...",
  //   "SYNCHRONIZING SHADERS...",
  //   "COMPILING VOXEL GEOMETRY...",
  //   "ESTABLISHING SECURE PROTOCOL...",
  //   "SYSTEMS READY.",
  // ];

  // export default function SoftechLoader({ progress = 0, active = true }) {
  //   const [visible, setVisible] = useState(true);

  //   const containerRef = useRef(null);
  //   const logoRef = useRef(null);
  //   const barRef = useRef(null);
  //   const linesRef = useRef([]);

  //   /* ============================
  //     1. BOOT ANIMATION
  //   ============================= */
  //   useEffect(() => {
  //     const ctx = gsap.context(() => {
  //       const tl = gsap.timeline();

  //       gsap.set(".hud-element", { opacity: 0, scale: 1.1 });
  //       gsap.set(linesRef.current, { scaleX: 0 });

  //       tl.to(".hud-element", {
  //         opacity: 1,
  //         scale: 1,
  //         duration: 0.8,
  //         stagger: 0.08,
  //         ease: "expo.out",
  //       })
  //         .to(
  //           linesRef.current,
  //           {
  //             scaleX: 1,
  //             duration: 0.6,
  //             stagger: 0.05,
  //             ease: "power2.inOut",
  //           },
  //           "-=0.4"
  //         )
  //         .to(logoRef.current, {
  //           filter: "drop-shadow(0 0 20px rgba(255,140,0,0.8))",
  //           repeat: -1,
  //           yoyo: true,
  //           duration: 2,
  //         });
  //     }, containerRef);

  //     return () => ctx.revert();
  //   }, []);

  //   /* ============================
  //     2. PROGRESS BAR
  //   ============================= */
  //   useEffect(() => {
  //     gsap.to(barRef.current, {
  //       width: `${progress}%`,
  //       duration: 0.5,
  //       ease: "power1.out",
  //     });
  //   }, [progress]);

  //   /* ============================
  //     3. EXIT SEQUENCE
  //   ============================= */
  //   useEffect(() => {
  //     if (!active && progress >= 100) {
  //       const tl = gsap.timeline({
  //         onComplete: () => setVisible(false),
  //       });

  //       tl.to(".hud-element", {
  //         y: -20,
  //         opacity: 0,
  //         stagger: 0.05,
  //         ease: "back.in(2)",
  //       }).to(containerRef.current, {
  //         // opacity: 0,
  //         scale: 1.05,
  //         duration: 0.6,
  //         ease: "expo.inOut",
  //       });
  //     }
  //   }, [active, progress]);

  //   /* ============================
  //     4. SAFE SCROLL LOCK (iOS friendly)
  //   ============================= */
  //   useEffect(() => {
  //     if (!visible) return;

  //     const scrollY = window.scrollY;

  //     document.body.style.position = "fixed";
  //     document.body.style.top = `-${scrollY}px`;
  //     document.body.style.left = "0";
  //     document.body.style.right = "0";
  //     document.body.style.width = "100%";

  //     return () => {
  //       document.body.style.position = "";
  //       document.body.style.top = "";
  //       document.body.style.left = "";
  //       document.body.style.right = "";
  //       document.body.style.width = "";
  //       window.scrollTo(0, scrollY);
  //     };
  //   }, [visible]);

  //   if (!visible) return null;

  //   const currentStatus =
  //     STATUS_MESSAGES[
  //       Math.min(
  //         Math.floor((progress / 100) * STATUS_MESSAGES.length),
  //         STATUS_MESSAGES.length - 1
  //       )
  //     ];

  //   /* ============================
  //     5. RENDER
  //   ============================= */
  //   return createPortal(
  //     <div
  //       ref={containerRef}
  //       className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#050505] text-orange-500 font-mono overflow-hidden px-4"
  //     >
  //       {/* Background Decoration */}
  //       <div className="absolute inset-0 opacity-20 pointer-events-none">
  //         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff8c00_1px,_transparent_1px)] [background-size:30px_30px]" />
  //         <div className="h-[2px] w-full bg-orange-500/40 absolute top-0 left-0 animate-scan-line" />
  //       </div>

  //       {/* HUD Corners */}
  //       {[
  //         "top-4 left-4 sm:top-10 sm:left-10 border-t-2 border-l-2",
  //         "top-4 right-4 sm:top-10 sm:right-10 border-t-2 border-r-2",
  //         "bottom-4 left-4 sm:bottom-10 sm:left-10 border-b-2 border-l-2",
  //         "bottom-4 right-4 sm:bottom-10 sm:right-10 border-b-2 border-r-2",
  //       ].map((pos, i) => (
  //         <div
  //           key={i}
  //           className={`absolute w-8 h-8 sm:w-12 sm:h-12 border-orange-500/30 hud-element ${pos}`}
  //         />
  //       ))}

  //       {/* Main Content */}
  //       <div className="relative flex flex-col items-center w-full max-w-sm">
  //         {/* Logo + Ring */}
  //         <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center mb-8 sm:mb-12 hud-element">
  //           <svg
  //             viewBox="0 0 256 256"
  //             className="absolute inset-0 w-full h-full -rotate-90"
  //           >
  //             <circle
  //               cx="128"
  //               cy="128"
  //               r="120"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="1"
  //               strokeDasharray="10 20"
  //               className="opacity-20"
  //             />
  //             <circle
  //               cx="128"
  //               cy="128"
  //               r="120"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="2"
  //               strokeDasharray="754"
  //               style={{
  //                 strokeDashoffset: 754 - (754 * progress) / 100,
  //                 transition: "stroke-dashoffset 0.5s ease",
  //               }}
  //             />
  //           </svg>

  //           <img
  //             ref={logoRef}
  //             src={logo}
  //             alt="Logo"
  //             className="w-20 sm:w-28 md:w-32 z-10 filter grayscale brightness-125"
  //           />
  //         </div>

  //         {/* Progress + Status */}
  //         <div className="w-full space-y-2 px-2">
  //           <div className="flex justify-between text-[10px] sm:text-xs tracking-[0.2em] hud-element">
  //             <span className="truncate">{currentStatus}</span>
  //             <span className="font-bold ml-2">{Math.round(progress)}%</span>
  //           </div>

  //           <div className="h-[4px] w-full bg-orange-900/30 relative hud-element">
  //             <div
  //               ref={barRef}
  //               className="h-full bg-orange-500 shadow-[0_0_15px_rgba(255,140,0,0.8)]"
  //             />
  //           </div>
  //         </div>
  //       </div>

  //       {/* Decorative HUD lines (desktop only) */}
  //       <div className="absolute left-6 top-1/2 -translate-y-1/2 flex-col gap-4 hidden md:flex">
  //         {[...Array(6)].map((_, i) => (
  //           <div
  //             key={i}
  //             ref={(el) => (linesRef.current[i] = el)}
  //             className="h-[1px] w-8 bg-orange-500/40 origin-left"
  //           />
  //         ))}
  //       </div>

  //       {/* Scan line animation */}
  //       <style>{`
  //         @keyframes scan-line {
  //           0% { top: -10%; }
  //           100% { top: 110%; }
  //         }
  //         .animate-scan-line {
  //           animation: scan-line 4s linear infinite;
  //         }
  //       `}</style>
  //     </div>,
  //     document.body
  //   );
  // }


  import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import logo from "/logo/matin-logo.png";

export default function SoftechLoader({ progress = 0, active = true }) {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);

  /* =============================
     ENTRY ANIMATION
  ============================== */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hud-element",
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "expo.out",
        }
      );

      gsap.to(logoRef.current, {
        filter: "drop-shadow(0 0 20px rgba(255,140,0,0.8))",
        repeat: -1,
        yoyo: true,
        duration: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* =============================
     PROGRESS BAR
  ============================== */
  useEffect(() => {
    gsap.to(barRef.current, {
      width: `${progress}%`,
      duration: 0.4,
      ease: "power1.out",
    });
  }, [progress]);

  /* =============================
     EXIT ANIMATION
  ============================== */
  useEffect(() => {
    if (!active) {
      const tl = gsap.timeline({
        onComplete: () => {
          requestAnimationFrame(() => {
            setVisible(false);
          });
        },
      });

      tl.to(".hud-element", {
        y: -20,
        opacity: 0,
        stagger: 0.05,
        ease: "power2.in",
      }).to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.6,
        ease: "expo.inOut",
      });
    }
  }, [active]);

  /* =============================
     SIMPLE SCROLL LOCK (NO FLICK)
  ============================== */
  useEffect(() => {
    if (visible) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-screen h-screen z-[99999] flex flex-col items-center justify-center bg-black text-orange-500 font-mono overflow-hidden will-change-transform"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="relative flex flex-col items-center w-full max-w-sm px-6">
        <div className="relative w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center mb-10 hud-element">
          <img
            ref={logoRef}
            src={logo}
            alt="Logo"
            className="w-24 sm:w-32 z-10"
          />
        </div>

        <div className="w-full space-y-2 hud-element">
          <div className="flex justify-between text-xs tracking-widest">
            <span>LOADING...</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-[4px] w-full bg-orange-900/30">
            <div
              ref={barRef}
              className="h-full bg-orange-500"
            />
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}