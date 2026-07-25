import Link from "next/link";
import Container from "@/components/common/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

export default function ProductSection() {
  return (
    <section
      id="product"
      className="py-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">

          <Badge
            variant="secondary"
            className="bg-accent rounded-full"
          >
            PRODUCT
          </Badge>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Everything your team needs
            <br />
            to stay <span className="text-primary">organized.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Collabix is a collaborative project management platform
            that brings workspaces, Kanban boards, task management,
            and team collaboration together in one intuitive
            workspace—helping teams plan, organize and deliver
            projects more efficiently.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/register">
                Ready to start?
                <ArrowRight/>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <Link href="#features">
                Explore Features
              </Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-6xl">
            <DashboardPreview />
        </div>

      </Container>
    </section>
  );
}