import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[40px] border bg-card px-8 py-20 text-center shadow-2xl">
            <div className="absolute inset-0 -z-10 bg-primary/10 blur-[120px]" />
                <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
                    Ready to bring your <span className="text-primary">team </span>together?
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                    Start organizing projects, collaborating with teammates,
                    and delivering work faster with Collabix.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Button
                    asChild
                    size="lg"
                    className="group"
                    >
                        <Link href="/register">
                            Let's collab
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>

                    <Button
                    variant="outline"
                    size="lg"
                    asChild
                    >
                        <Link href="/login">
                            Login
                        </Link>
                    </Button>
                </div>

                <p className="mt-8 text-sm text-primary">
                    No credit card required • Start building in minutes
                </p>
            </div>
      </Container>
    </section>
  );
}