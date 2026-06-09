import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Page2 from "./components/page2";
import Paage3 from "./components/Paage3";
import WhyChooseUs from "./components/WhyChooseUe";
import HowWeWork from "./components/HowWeWork";
import PortfolioShowcase from "./components/PortfolioShowcase";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import LatestBlogs from "./components/LatestBlog";
import OurOffice from "./components/OurOffice";
import OurClients from "./components/OurClients";
import Footer from "./components/Footer";

import Scene from "./components/Scene";
import CustomCursor from "./components/CustomCursor";
import ScrollBar from "./components/ScrollBar";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    id: "hero",
    Component: Hero,
  },
  {
    id: "page2",
    Component: Page2,
  },
  {
    id: "page3",
    Component: Paage3,
  },
  {
    id: "choose-us",
    Component: WhyChooseUs,
  },
  {
    id: "how-work",
    Component: HowWeWork,
  },
  {
    id: "portfolio",
    Component: PortfolioShowcase,
  },
  {
    id: "services",
    Component: Services,
  },
  {
    id: "testimonials",
    Component: Testimonials,
  },
  {
    id: "latest-blogs",
    Component: LatestBlogs,
  },
  {
    id: "our-office",
    Component: OurOffice,
  },
  {
    id: "our-clients",
    Component: OurClients,
  },
  {
    id: "footer",
    Component: Footer,
  },
];

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12, // normal smooth, not too delayed
      smoothWheel: true,
      smoothTouch: false,
    });

    let rafId;

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off?.("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollBar />
      <Navbar />

      {/* 3D Scene */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <Scene />
      </div>

      {/* Scroll Content */}
      <main className="relative z-10">
        {sections.map(({ id, Component }) => (
          <section
            key={id}
            id={id}
            className="scroll-section min-h-screen"
          >
            <Component />
          </section>
        ))}
      </main>
    </>
  );
};

export default App;