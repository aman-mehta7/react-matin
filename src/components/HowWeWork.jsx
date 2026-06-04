"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, TrendingUp, Settings, ClipboardList } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeWork() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ===== TEXT ANIMATIONS =====
      gsap.from(".how-title", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".how-subtitle", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".step-card", {
        x: -80,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          once: true,
          // markers: true,
        },
      });

      // ===== CURVED LINE DRAW ANIMATION =====
      const path = document.querySelector(".connector-path");
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-brand py-28 px-6 md:px-20 overflow-hidden"
    >
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="how-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          How We Work
        </h2>
        <p className="how-subtitle text-gray-600 text-lg leading-relaxed">
          Our process is designed to deliver high-quality results through careful
          planning, transparent communication, and continuous improvement at
          every stage of the project.
        </p>
      </div>

      {/* Steps Container */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-16 md:gap-8 max-w-7xl mx-auto">

        {/* ✅ Curved SVG Connector Line */}
        <svg
          className="hidden md:block absolute top-0 left-0 w-full h-32 pointer-events-none"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          <path
            className="connector-path"
            d="M50 100 C300 20, 900 180, 1150 100"
            stroke="#d1d5db"
            strokeWidth="3"
            fill="transparent"
            strokeLinecap="round"
          />
        </svg>

        <Step
          Icon={ClipboardList}
          title="Project Planning"
          desc="We begin by understanding your goals and requirements to create a clear roadmap."
        />

        <Step
          Icon={TrendingUp}
          title="Progress Updates"
          desc="Stay informed throughout the process with regular updates and transparent communication."
        />

        <Step
          Icon={Settings}
          title="Testing & Refinement"
          desc="We carefully test the solution, gather feedback, and refine the product."
        />

        <Step
          Icon={CheckCircle}
          title="Final Delivery"
          desc="Your completed project is delivered fully polished, tested, and ready."
        />
      </div>
    </section>
  );
}

function Step({ Icon, title, desc }) {
  return (
    <div data-cursor="view" className="step-card relative flex flex-col items-center text-center max-w-xs group">
      <div className="w-28 h-28 bg-blue-600 rounded-full flex items-center justify-center border-4 border-orange-400 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
        <Icon className="w-10 h-10 text-white transition-transform duration-300 group-hover:rotate-6" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-4 text-gray-600 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}