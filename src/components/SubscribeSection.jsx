import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

export default function SubscribeSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        {
          opacity: 0,
          x: -40,
          y: 20,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".subscribe-image",
        {
          opacity: 0,
          scale: 0.8,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
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
    <div
     ref={sectionRef} className="bg-brand-yellow pb-16 sm:pb-24 px-4 sm:px-8 md:px-16">
      <div className=" relative z-30 grid md:grid-cols-2 items-center gap-12 container mx-auto">

        {/* Left Content */}
        <div ref={contentRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-700 mb-6">
            Subscribe Now
          </h2>

          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter to receive the latest news and blog updates.
          </p>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#dce3ea] rounded-2xl sm:rounded-full overflow-hidden max-w-md gap-2 sm:gap-0 p-2 sm:p-0">

            <input
              type="email"
              placeholder="Email Address..."
              className="flex-1 w-full px-4 sm:px-6 py-3 sm:py-4 bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />

            <Button data-cursor="link"
              className="
                w-full sm:w-auto
                px-6 sm:px-8
                py-3 sm:py-4
                rounded-xl sm:rounded-full
                font-medium
                transition-all
                duration-300
                text-nowrap
                justify-center
              "
            >
              Subscribe Now
            </Button>

          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="images/img_subscribe.png" 
            alt="Subscribe Illustration"
            className="subscribe-image max-w-md w-full"
          />
        </div>

      </div>
    </div>
  );
}