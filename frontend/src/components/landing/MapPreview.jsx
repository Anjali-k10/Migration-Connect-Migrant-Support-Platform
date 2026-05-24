import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import Button from "../ui/Button.jsx";
import SectionHeading from "../ui/SectionHeading.jsx";

const pins = [
  { x: "28%", y: "35%", label: "Food Kitchen", color: "bg-accent-500" },
  { x: "55%", y: "28%", label: "Shelter", color: "bg-brand-500" },
  { x: "72%", y: "52%", label: "NGO Hub", color: "bg-violet-500" },
  { x: "38%", y: "62%", label: "Medical Aid", color: "bg-rose-500" }
];

export default function MapPreview() {
  return (
    <section className="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Find help nearby"
            title="See centers on the map"
            description="Sort by distance, filter by type, and get directions to food, shelter, and NGO support."
            align="left"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card relative aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-100 via-slate-100 to-emerald-50 dark:from-slate-800 dark:via-slate-900 dark:to-brand-950">
              <svg className="h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-brand-300"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            {pins.map((pin, i) => (
              <motion.div
                key={pin.label}
                className="absolute"
                style={{ left: pin.x, top: pin.y }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.15, type: "spring" }}
              >
                <span className="relative flex">
                  <span
                    className={`absolute inline-flex h-8 w-8 animate-ping rounded-full ${pin.color} opacity-40`}
                  />
                  <span
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full ${pin.color} text-white shadow-lg`}
                  >
                    <MapPin className="h-4 w-4" />
                  </span>
                </span>
                <span className="absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-2 py-1 text-xs font-semibold shadow dark:bg-slate-800">
                  {pin.label}
                </span>
              </motion.div>
            ))}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <Navigation className="h-4 w-4 text-brand-600" />
                4 centers near you
              </div>
              <Button to="/services" variant="secondary" size="sm">
                Open map
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
