import { Users, Building2, Home, CheckCircle2 } from "lucide-react";
import AnimatedCounter from "../ui/AnimatedCounter.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";

const stats = [
  { value: 12500, suffix: "+", label: "Migrants Helped", icon: Users },
  { value: 340, suffix: "+", label: "NGOs Connected", icon: Building2 },
  { value: 890, suffix: "+", label: "Active Shelters", icon: Home },
  { value: 4200, suffix: "+", label: "Emergency Requests Solved", icon: CheckCircle2 }
];

export default function Stats() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our impact"
          title="Numbers that tell a story"
          description="Every count represents a person who found food, shelter, or hope."
          align="center"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
