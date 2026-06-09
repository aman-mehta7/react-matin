import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Development",
    description:
      "We build many types of applications and provides many services like Android App, IOS App, App Templates, Web view App, Web to App",
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png",
    size: "small",
  },
  {
    title: "App Development",
    description:
      "We build many types of applications and provides many services like Android App, IOS App, App Templates, Web view App, Web to App",
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920349.png",
    size: "small",
  },
  {
    title: "E-commerce Development",
    description:
      "Design and develop a creative website with our microscopic detailing and scrupulous strategies.",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    size: "small",
  },
  {
    title: "E-commerce Development",
    description:
      "Design and develop a creative website with our microscopic detailing and scrupulous strategies.",
    image: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
    size: "small",
  },
  {
    title: "Graphics Design",
    description:
      "Branding, Website & Logo Design, Exhibition & Environment Design, Report Design, Brochure Design etc",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    bullets: [
      "Creates unique visual identity for brand distinction.",
      "Ensures consistent application across platforms.",
    ],
    size: "large",
  },
  {
    title: "Integrated Services",
    description:
      "We specialize in web and mobile design, e-commerce, and intranets using the latest tech.",
    image: "https://cdn-icons-png.flaticon.com/512/2920/2920257.png",
    bullets: [
      "Implements tech for intuitive UX across devices, platforms.",
      "Tailors e-commerce, intranets for seamless transactions",
    ],
    size: "large",
  },
];

const SmallCard = ({ service }) => (
  <div
    data-cursor="view"
    className="service-card flex flex-col h-96 bg-brand rounded-2xl p-6 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand/30"
  >
    <div className="flex items-center justify-center h-44 mb-4 overflow-hidden">
      <img
        src={service.image}
        alt={service.title}
        className="h-full object-contain transition-transform duration-700 hover:scale-110"
      />
    </div>

    <h3 className="text-xl font-semibold text-gray-700 mb-3">
      {service.title}
    </h3>

    <p className="text-gray-600 text-sm leading-6 flex-1">
      {service.description}
    </p>
  </div>
);

const LargeCard = ({ service }) => (
  <div
    data-cursor="view"
    className="service-card flex flex-col md:flex-row items-center gap-6 bg-brandarc border border-brand rounded-2xl p-8 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 h-full min-h-[340px]"
  >
    <div className="shrink-0 w-full md:w-[220px] h-[180px] md:h-full flex items-center justify-center">
      <img
        src={service.image}
        alt={service.title}
        className="max-h-40 md:max-h-52 object-contain transition-transform duration-700 hover:scale-105"
      />
    </div>

    <div className="flex-1 w-full flex flex-col justify-center">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">
        {service.title}
      </h3>

      <p className="text-gray-600 text-sm leading-6 mb-4">
        {service.description}
      </p>

      <ul className="space-y-3">
        {service.bullets?.map((b, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-600 text-sm">
            <span className="mt-1 shrink-0 w-5 h-5 rounded-full border-2 border-brand flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 text-brand"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const Page3 = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const smallCardsRef = useRef([]);
  const largeCardsRef = useRef([]);

  smallCardsRef.current = [];
  largeCardsRef.current = [];

  const smallCards = services.filter((s) => s.size === "small");
  const largeCards = services.filter((s) => s.size === "large");

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.querySelectorAll("p, h2"),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        smallCardsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        largeCardsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-brandarc py-20 text-black flex  items-end justify-end"
    >
      <div className="w-full px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div ref={headingRef} className="max-w-3xl mb-14 text-left">
          <p className="font-medium mb-3 uppercase tracking-wider text-sm text-black">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why provide best services
          </h2>
          <p className="text-base max-w-xl">
            We think big and have hands in all leading technology platforms to
            provide you wide array of services.
          </p>
        </div>

        {/* Small cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          {smallCards.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => {
                if (el) smallCardsRef.current[i] = el;
              }}
            >
              <SmallCard service={s} />
            </div>
          ))}
        </div>

        {/* Large cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
          {largeCards.map((s, i) => (
            <div
              key={s.title}
              className="h-full"
              ref={(el) => {
                if (el) largeCardsRef.current[i] = el;
              }}
            >
              <LargeCard service={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page3;