import { motion } from "framer-motion";
import { MapPin, Phone, IndianRupee } from "lucide-react";
import { formatDistance } from "../../utils/formatDistance.js";

const typeColors = {
  food: "from-amber-500 to-orange-500",
  shelter: "from-brand-500 to-emerald-600",
  ngo: "from-violet-500 to-purple-600"
};

export default function HelpCenterCard({ center, index = 0 }) {
  const gradient = typeColors[center.type] || typeColors.ngo;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card group overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-glow"
    >
      <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{center.name}</h3>
          <span
            className={`shrink-0 rounded-full bg-gradient-to-r ${gradient} px-3 py-0.5 text-xs font-bold uppercase text-white`}
          >
            {center.type}
          </span>
        </div>
        <p className="mt-3 flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          {center.address}, {center.city}
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Phone className="h-4 w-4 text-brand-600" />
          {center.contactNumber}
        </p>
        {center.costPerDay != null && (
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <IndianRupee className="h-4 w-4 text-accent-500" />
            {center.costPerDay}/day
          </p>
        )}
        {center.distance != null && (
          <p className="mt-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
            {formatDistance(center.distance)} away
          </p>
        )}
      </div>
    </motion.article>
  );
}
