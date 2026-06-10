

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { User, Bookmark } from "lucide-react";

const blogCards = [
  {
    title: "What is the importance of websites for any businesses?",
    description:
      "Websites are the main component for enhancing any business production.",
    author: "Super-Admin user",
    category: "App Development",
    image: "/blogs/website.png",
  },
  {
    title: "What is actually digital marketing? How does it work?",
    description:
      "How digital marketing helps enhancing any businesses digitally.",
    author: "Super-Admin user",
    category: "Digital Marketing",
    image: "/blogs/dgmarketing.jpg",
  },
  {
    title:
      "What features does Moto Traccar offer for efficient fleet management?",
    description:
      "A vehicle tracking solution that offers live tracking, geo-fencing and many more.",
    author: "Matin Softech",
    category: "App Development",
    image: "/blogs/logo.png",
  },
  {
    title: "Why should businesses switch from physical to online?",
    description:
      "Create compelling digital journeys that keep users engaged and drive action.",
    author: "Super-Admin user",
    category: "Web Development",
    image: "/blogs/online.jpeg",
  },
];

export default function LatestBlog() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const autoplay = Autoplay({
    delay: 3500,
    stopOnInteraction: true,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      dragFree: false,
      skipSnaps: false,
      containScroll: false,
    },
    [autoplay]
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

  return (
    <section className="relative z-30  overflow-visible backdrop-blur-2xl">
      <div className="container mx-auto bg-brand py-15 ">
        <div className="mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Latest Blog
          </h2>
        </div>

        {/* Carousel */}
        <div ref={emblaRef} className="overflow-x-hidden overflow-y-visible py-10">
          <div className="flex">
            {blogCards.map((card, index) => {
              const isActive = selectedIndex === index;

              return (
                <div
                  key={index}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
                >
                  <article
                  data-cursor="view"
                    className={`
                      group
                      relative
                      h-[420px]
                      rounded-3xl
                      bg-brand-yellow
                      shadow-lg
                      transition-all duration-500 ease-out
                      ${
                        isActive
                          ? "scale-105 opacity-100 shadow-2xl"
                          : "scale-90 opacity-50"
                      }
                    `}
                  >
                    {/* Image */}
                    <div className="overflow-hidden rounded-t-3xl">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between h-[calc(100%-224px)]">
                      <div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                          <span className="flex items-center gap-1">
                            <User size={15} />
                            {card.author}
                          </span>

                          <span className="flex items-center gap-1">
                            <Bookmark size={15} />
                            {card.category}
                          </span>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                          {card.title}
                        </h3>

                        <p className="text-gray-600 line-clamp-2">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </article>
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
                    : "bg-gray-400 w-3 hover:bg-gray-500"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
}