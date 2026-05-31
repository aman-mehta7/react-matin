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
    let resizeTimer;

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
        delay: 0.2,
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

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildAnimation, 250);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      tl?.kill();
      split?.revert();
      el.innerHTML = originalHTML;
    };
  }, []);

  return (
    <section className="flex items-center justify-between h-full text-white bg-brand px-20">
      <div className="h-screen w-1/2 flex flex-col pt-70 pl-40">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to Matin development company
        </h1>

        <p
          ref={paragraphRef}
          className="paint-paragraph text-lg leading-8 text-gray-700"
        >
          lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum,
          dolor sit amet consectetur adipisicing elit. Pariatur delectus ea fuga
          tempora iure dolorem illo quia, molestiae magni consequatur ab sit
          nesciunt dignissimos. Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Aut a, in molestias voluptate nulla, quaerat eius
          adipisci excepturi eum ullam eligendi magnam distinctio beatae..
        </p>

        <div className="flex mt-8 space-x-4">
          <Button>Explore</Button>
          <Button onClick={() => console.log("clicked")}>Get Started</Button>
        </div>
      </div>

      <div className="model h-screen w-1/2 overflow-hidden">
        <Scene />
      </div>
    </section>
  );
};

export default Hero;