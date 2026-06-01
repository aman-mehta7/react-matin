"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowLeft } from "lucide-react";

export default function PortfolioShowcase() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".portfolio-desc", {
        y: 30,
        opacity: 0,
        delay: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".portfolio-card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        delay: 0.4,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f4f6f8] py-24 px-8 md:px-20 overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20">
        <div className="max-w-2xl">
          <h2 className="portfolio-title text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            We Are the Best Software Company Manage.
          </h2>
          <p className="portfolio-desc text-gray-600 text-lg leading-relaxed">
            Our clients value us for our deep industry expertise, experience
            and robust research capabilities, and for aggressively driving
            innovation with thought leadership and implementation.
          </p>
        </div>

        <button className="mt-6 md:mt-0 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
          View All
        </button>
      </div>

      {/* Content Grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

        {/* LEFT SIDE - Placeholder for 3D Model */}
        <div className="hidden lg:block">
          <div className="relative h-[500px] bg-transparent flex items-center justify-center">
            {/* Replace this with your <Scene /> */}
            <div className="w-72 h-72 bg-blue-200 rounded-full blur-3xl absolute"></div>
            <div className="text-gray-400">3D Model Area</div>
          </div>
        </div>

        {/* CENTER CARD */}
        <ProjectCard
          title="MAHAAGROMART"
          bg="bg-yellow-200"
        />

        {/* RIGHT CARD */}
        <ProjectCard
          title="BUYRRO"
          bg="bg-blue-500"
          dark
        />

        {/* Slider Arrows */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition">
          <ArrowLeft />
        </button>

        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition">
          <ArrowRight />
        </button>
      </div>
    </section>
  );
}

function ProjectCard({ title, bg, dark }) {
  return (
    <div
      className={`portfolio-card relative h-[520px] rounded-xl overflow-hidden shadow-xl transform transition-all duration-500 hover:-translate-y-6 hover:shadow-2xl group ${bg}`}
    >
      <h3
        className={`absolute top-8 left-8 text-3xl font-bold ${
          dark ? "text-white" : "text-black"
        }`}
      >
        {title}
      </h3>

      {/* Mockup Image Placeholder */}
      <div className="absolute bottom-0 w-full h-[80%] bg-white rounded-t-xl shadow-inner group-hover:scale-105 transition-transform duration-500"></div>
    </div>
  );
}