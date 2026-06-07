import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import Button from "./Button";
import Scene from "./Scene";

const Hero = () => {
  const paragraphRef = useRef(null);

  useLayoutEffect(() => {
    const el = paragraphRef.current;
    if (!el) return;

    const originalHTML = el.innerHTML;
    let split;
    let tl;

    const buildAnimation = () => {
      tl?.kill();
      split?.revert();
      el.innerHTML = originalHTML;

      split = new SplitType(el, {
        types: "lines",
        lineClass: "anime-line",
      });

      split.lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `
          <span class="anime-fill"></span>
          <span class="anime-text">${content}</span>
        `;
      });

      const fills = el.querySelectorAll(".anime-fill");
      const texts = el.querySelectorAll(".anime-text");

      gsap.set(fills, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(texts, { opacity: 0, y: 10 });

      tl = gsap.timeline({
        delay: 2,
        defaults: { ease: "power3.out" },
      });

      tl.to(fills, { scaleX: 1, duration: 0.55, stagger: 0.16 }).to(
        texts,
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.16 },
        0.08
      );
    };

    buildAnimation();

    return () => {
      el.innerHTML = originalHTML;
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-brand overflow-hidden">
      {/* 3D Scene — full background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Scene />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex items-end h-screen container mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 flex flex-col gap-6">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Welcome to Matin development company
          </h1>

          <p
            ref={paragraphRef}
            className="paint-paragraph text-sm sm:text-base md:text-lg leading-7 sm:leading-8 text-black text-wrap max-w-xl"
          >
            The #1 IT Company that provides various services like app development,
            website development, custom software development at very affordable prices.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button className="py-3 px-6 sm:py-5 sm:px-8">Explore</Button>
            <Button
              className="py-3 px-6 sm:py-5 sm:px-8"
              onClick={() => console.log("clicked")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;