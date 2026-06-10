import { useEffect, useRef } from "react";
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
import Testimonials from "./components/Testimonials";
import LatestBlogs from "./components/LatestBlog";
import OurOffice from "./components/OurOffice";
import Scene from "./components/Scene";
import OurClients from './components/OurClients';
import SubscribeSection from './components/SubscribeSection';
import CustomCursor from "./components/CustomCursor";
import ScrollBar from "./components/ScrollBar";
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { id: "hero", Component: Hero },
  { id: "page2", Component: Page2 },
  { id: "page3", Component: Paage3 },
  { id: "choose-us", Component: WhyChooseUs },
  { id: "how-work", Component: HowWeWork },
  { id: "portfolio", Component: PortfolioShowcase },
  { id: "testimonials", Component: Testimonials },
  { id: "LatestBlog", Component: LatestBlogs },
  { id: "OurOffice", Component: OurOffice },
  { id: "OurClients", Component: OurClients },
  // { id: "SubscribeSection", Component: SubscribeSection },
  // { id: "Footer", Component: Footer },
];

const App = () => {
  const mouse = useRef({ x: 0, y: 0 }); // ✅ Global mouse ref

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
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

  useEffect(() => {
  const handleMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);

  return (
    <>
      <CustomCursor />
      <ScrollBar />
      <Navbar />

      {/* ✅ 3D Scene (unchanged except mouse prop added) */}
      <div className="fixed inset-0 z-30">
        <Scene mouse={mouse} />
      </div>

      {/* ✅ Mouse tracking moved to MAIN (global & reliable) */}
      <main
      >
        {sections.map(({ id, Component }) => (
          <section
            key={id}
            id={id}
            className="scroll-section min-h-screen"
          >
            <Component />
          </section>
        ))}
        <SubscribeSection />
        <Footer />
      </main>

    </>
  );
};

export default App;