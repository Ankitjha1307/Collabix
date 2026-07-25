"use client";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <Section className="pt-20">
      
        <Container>
          <div className="flex justify-center">
            <HeroContent />
          </div>
        </Container>
    </Section>
  );
}