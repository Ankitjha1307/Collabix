import {
  ShieldCheck,
  CheckSquare,
  History,
  MessageSquare,
  Smartphone,
  MoonStar,
} from "lucide-react";
import Container from "@/components/common/Container";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Role-Based Access",
    description:
      "Control permissions with Owner, Admin and Member roles to keep every workspace secure.",
    icon: ShieldCheck,
  },
  {
    title: "Smart Task Tracking",
    description:
      "Assign teammates, set priorities, due dates and monitor progress effortlessly.",
    icon: CheckSquare,
  },
  {
    title: "Activity Timeline",
    description:
      "Track every important action with a complete activity history for your workspace.",
    icon: History,
  },
  {
    title: "Team Collaboration",
    description:
      "Discuss tasks through comments and keep everyone aligned in one place.",
    icon: MessageSquare,
  },
  {
    title: "Responsive Experience",
    description:
      "Work seamlessly across desktop, tablet and mobile devices.",
    icon: Smartphone,
  },
  {
    title: "Dark & Light Mode",
    description:
      "Choose the appearance that suits your workflow without sacrificing readability.",
    icon: MoonStar,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-28"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">

          <Badge
            className="bg-accent rounded-full"
          >
            FEATURES
          </Badge>

          <h2 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Powerful <span className="text-primary">features</span> for
            <br />
            modern teams.
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Everything you need to manage projects,
            collaborate with teammates and deliver work
            efficiently.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group
                  rounded-3xl
                  border
                  bg-card
                  p-10
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-primary/40
                  hover:shadow-xl
                "
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </Container>
    </section>
  );
}