import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Gather images from `public/images` (served at `/images`) and from `src/assets`
// Vite supports `import.meta.glob` for static imports under `src`.
const publicImages = [
  "/images/BUYRRO.jpg",
  "/images/ENEPALSHOP.jpg",
  "/images/ENVIRO.jpg",
  "/images/HEALTH24.jpg",
  "/images/Kartcomfort.jpg",
  "/images/Mahaagromart.jpg",
  "/images/Merogadi.png",
  "/images/Pioneer Electrocables.jpg",
];

// const assetModules = import.meta.glob("../assets/*.{png,jpg,jpeg,svg}", {
//   eager: true,
//   as: "url",
// });

// const assetImages = Object.values(assetModules || {});

const ALL_IMAGES = Array.from(new Set([...publicImages]));

export default function PortfolioShowcase() {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftContentRef.current,
        pinSpacing: false,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section>
    <div
      ref={containerRef}
      className="relative flex flex-col lg:flex-row container mx-auto"
    >
      {/* LEFT SIDE - Pinned Content */}
      <div className="w-full lg:w-1/2 lg:h-screen flex items-center  z-10">
        <div ref={leftContentRef} className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-[1.1]">
            We Are the Best Software Company{" "}
            <span className="text-blue-600">Manage.</span>
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Our clients value us for our deep industry expertise, experience and
            robust research capabilities, and for aggressively driving
            innovation with thought leadership and implementation to enable them
            to become high-performance organizations.
          </p>

          {/* 3D Model Placeholder */}
          <div className="relative w-full flex items-center justify-center pointer-events-none select-none mt-20">
            <img
              src="./logo/rocketPoint.png"
              alt="3D Model"
              className="h-64 object-cover animate-yo-yo pointer-events-none select-none"
              draggable="false"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Scrollable Cards */}
      <div className="mt-50 ml-40 w-full lg:w-1/2 p-8 md:p-10 space-y-20 lg:space-y-[20vh] pb-[20vh] ">
        {ALL_IMAGES.map((src, idx) => (
          <ProjectCard
            key={idx}
            image={src}
            title={src
              .split("/")
              .pop()
              .replace(/\.[^.]+$/, "")}
          />
        ))}
      </div>
    </div>
    </section>
  );
}

function ProjectCard({ title, image }) {
  return (
    <div
      data-cursor="view"
      className="group w-[20vw] h-[50vh] object-ontain overflow-hidden shadow-2xl transition-transform duration-500"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
