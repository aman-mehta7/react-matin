import { useRef, useEffect } from "react";
import gsap from "gsap";

const Button = ({ children, onClick, className = "" }) => {
  const buttonRef = useRef(null);
  const fillRef = useRef(null);

  /* ================================
     3D TILT EFFECT
  =================================== */
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, "x", {
      duration: 0.4,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(btn, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const rotateXTo = gsap.quickTo(btn, "rotationX", {
      duration: 0.6,
      ease: "power3.out",
    });

    const rotateYTo = gsap.quickTo(btn, "rotationY", {
      duration: 0.6,
      ease: "power3.out",
    });

    const handleMove = (e) => {
      const rect = btn.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) * 0.12;
      const moveY = (y - centerY) * 0.12;

      xTo(moveX);
      yTo(moveY);

      rotateYTo((x - centerX) * 0.03);
      rotateXTo(-(y - centerY) * 0.03);

      btn.style.setProperty("--x", `${x}px`);
      btn.style.setProperty("--y", `${y}px`);
    };

    const reset = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", reset);

    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", reset);
    };
  }, []);

  /* ================================
     LIQUID FILL EFFECT (FIXED)
  =================================== */
  const enter = (e) => {
    const btn = buttonRef.current;
    const fill = fillRef.current;
    if (!btn || !fill) return;

    const rect = btn.getBoundingClientRect();

    // Kill any running animation
    gsap.killTweensOf(fill);

    // Always reset properly
    gsap.set(fill, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      scale: 0,
      opacity: 1,
      transformOrigin: "center center",
    });

    gsap.to(fill, {
      scale: 8,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  const leave = () => {
    const fill = fillRef.current;
    if (!fill) return;

    gsap.killTweensOf(fill);

    gsap.to(fill, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      data-cursor="link"
      onClick={onClick}
      onMouseEnter={enter}
      onMouseLeave={leave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-full
        font-semibold
        cursor-pointer
        transition-colors
        duration-300
        text-black
        bg-yellow/40
        ${className}
      `}
    >
      {/* Liquid Fill */}
      <span
        ref={fillRef}
        className="
          absolute
          w-24
          h-24
          rounded-full
          pointer-events-none
          -translate-x-1/2
          -translate-y-1/2
        "
        style={{
          opacity: 0,
          background:
            "radial-gradient(circle,#FFE27A 0%,#FFB100 100%)",
        }}
      />

      {/* Shine */}
      <span
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        "
        style={{
          background:
            "radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,.15), transparent 40%)",
        }}
      />

      {/* Border */}
      <span
        className="
          absolute
          inset-0
          rounded-full
          border
          border-white/20
        "
      />

      {/* Content */}
      <span
        className="
          relative
          z-10
          flex
          items-center
          gap-2
          tracking-wide
        "
      >
        <span>{children}</span>

        <span
          className="
            transition-all
            duration-300
            translate-x-0
            group-hover:translate-x-1
          "
        >
          →
        </span>
      </span>
    </button>
  );
};

export default Button;