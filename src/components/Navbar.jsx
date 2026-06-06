import { useEffect, useRef, useState } from "react";
import Button from "./Button";

const navItems = [
  {
    title: "Services",
    dropdown: [
      "App Development",
      "Web Development",
      "E-Commerce Solutions",
      "Graphics Design",
      "Digital Marketing",
    ],
  },
  {
    title: "Products",
    dropdown: [
      "School Silo",
      "CourseWays",
      "Indie News",
      "SonicVox",
    ],
  },
  {
    title: "The Company",
    dropdown: [
      "About Us",
      "Mission & Vision",
      "Our Development Process",
      "Careers",
      "Our Team",
    ],
  },
  {
    title: "Portfolio",
    dropdown: [],
  },
  {
    title: "Training",
    dropdown: [
      "Training Programs",
      "Courses",
    ],
  },
  {
    title: "Contact us",
    dropdown: [],
  },
  {
    title: "Blogs",
    dropdown: [],
  },
];

const Navbar = () => {
  const [visible, setVisible] = useState(true);

  const lastY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  const ticking = useRef(false);

  useEffect(() => {
    const SENSITIVITY = 15;
    const MIN_WIDTH = 768;

    const onScroll = () => {
      const currentY = window.scrollY;
      const width = window.innerWidth;

      if (width < MIN_WIDTH) {
        setVisible(true);
        lastY.current = currentY;
        return;
      }

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastY.current;

          if (delta > SENSITIVITY && currentY > 100) {
            setVisible(false);
          } else if (delta < -5) {
            setVisible(true);
          }

          lastY.current = currentY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-transform duration-300 ease-out
        ${visible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div
        className="
          bg-brandark/95
          backdrop-blur-xl
          border-b border-white/10
          shadow-lg
        "
      >
        <div className="container mx-auto">
          <div className="h-24 flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center shrink-0"
            >
              <img
                src="./logo/MS logo.png"
                alt="Matin Softech"
                className="h-16 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-5">
              {navItems.map((item) => (
                <div
                  key={item.title}
                  className="relative group"
                >
                  <button
                    data-cursor="link"
                    className="
                      flex items-center gap-1
                      text-black
                      font-semibold
                      text-[15px]
                    "
                  >
                    {item.title}

                    {item.dropdown.length > 0 && (
                      <svg
                        className="
                          w-4 h-4
                          transition-transform
                          duration-300
                          group-hover:rotate-180
                        "
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Underline */}
                  <span
                    className="
                      absolute
                      left-0
                      -bottom-2
                      h-[2px]
                      w-0
                      bg-brand-yellow
                      transition-all
                      duration-300
                      group-hover:w-full
                    "
                  />

                  {/* Dropdown */}
                  {item.dropdown.length > 0 && (
                    <div
                      className="
                        invisible
                        absolute
                        left-1/2
                        top-full
                        mt-6
                        w-64
                        -translate-x-1/2

                        rounded-2xl
                        border border-yellow

                        bg-[#17263b]/95
                        backdrop-blur-xl

                        opacity-0
                        shadow-[0_20px_60px_rgba(0,0,0,0.35)]

                        transition-all
                        duration-300

                        group-hover:visible
                        group-hover:opacity-100
                      "
                    >
                      <div className="p-3">
                        {item.dropdown.map((sub) => (
                          <a
                            key={sub}
                            href="#"
                            className="
                              flex
                              items-center
                              rounded-xl
                              px-4
                              py-3

                              text-sm
                              text-white/70

                              transition-all
                              duration-300

                              hover:bg-white/5
                              hover:text-brand-yellow
                            "
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Button  className="text-sm p-3 px-5 border">
                Start Journey
              </Button>

              <Button className="text-sm p-3 px-5 border">
                Client Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="
                lg:hidden
                text-white
                p-2
              "
            >
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;