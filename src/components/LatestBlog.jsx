import { useEffect, useState } from "react";
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

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 3500,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const updateIndex = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", updateIndex);

    return () => {
      emblaApi.off("select", updateIndex);
    };
  }, [emblaApi]);

  const scrollTo = (index) => {
    emblaApi?.scrollTo(index);
  };

  return (
    <section className="bg-brand py-24">
      <div className="container mx-auto px-4">
        <div className="mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Latest Blog
          </h2>
        </div>

        <div
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex gap-6">
            {blogCards.map((card, index) => (
              <BlogCard
                key={index}
                card={card}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {blogCards.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                selectedIndex === index
                  ? "w-8 bg-black"
                  : "w-3 bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ card }) {
  return (
    <article
      className="
        shrink-0
        basis-[85%]
        sm:basis-[48%]
        lg:basis-[32%]
        bg-brand-yellow
        rounded-2xl
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        group
      "
    >
      <div className="overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          loading="lazy"
          className="
            w-full
            h-60
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />
      </div>

      <div className="p-6">
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

        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
          {card.title}
        </h3>

        <p className="text-gray-600 mb-6 line-clamp-2">
          {card.description}
        </p>

        <button
          className="
            px-5
            py-2.5
            rounded-full
            bg-black
            text-white
            font-medium
            hover:scale-105
            transition-transform
          "
        >
          Read More
        </button>
      </div>
    </article>
  );
}