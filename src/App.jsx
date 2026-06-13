// import { useEffect, useRef, useState } from "react";
// import Lenis from "@studio-freight/lenis";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Page2 from "./components/page2";
// import Paage3 from "./components/Paage3";
// import WhyChooseUs from "./components/WhyChooseUe";
// import HowWeWork from "./components/HowWeWork";
// import PortfolioShowcase from "./components/PortfolioShowcase";
// import Testimonials from "./components/Testimonials";
// import LatestBlogs from "./components/LatestBlog";
// import OurOffice from "./components/OurOffice";
// import Scene from "./components/Scene";
// import OurClients from './components/OurClients';
// import SubscribeSection from './components/SubscribeSection';
// import CustomCursor from "./components/CustomCursor";
// import ScrollBar from "./components/ScrollBar";
// import Footer from './components/Footer';
// import SoftechLoader from "./components/Loader"; // Import Loader

// gsap.registerPlugin(ScrollTrigger);

// const sections = [
//   { id: "hero", Component: Hero },
//   { id: "page2", Component: Page2 },
//   { id: "page3", Component: Paage3 },
//   { id: "choose-us", Component: WhyChooseUs },
//   { id: "how-work", Component: HowWeWork },
//   { id: "portfolio", Component: PortfolioShowcase },
//   { id: "testimonials", Component: Testimonials },
//   { id: "LatestBlog", Component: LatestBlogs },
//   { id: "OurOffice", Component: OurOffice },
//   { id: "OurClients", Component: OurClients },
// ];

// const App = () => {
//   const mouse = useRef({ x: 0, y: 0 });
//   const [isPointerDevice, setIsPointerDevice] = useState(false);

//   // Loader States
//   const [loading, setLoading] = useState(true);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     setIsPointerDevice(window.matchMedia("(pointer: fine)").matches);

//     // Simulate Loading Progress
//     let interval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setTimeout(() => setLoading(false), 500);
//           return 100;
//         }
//         return prev + Math.random() * 10;
//       });
//     }, 200);
//   }, []);

//   useEffect(() => {
//     const lenis = new Lenis({
//       lerp: 0.12,
//       smoothWheel: true,
//       smoothTouch: false,
//     });

//     if (loading) lenis.stop(); // Stop Lenis while loading
//     else lenis.start();

//     const raf = (time) => {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     };
//     const rafId = requestAnimationFrame(raf);
//     lenis.on("scroll", ScrollTrigger.update);

//     return () => {
//       cancelAnimationFrame(rafId);
//       lenis.destroy();
//     };
//   }, [loading]);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
//       mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <>
//       <SoftechLoader progress={progress} active={loading} />
//       {isPointerDevice && !loading && <CustomCursor />}
//     <CustomCursor />
//       <ScrollBar />
//       <Navbar />

//       <div className="fixed inset-0 z-30 hidden lg:block pointer-events-none">
//         <Scene mouse={mouse} />
//       </div>

//       <main>
//         {sections.map(({ id, Component }) => (
//           <section key={id} id={id} className="scroll-section  min-h-screen overflow-hidden">
//             <Component />
//           </section>
//         ))}
//         <SubscribeSection />
//         <Footer />
//       </main>
//     </>
//   );
// };

// export default App;

import { useEffect, useRef, useState } from "react";
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
import MobileScene from "./components/MobileScene";
import Scene from "./components/Scene";
import OurClients from "./components/OurClients";
import SubscribeSection from "./components/SubscribeSection";
import CustomCursor from "./components/CustomCursor";
import ScrollBar from "./components/ScrollBar";
import Footer from "./components/Footer";
import SoftechLoader from "./components/Loader"; // Import Loader

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

const sections = [
  { id: "hero", Component: Hero },
  { id: "page2", Component: Page2 },
  { id: "page3", Component: Paage3 },
  { id: "choose", Component: WhyChooseUs },
  { id: "work", Component: HowWeWork },
  { id: "port", Component: PortfolioShowcase },
  { id: "test", Component: Testimonials },
  { id: "blog", Component: LatestBlogs },
  { id: "office", Component: OurOffice },
  { id: "clients", Component: OurClients },
  { id: "subscribe", Component: SubscribeSection },
  { id: "footer", Component: Footer },
];

const App = () => {
  const mouse = useRef({ x: 0, y: 0 });

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  /* =========================
     POINTER CHECK
  ========================== */
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // ✅ CRITICAL SYNC
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value);
        }
        return lenis.scroll;
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

    ScrollTrigger.defaults({
      scroller: document.body,
    });

    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
    };
  }, []);

  /* =========================
     FAKE LOADER
  ========================== */
  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 180);
  }, []);

  /* =========================
     LENIS (ALWAYS ACTIVE)
  ========================== */
  // useEffect(() => {
  //   const lenis = new Lenis({
  //     lerp: 0.1,
  //     smoothWheel: true,
  //     smoothTouch: false,
  //   });

  //   const raf = (time) => {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   };

  //   requestAnimationFrame(raf);
  //   lenis.on("scroll", ScrollTrigger.update);

  //   return () => lenis.destroy();
  // }, []);

  /* =========================
     REFRESH SCROLLTRIGGER AFTER LOAD
  ========================== */
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }
  }, [loading]);

  /* =========================
     MOUSE
  ========================== */
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <SoftechLoader progress={progress} active={loading} />
      <CustomCursor />
      <ScrollBar />
      <Navbar />

      {/* ✅ Scene always mounted (smooth desktop) */}
      <div className="fixed inset-0 z-30 hidden lg:block pointer-events-none">
        <Scene mouse={mouse} />
      </div>

      <div className="fixed inset-0 z-30 block lg:hidden pointer-events-none">
        <MobileScene />
      </div>

      {/* ✅ Fade content instead of delaying mount */}
      <main
        className={`transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        {sections.map(({ id, Component }) => (
          <section key={id} id={id} className=" overflow-hidden">
            <Component />
          </section>
        ))}
      </main>
    </>
  );
};

export default App;
