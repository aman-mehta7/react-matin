import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "School Silo",
    description: "Multi-School Management System",
    image: "./images/tts.jpeg",
    size: "small",
  },
  {
    title: "CourseWays",
    description:
      "Udemy Clone – Online Courses and Learning Management System",
    image: "./images/banner.jpg",
    size: "small",
  },
  {
    title: "Indie News",
    description:
      "Newspaper, Blog Multilingual News Portal with AI Writer & Content Generator",
    image: "./images/news.jpg",
    size: "small",
  },
  {
    title: "SonicVox",
    description:
      "Text to Speech SaaS powered by Machine Learning & Deep Learning",
    image: "./images/Home.jpg",
    size: "small",
  },
  {
    title: "Portfolio Website",
    description:
      "Modern interactive portfolio website with animations and responsive design",
    image: "./images/portfolio website.jpg",
    size: "small",
  },
];

const SmallCard = ({ service }) => {
  return (
    <div
      data-cursor="view"
      className="group service-card relative overflow-hidden rounded-3xl border border-brand bg-brand-yellow backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:border-brand hover:shadow-2xl hover:shadow-brand/20"
    >
      {/* Image */}
      <div className="h-64 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-3 text-xl font-semibold text-black">
          {service.title}
        </h3>

        <p className="text-sm leading-7 text-black">
          {service.description}
        </p>
      </div>

      {/* Gradient Hover Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand/20 blur-3xl" />
      </div>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const smallCards = services.filter(
    (service) => service.size === "small"
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
            {
          opacity: 0,
          x: -40,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        headingRef.current.children,
        {
          opacity: 0,
          x: -40,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 ">
      <div className="container mx-auto px-6 md:px-10">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-brand-yellow">
            Our Projects
          </p>

          <h2 className="mb-5 text-4xl font-bold text-black md:text-5xl">
            Things We've Built
          </h2>

          <p className="text-base leading-8 text-black">
            We create scalable web applications, SaaS products,
            educational platforms, AI-powered tools, and modern
            digital experiences for businesses worldwide.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {smallCards.map((service, index) => (
            <SmallCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;