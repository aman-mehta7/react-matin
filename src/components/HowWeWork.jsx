"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CheckCircle, TrendingUp, Settings, ClipboardList } from "lucide-react";

export default function HowWeWork() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(".how-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Subtitle animation
      gsap.from(".how-subtitle", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      // Cards stagger animation
      gsap.from(".step-card", {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.2,
        delay: 0.4,
        ease: "back.out(1.7)",
      });

      // Line animation
      gsap.from(".connector-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        delay: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f4f6f8] py-28 px-6 md:px-20 overflow-hidden"
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

      {/* Steps */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-16 md:gap-8 max-w-7xl mx-auto">

        {/* Connector Line */}
        <div className="connector-line hidden md:block absolute top-16 left-0 w-full h-[2px] border-dashed border-t-2 border-gray-300"></div>

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
    <div className="step-card relative flex flex-col items-center text-center max-w-xs group">

      {/* Circle */}
      <div className="w-28 h-28 bg-blue-600 rounded-full flex items-center justify-center border-4 border-orange-400 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
        <Icon className="w-10 h-10 text-white transition-transform duration-300 group-hover:rotate-6" />
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl font-semibold text-gray-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-4 text-gray-600 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}