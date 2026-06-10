import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";

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

const ALL_IMAGES = [...new Set(publicImages)];

export default function PortfolioShowcase() {
  const containerRef = useRef(null);
  const leftContentRef = useRef(null);

  useEffect(() => {
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

        gsap.from(
          containerRef.current?.querySelectorAll(".project-card"),
          {
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
          }
        );
      }, containerRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="relative z-40 overflow-hidden">
      {/* MOBILE + TABLET */}
      <MobilePortfolio />

      {/* DESKTOP */}
      <div
        ref={containerRef}
        className="hidden lg:flex relative container mx-auto"
      >
        {/* LEFT CONTENT */}
        <div className="w-1/2 h-screen flex items-center">
          <div ref={leftContentRef} className="max-w-xl">
            <h2 className="header-text text-black text-left mb-8">
              We Are the Best Software Company{" "}
              <span className="text-blue-600">Manage.</span>
            </h2>

            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              Our clients value us for our deep industry expertise,
              experience and robust research capabilities, and for
              aggressively driving innovation with thought leadership
              and implementation to enable them to become
              high-performance organizations.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 pl-20 pt-40 pb-[20vh] space-y-[20vh]">
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


function MobilePortfolio() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (

    <div className="lg:hidden container mx-auto px-6 py-20">
      {/* Heading */}
      <div className="mb-12">
        <h2 className="header-text text-black text-left mb-8">
          We Are the Best Software Company{" "}
          <span className="text-blue-600">Manage.</span>
        </h2>

        <p className="mt-6 text-gray-600 leading-relaxed">
          Our clients value us for our deep industry expertise,
          experience and robust research capabilities.
        </p>
      </div>

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {ALL_IMAGES.map((src, idx) => (
            <div
              key={idx}
              className="
                flex-[0_0_100%]
                md:flex-[0_0_50%]
                px-4
              "
            >
              <div
                data-cursor="view"
                className="
                  drop-shadow-2xl
                  h-[450px]
                "
              >
                <img
                  src={src}
                  alt=""
                  className="
                    w-full
                    h-full
                    object-contain
                    transition-transform
                    duration-700
                    hover:scale-105
                  "
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Dots Navigation */}
      <div className="flex justify-center mt-8 gap-3">
        {ALL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-black scale-125"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ title, image }) {
  return (
    <div
      data-cursor="view"
      className="
        project-card
        group
        w-[420px]
        h-[550px]
        overflow-hidden
        rounded-3xl
        shadow-2xl
      "
    >
      <img
        src={image}
        alt={title}
        className="
          w-full
          h-full
          object-cover
          transition-transform
          duration-700
          group-hover:scale-105
        "
      />
    </div>
  );
}