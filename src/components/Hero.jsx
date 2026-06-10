import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import Button from "./Button";

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

      gsap.set(fills, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(texts, {
        opacity: 0,
        y: 10,
      });

      tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.to(fills, {
        scaleX: 1,
        duration: 0.55,
        stagger: 0.16,
      }).to(
        texts,
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.16,
        },
        0.08,
      );
    };

    buildAnimation();

    return () => {
      el.innerHTML = originalHTML;
    };
  }, []);

  return (
    <section className="w-full min-h-screen bg-brand">
      <div className="flex flex-col lg:flex-row relative z-30 items-center justify-start min-h-screen text-white container mx-auto px-4 py-12 lg:px-0">
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 py-10 lg:py-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-700 to-yellow-700 bg-clip-text text-transparent">
              Matin #1
            </span>{" "}
            development company
          </h1>

          <p
            ref={paragraphRef}
            className="max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-black"
          >
            <span className="font-bold">The #1 IT Company</span> that provide
            various services like app development , website development , custom
            software development at a very affordable price
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button className="py-4 px-8 w-full sm:w-auto">Explore</Button>
            <Button
              className="py-4 px-8 w-full sm:w-auto"
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
