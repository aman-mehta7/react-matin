
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OurClients() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  const clients = [
    "PSI",
    "BHE Service",
    "Business Mall",
    "Mahagro Mart",
    "Kabra Group",
    "Moto Traccar",
    "Nirman",
    "Ascendifly",
    "Wikilabs",
    "Enepalshop",
    "Health24",
    "Kart Comfort",
    "Sajilo Scale",
    "Comett",
    "Buyrro",
    "Wheels On Ride",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
  
      gsap.fromTo(
        headingRef.current.children,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
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
    <section ref={sectionRef} className="bg-brand-yellow py-28 px-6 md:px-20">
        <div className=" relative z-30 container mx-auto">
      
      {/* Section Header */}
      <div ref={headingRef} className="mb-16">
        <p className="text-blue-500 font-medium tracking-wide mb-3">
          Our Happy Customer
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Some of our Clients?
        </h2>

        <p className="text-gray-600 max-w-2xl">
          We think big and have hands in all leading technology platforms to provide
          you wide array of services.
        </p>
      </div>

      {/* Logo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {clients.map((client, index) => (
          <LogoCard key={index} name={client} />
        ))}
      </div>
      </div>
    </section>
  );
}

function LogoCard({ name }) {
  return (
    <div
      data-cursor="view"
      className="
        client-card
        bg-[#e8e6e4]
        rounded-2xl
        h-28
        flex items-center justify-center
        shadow-sm
        transition-all duration-300
        hover:-translate-y-2
        hover:shadow-md
        cursor-pointer
      "
    >
      {/* Replace text with real logo images if needed */}
      <span className="text-gray-700 font-semibold text-sm text-center px-4">
        {name}
      </span>
    </div>
  );
}