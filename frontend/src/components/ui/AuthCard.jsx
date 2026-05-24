import { motion } from "framer-motion";

export default function AuthCard({ title, subtitle, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto w-full max-w-md"
    >
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
        {subtitle && <p className="mt-2 text-slate-600 dark:text-slate-400">{subtitle}</p>}
      </div>
      <div className="glass-card p-8">{children}</div>
    </motion.div>
  );
}
