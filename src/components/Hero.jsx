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

      gsap.set(fills, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(texts, {
        opacity: 0,
        y: 10,
      });

      tl = gsap.timeline({
        delay: 2,
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
        0.08
      );
    };

    buildAnimation();

    return () => {
      el.innerHTML = originalHTML;
    };
  }, []);

  return (
    <section className="relative w-full h-screen bg-brand ">
    <div className="flex  items-center justify-between h-full text-white  container mx-auto">
      <div className="h-screen w-1/2 flex flex-col pt-70  relative ">
        <h1 className="text-6xl font-bold mb-4 ">
          Welcome to Matin development company
        </h1>

        <p
          ref={paragraphRef}
          className="text-lg leading-8 text-black text-wrap"
        >
        The #1 IT Company that provide various services like app development, <br /> website development , custom software development at a very affordable price. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore labore eos iste repudiandae fugiat laboriosam quia, soluta repellat similique magni, alias libero voluptatum inventore.
        </p>

        <div className="flex space-x-4 mt-20">
          <Button className="py-5 px-8">Explore</Button>
          <Button className="py-5 px-8" onClick={() => console.log("clicked")}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Hero;