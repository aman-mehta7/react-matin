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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setExpandedItem(null);
  };

  const toggleExpanded = (title) => {
    setExpandedItem((prev) => (prev === title ? null : title));
  };

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
        <div className="container mx-auto  text-nowrap">
          <div className="h-20 sm:h-24 flex items-center justify-between">
            <a
              href="/"
              className="flex items-center shrink-0"
            >
              <img
                src="./logo/MS logo.png"
                alt="Matin Softech"
                className="h-12 sm:h-16 w-auto object-contain"
              />
            </a>

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

            <div className="hidden lg:flex items-center gap-4">
              <Button className="text-sm p-3 px-5 border">
                Start Journey
              </Button>

              <Button className="text-sm p-3 px-5 border">
                Client Login
              </Button>
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((prev) => !prev)}
              className="
                lg:hidden
                text-black
                p-2
                min-w-[44px]
                min-h-[44px]
                flex items-center justify-center
              "
            >
              {mobileOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`
          lg:hidden fixed inset-0 top-20 sm:top-24 z-40
          transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <button
          type="button"
          aria-label="Close menu overlay"
          className="absolute inset-0 bg-black/50"
          onClick={closeMobile}
        />

        <div
          className={`
            absolute top-0 right-0 h-full w-full max-w-sm
            bg-brand backdrop-blur-xl
            border-l border-white/10
            shadow-2xl
            flex flex-col
            transition-transform duration-300 ease-out
            ${mobileOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <div key={item.title} className="border-b border-white/10">
                  {item.dropdown.length > 0 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleExpanded(item.title)}
                        className="
                          w-full flex items-center justify-between
                          py-4 text-left text-white font-semibold text-base
                          min-h-[44px]
                        "
                      >
                        {item.title}
                        <svg
                          className={`
                            w-5 h-5 transition-transform duration-200
                            ${expandedItem === item.title ? "rotate-180" : ""}
                          `}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {expandedItem === item.title && (
                        <div className="pb-3 pl-4 space-y-1">
                          {item.dropdown.map((sub) => (
                            <a
                              key={sub}
                              href="#"
                              onClick={closeMobile}
                              className="
                                block py-2.5 text-sm text-white/70
                                hover:text-brand-yellow transition-colors
                                min-h-[44px] flex items-center
                              "
                            >
                              {sub}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href="#"
                      onClick={closeMobile}
                      className="
                        block py-4 text-white font-semibold text-base
                        hover:text-brand-yellow transition-colors
                        min-h-[44px]
                      "
                    >
                      {item.title}
                    </a>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="p-6 border-t border-white/10 space-y-3">
            <Button className="w-full text-sm p-3 px-5 border justify-center">
              Start Journey
            </Button>
            <Button className="w-full text-sm p-3 px-5 border justify-center">
              Client Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
