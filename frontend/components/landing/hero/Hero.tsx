"use client";

import Section from "@/components/common/Section";
import Container from "@/components/common/Container";

import Spotlight from "../Spotlight";
import DashboardPreview from "../DashboardPreview";

import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <Section className="pt-20">
      <Spotlight />

      <Container>

        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.15fr]">

          <HeroContent />

          <DashboardPreview />

        </div>

      </Container>
    </Section>
  );
}