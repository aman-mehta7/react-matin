import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

const ALL_IMAGES = Array.from(new Set([...publicImages]));

export default function PortfolioShowcase() {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);

  useEffect(() => {
    // Only pin on large screens
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
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
    });

    const ctx2 = gsap.context(() => {
      gsap.from(leftContentRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.from(containerRef.current?.querySelectorAll(".project-card"), {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, containerRef);

    return () => {
      mm.revert();
      ctx2.revert();
    };
  }, []);

  return (
    <section>
      <div
        ref={containerRef}
        className="relative flex flex-col lg:flex-row container mx-auto px-4 sm:px-6"
      >
        {/* LEFT SIDE - Pinned Content */}
        <div className="w-full lg:w-1/2 lg:h-screen flex items-center z-10 py-10 lg:py-0">
          <div ref={leftContentRef} className="max-w-xl w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-[1.1]">
              We Are the Best Software Company{" "}
              <span className="text-blue-600">Manage.</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-10">
              Our clients value us for our deep industry expertise, experience and
              robust research capabilities, and for aggressively driving innovation
              with thought leadership and implementation to enable them to become
              high-performance organizations.
            </p>

            {/* Rocket illustration */}
            <div className="relative w-full flex items-center justify-center pointer-events-none select-none mt-8 lg:mt-20">
              <img
                src="./logo/rocketPoint.png"
                alt="3D Model"
                className="h-40 sm:h-56 lg:h-64 object-cover animate-yo-yo pointer-events-none select-none"
                draggable="false"
              />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Scrollable Cards */}
        <div className="w-full lg:w-1/2 px-0 sm:px-4 lg:p-8 space-y-8 sm:space-y-12 lg:space-y-[15vh] pb-[10vh] lg:pb-[20vh]">
          {ALL_IMAGES.map((src, idx) => (
            <ProjectCard
              key={idx}
              image={src}
              title={src.split("/").pop().replace(/\.[^.]+$/, "")}
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
      className="project-card group w-full sm:w-4/5 md:w-3/4 lg:w-[28vw] max-w-md h-[40vw] sm:h-64 lg:h-[35vh] object-contain overflow-hidden shadow-2xl rounded-xl transition-transform duration-500"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
}
