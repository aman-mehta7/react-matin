

import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const ticking = useRef(false);

  useEffect(() => {
    const SENSITIVITY = 15; // pixels before we consider it a meaningful scroll
    const MIN_WIDTH = 768; // only hide on screens >= this width

    const onScroll = () => {
      const currentY = window.scrollY;
      const width = window.innerWidth;

      // Always show on small screens
      if (width < MIN_WIDTH) {
        if (!visible) setVisible(true);
        lastY.current = currentY;
        return;
      }

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const delta = currentY - lastY.current;

          if (delta > SENSITIVITY && currentY > 100) {
            // scrolling down quickly
            setVisible(false);
          } else if (delta < -5) {
            // scrolling up
            setVisible(true);
          }

          lastY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className={
        `fixed top-0 left-0 w-full z-30 transform transition-transform duration-300 ease-in-out ` +
        (visible ? "translate-y-0" : "-translate-y-full")
      }
      aria-hidden={!visible}
    >
      <div className=" py-4 bg-brandark/95 backdrop-blur-sm shadow-md">
      <div className="w-full  flex items-center justify-between container mx-auto">
        <div className="text-lg font-bold">
          <img data-cursor="link" src="./logo/matin-logo.png" alt="Matin" className="h-20" />
        </div>
        <div className="space-x-4">
          <a href="#" data-cursor="link" className="hover:text-gray-400">Home</a>
          <a href="#" data-cursor="link" className="hover:text-gray-400">About</a>
          <a href="#" data-cursor="link" className="hover:text-gray-400">Contact</a>
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;