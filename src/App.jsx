import { useEffect } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Paage3 from "./components/Paage3";
import Page2 from "./components/page2";
import WhyChooseUs from "./components/WhyChooseUe";
import HowWeWork from "./components/HowWeWork";
import PortfolioShowcase from "./components/PortfolioShowcase";
import Footer from "./components/Footer";
import Scene from "./components/Scene";
import CustomCursor from "./components/CustomCursor";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value)
          : window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: document.body });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
    <CustomCursor />
      {/* 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene />
      </div>

      {/* Scroll Content */}
    <main className="relative z-10">
  <section id="hero" data-side="right"><Hero /></section>
  <section id="page2" data-side="left"><Page2 /></section>
  <section id="page3" data-side="right"><Paage3 /></section>
  <section id="choose-us" data-side="left"><WhyChooseUs /></section>
  <section id="how-work" data-side="right"><HowWeWork /></section>
  <section id="portfolio" data-side="center"><PortfolioShowcase /></section>
  <section id="footer" data-side="center"><Footer /></section>
</main>
    </>
  );
};

export default App;