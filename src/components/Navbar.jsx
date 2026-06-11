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
                      bg-black
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
              <Button className="text-sm p-3 px-5 ">
                Start Journey
              </Button>

              <Button className="text-sm p-3 px-5">
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

{/* Mobile Menu */}
<div
  className={`
    xl:hidden fixed inset-0 z-40
    transition-opacity duration-300
    ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
>
  {/* Overlay */}
  <div
    className="absolute inset-0"
    onClick={closeMobile}
  />

  {/* Drawer */}
  <aside
    className={`
      absolute top-20 sm:top-24 right-0
      h-[calc(100dvh-5rem)]
      sm:h-[calc(100dvh-6rem)]
      w-full
      bg-black
      border-l border-white/10
      shadow-2xl
      flex flex-col
      transition-transform duration-300 ease-out
      ${mobileOpen ? "translate-x-0" : "translate-x-full"}
    `}
  >
    {/* Navigation */}
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isOpen = expandedItem === item.title;

          return (
            <div
              key={item.title}
              className="border-b border-white/10"
            >
              {item.dropdown?.length > 0 ? (
                <>
                  {/* Main Button */}
                  <button
                    type="button"
                    onClick={() => toggleExpanded(item.title)}
                    className="
                      w-full flex items-center justify-between
                      py-4
                      text-left
                      text-white
                      font-semibold
                      text-base
                      transition-all duration-200
                      active:scale-[0.98]
                    "
                  >
                    <span>{item.title}</span>

                    <svg
                      className={`
                        w-5 h-5 transition-transform duration-300
                        ${isOpen ? "rotate-180 text-yellow-400" : ""}
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

                  {/* Animated Dropdown */}
                  <div
                    className={`
                      grid transition-all duration-300 ease-in-out
                      ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                    `}
                  >
                    <div className="overflow-hidden">
                      <div className="pl-4 pb-3 space-y-2 pt-2">
                        {item.dropdown.map((sub, index) => (
                          <a
                            key={sub}
                            href="#"
                            onClick={closeMobile}
                            className="
                              block py-2.5 px-4
                              text-sm
                              rounded-md
                              border border-white/10
                              bg-black
                              text-white
                              transition-all duration-300
                              hover:border-yellow-400
                              hover:text-yellow-400
                              active:scale-[0.97]
                            "
                            style={{
                              transitionDelay: isOpen ? `${index * 40}ms` : "0ms",
                              transform: isOpen ? "translateY(0)" : "translateY(-6px)",
                            }}
                          >
                            {sub}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href="#"
                  onClick={closeMobile}
                  className="
                    block py-4
                    text-white
                    font-semibold
                    text-base
                    hover:text-yellow-400
                    transition-colors duration-300
                  "
                >
                  {item.title}
                </a>
              )}
            </div>
          );
        })}
      </nav>
    <div className="p-6 border-t border-white/10 space-y-3">
      <Button className="w-full p-2 py-3 justify-center border border-white text-white hover:bg-white hover:text-black transition-all duration-300">
        Start Journey
      </Button>

      <Button className="w-full p-2 py-3 justify-center border border-white text-white hover:bg-white hover:text-black transition-all duration-300">
        Client Login
      </Button>
    </div>
    </div>

    {/* Footer Buttons */}
  </aside>
</div>
    </nav>
  );
};

export default Navbar;
