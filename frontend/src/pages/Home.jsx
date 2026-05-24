import Hero from "../components/landing/Hero.jsx";
import ServicesGrid from "../components/landing/ServicesGrid.jsx";
import Features from "../components/landing/Features.jsx";
import Stats from "../components/landing/Stats.jsx";
import MapPreview from "../components/landing/MapPreview.jsx";
import Testimonials from "../components/landing/Testimonials.jsx";
import CTABanner from "../components/landing/CTABanner.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <Features />
      <Stats />
      <MapPreview />
      <Testimonials />
      <CTABanner />
    </>
  );
}
