import { useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Paage3 from './components/Paage3';
import Page2 from './components/page2';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WhyChooseUs from './components/WhyChooseUe';
import HowWeWork from './components/HowWeWork';
import PortfolioShowcase from './components/PortfolioShowcase';
import StyledScrollbar from './components/ScrollBar';
import CustomCursor from './components/CustomCursor';
import Services from './components/Services';
import LatestBlog from './components/LatestBlog';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import OurOffice from './components/OurOffice';
import OurClients from './components/OurClients';
import SubscribeSection from './components/SubscribeSection';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <>
      <CustomCursor /> {/* Custom Cursor Component */}
      <StyledScrollbar />
      
      <main className="relative">
        <Navbar />
        <Hero />
        <Page2 />
        <section className="w-full bg-brandarc px-6 md:px-16 xl:px-24 py-20">
          <Paage3 />
        </section>
        <WhyChooseUs />
        <HowWeWork />
        <PortfolioShowcase />
        <Services />
        <Testimonials />
        <LatestBlog />
        <OurOffice/>
        <OurClients/>
        <SubscribeSection/>
        <Footer />
      </main>
    </>
  );
};

export default App;