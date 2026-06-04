import { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

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
];

export default function Testimonials() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const videoRef = useRef(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
      }),
    ],
  );

  useEffect(() => {
    if (!emblaApi) return;

   const onSelect = () => {
  requestAnimationFrame(() => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  });
};
    emblaApi.on("select", onSelect);
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  // Autoplay muted on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Browser blocked autoplay, that's fine
      });
    }
  }, []);

  return (
    <section className="py-24 bg-brand-yellow text-black overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-orange-500 font-semibold uppercase tracking-widest">
            Testimonial
          </span>

          <h2 className="text-4xl lg:text-6xl font-black mt-4 mb-6 text-black">
            What Our Customers Are Saying?
          </h2>

          <p className="text-lg text-gray-500">
            Many customers have chosen us and they know their happiness by
            saving time and creating their sites
          </p>
        </div>

        {/* Grid: Video + Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-12 items-center">
          {/* ─── Video Left ───────────────────────────── */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gray-100">
            <video
              ref={videoRef}
              src="/testimonials/customer-video.mp4"
              poster="/testimonials/video-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* ─── Right Column ─────────────────────────── */}
          <div>
            {/* Rating Bar */}
            {/* Rating + Google Badge */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
              {/* Left: Rating Text */}
              <div className="flex items-center gap-2">
                <Star className="fill-yellow-400 text-yellow-400" size={20} />
                <span className="font-semibold text-black">
                  5.0 Google Rating | Trusted by Happy Customers
                </span>
              </div>

              {/* Right: Google Review Tag */}
              <a
                href="https://www.google.com/search?q=matin+softech+reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="
      flex items-center gap-3
      px-4 py-2
      rounded-xl
      border border-black/10
      shadow-sm
      hover:shadow-md
      transition
      bg-white
    "
              >
                {/* Google Logo Letter */}
                <span className="text-blue-500 text-xl font-bold">G</span>

                <div className="flex flex-col leading-tight">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-black">
                      Google Rating
                    </span>

                    <span className="text-sm font-semibold text-black">
                      5.0
                    </span>

                    {/* Mini Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <span className="text-xs text-gray-500">
                    See all our reviews
                  </span>
                </div>
              </a>
            </div>

            {/* Embla Carousel */}
            <div ref={emblaRef} className="overflow-y-auto w-full min-w-0">
              <div className="flex">
                {testimonials.map((item, index) => (
                  <div
                    key={index}
                    className="
                      flex-[0_0_85%]
                      md:flex-[0_0_48%]
                      lg:flex-[0_0_32%]
                      shrink-0
                        mr-4
                    "
                  >
                    <div
                      className="
                        bg-brand
                        rounded-3xl
                        p-8
                        border border-black/10
                        shadow-lg
                        h-full
                        hover:shadow-2xl
                        transition-all
                        duration-300
                      "
                    >
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="
                            w-24 h-24
                            rounded-full
                            object-cover
                            border-4 border-white
                            shadow-lg
                            mb-5
                          "
                        />

                        <h3 className="text-xl font-bold text-black mb-3">
                          {item.name}
                        </h3>

                        <p className="text-black/80 leading-relaxed mb-6">
                          "{item.quote}"
                        </p>

                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    selectedIndex === index
                      ? "bg-orange-500 w-10"
                      : "bg-gray-300 w-3"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
