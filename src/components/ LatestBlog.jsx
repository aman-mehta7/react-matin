

import { useEffect, useRef, useState } from "react";
import { User, Bookmark } from "lucide-react";

export default function LatestBlog() {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const cardWidth = slider.clientWidth / 3;
      const index = Math.round(slider.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    slider.addEventListener("scroll", handleScroll);

    const handleWheel = (e) => {
      e.preventDefault();
      slider.scrollLeft += e.deltaY;
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });

    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("cursor-grabbing");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => (isDown = false));
    slider.addEventListener("mouseup", () => (isDown = false));

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.2;
      slider.scrollLeft = scrollLeft - walk;
    });

    return () => {
      slider.removeEventListener("wheel", handleWheel);
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="bg-brand py-24 select-none overflow-visible">
      <div className=" container mx-auto">
      <h2 className="text-4xl font-bold text-gray-900 mb-16">
        Latest Blog
      </h2>

      <div
        ref={sliderRef}
        className="flex gap-6  overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide cursor-grab overflow-y-visible"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <BlogCard key={i} index={i} />
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-14 space-x-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`h-3 rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "bg-gray-700 w-8"
                : "bg-gray-400 w-3"
            }`}
          ></span>
        ))}
      </div>
      </div>
    </section>
  );
}

function BlogCard({ index }) {
  const images = [
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
  ];

  return (
    <div data-cursor="view" className=" group snap-start bg-brand-yellow shrink-0 w-[calc(33.333%-1rem)] rounded-xl ">

      {/* ✅ Image wrapper keeps overflow-hidden ONLY here */}
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={`${images[index]}?auto=format&fit=crop&w=800&q=80`}
          alt="Blog"
          className="w-full h-56 object-cover transition-transform duration-700 ease-out group-hover:scale-110 select-none pointer-events-none"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <User size={16} />
            <span>Admin</span>
          </div>

          <div className="flex items-center space-x-1">
            <Bookmark size={16} />
            <span>Development</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Blog Title {index + 1}
        </h3>

        <p className="text-gray-600 text-sm mb-6">
          Short description preview of blog content.
        </p>

        <button className="bg-yellow hover:bg-brandyellow text-black font-semibold px-5 py-2 rounded-full transition-all duration-300">
          Read More
        </button>
      </div>
    </div>
  );
}