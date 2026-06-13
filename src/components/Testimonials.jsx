"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Mateo Levi Brown",
    avatar: "/testimonials/mateo.jpg",
    rating: 5,
    quote:
      "The best thing about Matin Softech is that they treat your project like their own.",
  },
  {
    name: "Karamchandra Rajbanshi",
    avatar: "/testimonials/karamchandra.jpg",
    rating: 5,
    quote:
      "Working with them has been an excellent experience from start to finish.",
  },
  {
    name: "Ashmin Niraula",
    avatar: "/testimonials/ashmin.jpg",
    rating: 5,
    quote: "Excellent software company. Delivery exceeded expectations.",
  },
  {
    name: "Priya Sharma",
    avatar: "/testimonials/priya.jpg",
    rating: 5,
    quote:
      "Their attention to detail and commitment to deadlines is unmatched.",
  },
  {
    name: "Ramesh Kumar",
    avatar: "/testimonials/ramesh.jpg",
    rating: 5,
    quote:
      "Truly professional team. They delivered exactly what we needed on time.",
  },
  {
    name: "Sita Devi",
    avatar: "/testimonials/sita.jpg",
    rating: 5,
    quote:
      "Amazing experience working with them. Highly recommended for any project.",
  },
];

export default function Testimonials() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const videoContainerRef = useRef(null);

  const autoplay = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      dragFree: false,
      skipSnaps: false,
      containScroll: false,
    },
    [autoplay.current]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    return () => emblaApi.off("select", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.children,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        videoContainerRef.current,
        {
          opacity: 0,
          x: -40,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".testimonial-carousel",
        {
          opacity: 0,
          x: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
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
    <section ref={sectionRef} className="relative z-30 py-28  text-black overflow-visible backdrop-blur-xl">
      <div className="  container mx-auto px-4 sm:px-6">
        
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-4xl mx-auto mb-16">
          <span className=" bg-brand/20 p-2 rounded-lg font-semibold uppercase tracking-widest body-sm">
            # Testimonial
          </span>

          <h2 className="heading-md text-black  my-8">
            What Our Customers Are Saying?
          </h2>

          <p className="body-sm">
            Many customers have chosen us and they know their happiness by
            saving time and creating their sites.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-12 items-center">
          
          {/* Video */}
          <div ref={videoContainerRef} className="relative rounded-3xl overflow-hidden shadow-xl bg-gray-100">
            <video
              ref={videoRef}
              src="/testimonials/customer-video.mp4"
              poster="/testimonials/video-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[280px] sm:h-[380px] lg:h-[500px] object-cover"
            />
          </div>

          {/* Carousel */}
          <div className="testimonial-carousel">

            {/* Rating Bar */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-8 ">
              <div className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" size={20} />
                <span className="font-semibold">
                  5.0 Google Rating | Trusted by Happy Customers
                </span>
              </div>

              <a
                href="https://www.google.com/search?q=matin+softech+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 rounded-xl border border-black/10 shadow-sm hover:shadow-md transition bg-white"
              >
                <span className="text-blue-500 text-xl font-bold">G</span>
                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">Google Rating 5.0</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Embla */}
            <div ref={emblaRef} className="overflow-x-hidden overflow-y-visible w-full py-8">
              <div className="flex">
                {testimonials.map((item, index) => {
                  const isActive = selectedIndex === index;

                  return (
                    <div
                      key={index}
                      className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-3"
                    >
                      <div
                        className={`
                          rounded-3xl p-6 sm:p-8 border
                          h-auto min-h-[280px]
                          flex flex-col items-center justify-center
                          text-center
                          transition-all duration-500 ease-out
                          ${
                            isActive
                              ? "bg-brand border-black/10 shadow-xl scale-105 opacity-100"
                              : "bg-brand/50 border-black/5 shadow-md scale-90 opacity-50"
                          }
                        `}
                      >
                        {/* Avatar */}
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className={`
                            w-20 h-20 rounded-full object-cover
                            border-4 border-white shadow-lg mb-4
                            transition-all duration-500
                            ${isActive ? "scale-100" : "scale-75"}
                          `}
                        />

                        {/* Name */}
                        <h3 className="heading-sm font-bold mb-2">
                          {item.name}
                        </h3>

                        {/* Quote */}
                        <p className="text-black/70 body-sm leading-relaxed mb-4 line-clamp-3">
                          "{item.quote}"
                        </p>

                        {/* Stars */}
                        <div className="flex gap-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`
                    h-3 rounded-full transition-all duration-300
                    ${
                      selectedIndex === index
                        ? "bg-black w-10"
                        : "bg-gray-300 w-3 hover:bg-gray-400"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}