import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const INTERACTIVE_SELECTOR = [
  "[data-cursor]",
  "a",
  "button",
  "[role='button']",
  "input[type='button']",
  "input[type='submit']",
  "input[type='reset']",
].join(",");

export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const textRef = useRef(null);

  const modeRef = useRef("default");
  const labelRef = useRef("");
  const visibleRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    const text = textRef.current;

    if (!dot || !outline || !text) return;

    gsap.set([dot, outline], {
      xPercent: -50,
      yPercent: -50,
      autoAlpha: 0,
      force3D: true,
    });

    const xDotTo = gsap.quickTo(dot, "x", {
      duration: 0.08,
      ease: "power3.out",
    });

    const yDotTo = gsap.quickTo(dot, "y", {
      duration: 0.08,
      ease: "power3.out",
    });

    const xOutlineTo = gsap.quickTo(outline, "x", {
      duration: 0.22,
      ease: "power3.out",
    });

    const yOutlineTo = gsap.quickTo(outline, "y", {
      duration: 0.22,
      ease: "power3.out",
    });

    const showCursor = () => {
      if (visibleRef.current) return;
      visibleRef.current = true;

      gsap.to([dot, outline], {
        autoAlpha: 1,
        duration: 0.18,
        overwrite: "auto",
      });
    };

    const hideCursor = () => {
      visibleRef.current = false;

      gsap.to([dot, outline], {
        autoAlpha: 0,
        duration: 0.18,
        overwrite: "auto",
      });
    };

    const applyMode = (mode = "default", label = "") => {
      if (mode === modeRef.current && label === labelRef.current) return;

      modeRef.current = mode;
      labelRef.current = label;
      text.textContent = label;

      switch (mode) {
        case "view":
          gsap.to(outline, {
            width: 82,
            height: 82,
            scale: 1,
            backgroundColor: "rgba(255, 215, 0, 0.16)",
            borderColor: "rgba(255, 215, 0, 1)",
            duration: 0.25,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(dot, {
            scale: 0,
            autoAlpha: 0,
            duration: 0.18,
            ease: "power3.out",
            overwrite: "auto",
          });
          break;

        case "link":
          gsap.to(outline, {
            width: 40,
            height: 40,
            scale: 1.35,
            backgroundColor: "transparent",
            borderColor: "rgba(255,255,255,1)",
            duration: 0.25,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(dot, {
            scale: 1,
            autoAlpha: 1,
            duration: 0.18,
            ease: "power3.out",
            overwrite: "auto",
          });
          break;

        default:
          gsap.to(outline, {
            width: 48,
            height: 48,
            scale: 1,
            backgroundColor: "transparent",
            borderColor: "rgba(250, 204, 21, 0.85)",
            duration: 0.25,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(dot, {
            scale: 1,
            autoAlpha: 1,
            duration: 0.18,
            ease: "power3.out",
            overwrite: "auto",
          });
      }
    };

    const resolveCursorMode = (target) => {
      if (!(target instanceof Element)) {
        return { mode: "default", label: "" };
      }

      const el = target.closest(INTERACTIVE_SELECTOR);

      if (!el) {
        return { mode: "default", label: "" };
      }

      // Manual override always wins
      const explicitMode = el.getAttribute("data-cursor");
      const explicitText = el.getAttribute("data-cursor-text");

      if (explicitMode) {
        if (explicitMode === "hidden") {
          return { mode: "hidden", label: "" };
        }

        if (explicitMode === "view") {
          return {
            mode: "view",
            label: explicitText || "VIEW",
          };
        }

        if (explicitMode === "link") {
          return {
            mode: "link",
            label: explicitText || "",
          };
        }

        return {
          mode: explicitMode,
          label: explicitText || "",
        };
      }

      const tag = el.tagName.toLowerCase();

      // Automatic behavior
      if (tag === "a") {
        return {
          mode: "view",
          label: "VIEW",
        };
      }

      if (
        tag === "button" ||
        el.matches(
          "[role='button'], input[type='button'], input[type='submit'], input[type='reset']"
        )
      ) {
        return {
          mode: "link",
          label: "",
        };
      }

      return { mode: "default", label: "" };
    };

    const handleMouseMove = (e) => {
      showCursor();

      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xOutlineTo(e.clientX);
      yOutlineTo(e.clientY);

      const { mode, label } = resolveCursorMode(e.target);

      if (mode === "hidden") {
        hideCursor();
        return;
      }

      applyMode(mode, label);
    };

    const handleMouseDown = () => {
      if (!visibleRef.current) return;

      gsap.to(outline, {
        scale: modeRef.current === "link" ? 1.15 : 0.9,
        duration: 0.12,
        overwrite: "auto",
      });

      gsap.to(dot, {
        scale: modeRef.current === "view" ? 0 : 0.75,
        duration: 0.12,
        overwrite: "auto",
      });
    };

    const handleMouseUp = () => {
      applyMode(modeRef.current, labelRef.current);
    };

    // Hide when leaving website/window
    const handleWindowMouseOut = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        hideCursor();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hideCursor();
      }
    };

    applyMode("default", "");

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseout", handleWindowMouseOut);
    window.addEventListener("blur", hideCursor);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseout", handleWindowMouseOut);
      window.removeEventListener("blur", hideCursor);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      gsap.killTweensOf([dot, outline]);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-99999 hidden lg:block">
      {/* Ring */}
      <div
        ref={outlineRef}
        className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400 will-change-transform"
        style={{
          boxShadow: "0 0 20px rgba(255, 215, 0, 0.22)",
        }}
      >
        <span
          ref={textRef}
          className="select-none text-[10px] font-semibold tracking-[0.18em] text-black"
        />
      </div>

      {/* Dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-yellow-400 will-change-transform"
        style={{
          boxShadow: "0 0 10px rgba(255, 215, 0, 0.85)",
        }}
      />
    </div>
  );
}