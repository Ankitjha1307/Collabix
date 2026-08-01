import Hero from "@/components/landing/hero/Hero";
import LandingNavbar from "@/components/landing/LandingNavbar";
import Footer from "@/components/layout/Footer";
import ProductSection from "@/components/landing/ProductSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CTASection from "@/components/landing/CTASection";
import Spotlight from "@/components/landing/Spotlight";

export default function Home() {
  return (
    <>
      <LandingNavbar />

      <div className="relative overflow-hidden">

        <Spotlight />
        
        <Hero/>

        <ProductSection/>

        <FeaturesSection/>

        <CTASection/>

        <Footer/>
      </div>
    </>
  );
}