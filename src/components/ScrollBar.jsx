import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StyledScrollbar() {
  const thumbRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const updateScroll = () => {
      // Calculate how far we've scrolled (0 to 1)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      
      // Get height of the track and thumb
      const trackHeight = trackRef.current.offsetHeight;
      const thumbHeight = thumbRef.current.offsetHeight;
      
      // Move the thumb
      const moveDistance = (trackHeight - thumbHeight) * progress;
      
      gsap.to(thumbRef.current, {
        y: moveDistance,
        duration: 0.1, // Slight lag for "organic" feel
        ease: "none",
      });
    };

    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[999] hidden md:block"
      style={{ pointerEvents: 'none' }} // Don't block clicking things behind it
    >
      {/* The Track */}
      <div 
        ref={trackRef}
        className="relative h-[60vh] w-[4px] rounded-full"
        style={{
          background: "rgba(0, 0, 0, 0.05)", // Ultra-subtle track
          backdropFilter: "blur(4px)",
        }}
      >
        {/* The Thumb */}
        <div 
          ref={thumbRef}
          className="absolute top-0 left-0 w-full h-16 rounded-full"
          style={{
            background: "var(--yellow, #8AC4E7)",
            boxShadow: "0 0 15px rgba(138, 196, 231, 0.4)", // Soft glow
          }}
        />
        
        {/* Top & Bottom Limit Markers */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black" />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black" />
      </div>
    </div>
  );
}