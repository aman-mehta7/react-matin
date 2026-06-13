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
    <section className="w-full min-h-screen bg-brand pt-30 lg:pt-0">
      <div className="flex flex-col lg:flex-row relative z-30 items-center justify-start h-screen text-black container mx-auto  ">
        <div className="w-full lg:w-[55%] flex flex-col justify-center gap-8 p-10 bg-brand rounded-lg">
          <h1 className="heading-lg  font-bold">
            Welcome to{" "}
            <span className="bg-linear-to-r from-blue-700 to-cyan-500 bg-clip-text text-transparent ">
              Matin #1
            </span>{" "}
            development company
          </h1>

          <p
            className="max-w-3xl leading-relaxed
             body-lg text-black text-balance"
          >
            <span className="font-bold">The #1 IT Company</span> that provide
            various services like app development , <br className="hidden lg:block" /> website development , custom
            software development at a very affordable price
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button className="py-4 px-8 w-full sm:w-auto bg-linear-to-r from-blue-400 to-cyan-500">Explore</Button>
            <Button
              className="py-4 px-8 w-full sm:w-auto bg-linear-to-r from-blue-400 to-cyan-500"
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
