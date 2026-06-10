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
      className="flex w-full h-screen flex-col items-end justify-center bg-brand  "
    >
      <div className="container mx-auto flex flex-col items-left lg:items-end justify-end ">

      <div className="lg:max-w-4xl pl-6 lg:p-0  overflow-hidden text-wrap">
        <h1
          ref={headingRef}
          className=" header-text font-bold uppercase  text-white text-left lg:text-center"
          >
          WE BELIEVE IN TRUST AND PASSION ON QUALITY.
        </h1>
      </div>
<div className="mt-8 max-w-4xl text-wrap">
  <p
    ref={paragraphRef}
    className="c pl-6 text-left md:text-lg  text-black space-y-2"
  >

      We are an IT company specializing in web development, application
      development, and entrepreneurship.

      We always believe in trust and client satisfaction.

      We strive to ensure our clients never have any reason for regret.



      Our goal is to make our clients happy and fully satisfied.


      We trust in your brand and are here to help enhance it digitally.


      We turn your dream website or application into reality because your
      business is our business.

  </p>
</div>
          </div>
    </section>
  );
};

export default Page2;