"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: "MAHAAGROMART",
    bg: "bg-yellow-200",
    desc: "Agri-tech solutions for modern farmers.",
  },
  {
    id: 2,
    title: "BUYRRO",
    bg: "bg-blue-500",
    dark: true,
    desc: "Next-gen e-commerce logistics platform.",
  },
  {
    id: 3,
    title: "FINTECH PRO",
    bg: "bg-emerald-400",
    desc: "Digital banking for the future generation.",
  },
  {
    id: 4,
    title: "SOLARIS",
    bg: "bg-orange-500",
    dark: true,
    desc: "Renewable energy monitoring dashboard.",
  },
];

export default function PortfolioShowcase() {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the left side while the right side scrolls
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftContentRef.current,
        pinSpacing: false,
      });

      // Optional: Animate cards as they enter the viewport
      // gsap.utils.toArray(".portfolio-card").forEach((card) => {
      //   // gsap.from(card, {
      //   //   scrollTrigger: {
      //   //     trigger: card,
      //   //     start: "top bottom",
      //   //     end: "top center",
      //   //     scrub: 1,
      //   //   },
      //   //   scale: 0.8,
      //   //   opacity: 0,
      //   //   y: 100,
      //   // });
      // });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#f4f6f8] flex flex-col lg:flex-row"
    >
      {/* LEFT SIDE - Pinned Content */}
      <div className="w-full lg:w-1/2 lg:h-screen flex items-center px-8 md:px-20 py-24 z-10">
        <div ref={leftContentRef} className="max-w-xl">
          <h2 className="0 text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-[1.1]">
            We Are the Best Software Company{" "}
            <span className="text-blue-600"> Manage.</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Our clients value us for our deep industry expertise, experience and
            robust research capabilities, and for aggressively driving
            innovation with thought leadership and implementation to enable them
            to become high-perdormance organizations.
          </p>

          {/* 3D Model Placeholder */}
          <div className="relative w-full h-64 bg-white/50 rounded-2xl border border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
            <div className="absolute w-32 h-32 bg-blue-400/20 blur-3xl animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
              3D Interaction Area
            </span>
          </div>

          <button
            data-cursor="link"
            className="mt-12 flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white transition-transform group-hover:scale-110">
              <ArrowRight size={20} />
            </div>
            <span className="font-bold uppercase tracking-widest text-sm">
              View All Projects
            </span>
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - Scrollable Cards */}
      <div className=" mt-50 ml-30  w-full lg:w-1/2 p-8 md:p-10 space-y-20 lg:space-y-[20vh] pb-[20vh]">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ title, bg, dark, desc }) {
  return (
    <div
      data-cursor="view"
      className={`portfolio-card group relative w-[25vw] h-[50vh]  rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${bg}`}
    >
      {/* Content */}
      <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
        <div>
          <h3
            className={`text-md md:text-2xl lg:text-2xl xl:text-3xl flex shrink-0 font-black tracking-tighter ${dark ? "text-white" : "text-black"}`}
          >
            {title}
          </h3>
          <p
            className={`mt-4  text-sm font-medium ${dark ? "text-white/70" : "text-black/60"}`}
          >
            {desc}
          </p>
        </div>

        <div
          className={`text-xs font-bold uppercase tracking-[0.2em] ${dark ? "text-white" : "text-black"}`}
        >
          Exploration — 2024
        </div>
      </div>

      {/* Modern Card Graphics (The "Glass" inner mockup) */}
      <div className="absolute bottom-[-10%] left-[10%] right-[10%] top-[40%] bg-white/90 backdrop-blur-md rounded-t-3xl shadow-2xl transition-transform duration-500 group-hover:-translate-y-12">
        {/* FAKE UI ELEMENTS */}
        <div className="p-6 space-y-4">
          <div className="h-2 w-24 bg-gray-200 rounded-full" />
          <div className="h-40 w-full bg-gray-50 rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-gray-50 rounded-xl" />
            <div className="h-20 bg-gray-50 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
    </div>
  );
}
