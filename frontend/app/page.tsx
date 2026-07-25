import Hero from "@/components/landing/hero/Hero";
import LandingNavbar from "@/components/landing/LandingNavbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <LandingNavbar />
      <Hero />
      <Footer />
    </>
  );
}