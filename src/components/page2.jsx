"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page2 = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;

    if (!section || !heading || !paragraph) return;

    const originalHeading = heading.innerHTML;
    const originalParagraph = paragraph.innerHTML;

    let headingSplit;
    let paragraphSplit;
    let tl;
    let resizeTimer;

    const buildAnimation = () => {
      tl?.scrollTrigger?.kill();
      tl?.kill();
      headingSplit?.revert();
      paragraphSplit?.revert();

      heading.innerHTML = originalHeading;
      paragraph.innerHTML = originalParagraph;

      headingSplit = new SplitType(heading, {
        types: "lines",
        lineClass: "page2-title-line",
      });

      headingSplit.lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span class="page2-title-inner">${content}</span>`;
      });

      paragraphSplit = new SplitType(paragraph, {
        types: "lines",
        lineClass: "anime-line",
      });

      paragraphSplit.lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `
          <span class="anime-fill"></span>
          <span class="anime-text">${content}</span>
        `;
      });

      const titleLines = heading.querySelectorAll(".page2-title-inner");
      const fills = paragraph.querySelectorAll(".anime-fill");
      const texts = paragraph.querySelectorAll(".anime-text");

      gsap.set(titleLines, {
        xPercent: 120,
        opacity: 0,
      });

      gsap.set(fills, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(texts, {
        opacity: 0,
        x: 12,
        filter: "blur(4px)",
      });

      tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          // end: "top 50%"
          duration: 0.2,
          stagger: 0.1,
          once: true,
          markers: false,
        },
      });

      tl.to(titleLines, {
        xPercent: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power4.out",
      })
        .to(
          fills,
          {
            scaleX: 1,
            duration: 0.55,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          texts,
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.2,
            stagger: 0.1,
            ease: "power2.out",
          },
          "<0.08"
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
      tl?.scrollTrigger?.kill();
      tl?.kill();
      headingSplit?.revert();
      paragraphSplit?.revert();
      heading.innerHTML = originalHeading;
      paragraph.innerHTML = originalParagraph;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex w-full min-h-screen flex-col items-end justify-end bg-brand px-4 sm:px-6 md:px-16 xl:px-[100px] py-16 sm:py-20"
    >
      <div className="max-w-5xl overflow-hidden text-center">
        <h1
          ref={headingRef}
          className="text-3xl md:text-5xl font-bold uppercase tracking-wide text-white"
        >
          WE BELIEVE IN TRUST AND PASSION <br /> ON QUALITY.
        </h1>
      </div>

      <div className="mt-8 max-w-4xl">
        <p
          ref={paragraphRef}
          className=" text-base md:text-lg leading-8 md:leading-9 text-black "
        >
          We are the IT company which deals on Web development, Application
          development, and Entrepreneurship. <br/> We always believe on Trust and
          client satisfaction.  <br/> We always try to never give a chance to our
          client any type of regretation. <br/> Our believe is make our Clients happy
          and Satisfied. <br/> We trust in your brand and we are here to help you
          enhancing your brand digitally. <br/> We will turn your dream website or app
          into reality because your business is our business.
        </p>
      </div>
    </section>
  );
};

export default Page2;