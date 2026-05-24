import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-glow"
      >
        <Heart className="h-7 w-7 fill-white" />
      </motion.div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading…</p>
    </div>
  );
}
