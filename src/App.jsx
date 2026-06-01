
import { useEffect } from 'react';
import Hero from './components/Hero'
import Navbar from './components/Navbar';
import Paage3 from './components/Paage3';
import Page2 from './components/page2';
import Lenis from '@studio-freight/lenis'
import WhyChooseUs from './components/WhyChooseUe';
import HowWeWork from './components/HowWeWork';
import PortfolioShowcase from './components/PortfolioShowcase';

const App = () => {


useEffect(() => {
  const lenis = new Lenis()
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}, [])
  return (
    <main>
      <Navbar />
      <Hero />
      <Page2 />
      <section className="w-full bg-brandarc px-6 md:px-16 xl:px-24 py-20">
      <Paage3 />
      </section>
      <WhyChooseUs />
      <HowWeWork />
          <PortfolioShowcase />
    </main>
  )
}

export default App  