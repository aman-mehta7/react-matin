import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // 1. Smooth Position Setters
    const xDotTo = gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power3" });
    const yDotTo = gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power3" });
    const xOutlineTo = gsap.quickTo(outlineRef.current, "x", { duration: 0.4, ease: "power3" });
    const yOutlineTo = gsap.quickTo(outlineRef.current, "y", { duration: 0.4, ease: "power3" });

    const handleMouseMove = (e) => {
      const { clientX, clientY, target } = e;
      
      xDotTo(clientX);
      yDotTo(clientY);
      xOutlineTo(clientX);
      yOutlineTo(clientY);

      // 2. REACTION LOGIC (Check for data-cursor attribute)
      const interactiveEl = target.closest("[data-cursor]");
      
      if (interactiveEl) {
        const mode = interactiveEl.getAttribute("data-cursor");
        
        if (mode === "view") {
          setCursorText("VIEW");
          gsap.to(outlineRef.current, { 
            width: 80, height: 80, backgroundColor: "rgba(255, 215, 0, 0.1)", 
            borderColor: "rgba(255, 215, 0, 1)", duration: 0.4 
          });
          gsap.to(dotRef.current, { opacity: 0, duration: 0.2 });
        } else if (mode === "link") {
          setCursorText("");
          gsap.to(outlineRef.current, { width: 40, height: 40, scale: 1.5, borderColor: "white", duration: 0.4 });
        }
      } else {
        // RESET to default
        setCursorText("");
        gsap.to(outlineRef.current, { 
          width: 48, height: 48, scale: 1, backgroundColor: "transparent", 
          borderColor: "rgba(255, 215, 0, 0.8)", duration: 0.4 
        });
        gsap.to(dotRef.current, { opacity: 1, scale: 1, duration: 0.2 });
      }
    };

    // 3. CLICK EFFECT
    const handleMouseDown = () => {
      gsap.to([dotRef.current, outlineRef.current], { scale: 0.7, duration: 0.15 });
    };
    const handleMouseUp = () => {
      gsap.to([dotRef.current, outlineRef.current], { scale: 1, duration: 0.15 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999]">
      {/* Trailing Ring */}
      <div
        ref={outlineRef}
        className="absolute top-0 left-0 w-12 h-12 border-2 border-yellow-400 rounded-full flex items-center justify-center -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}
      >
        {/* The "VIEW" or "Explore" Text */}
        <span 
          ref={textRef}
          className="text-[10px] font-bold text-yellow-400 tracking-tighter"
        >
          {cursorText}
        </span>
      </div>

      {/* Center Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{ boxShadow: "0 0 10px rgba(255, 215, 0, 0.8)" }}
      />
    </div>
  );
}