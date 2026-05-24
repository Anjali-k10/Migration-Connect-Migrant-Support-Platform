import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function HelpMap({ centers = [] }) {
  const pins = centers.slice(0, 5);

  return (
    <div className="glass-card relative aspect-[16/10] overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-brand-950">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#0d9488 1px, transparent 1px), linear-gradient(90deg, #0d9488 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>
      {pins.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center text-slate-500">
          Map updates when centers load
        </div>
      ) : (
        pins.map((center, i) => (
          <motion.div
            key={center._id}
            className="absolute"
            style={{
              left: `${15 + (i * 70) % 75}%`,
              top: `${20 + (i * 45) % 60}%`
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="group relative">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg">
                <MapPin className="h-4 w-4" />
              </span>
              <span className="pointer-events-none absolute left-1/2 top-10 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white group-hover:block">
                {center.name}
              </span>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}
