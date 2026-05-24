import { motion } from "framer-motion";

export default function PageLayout({ title, subtitle, children, maxWidth = "max-w-6xl" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`mx-auto w-full ${maxWidth} px-4 py-8 sm:px-6 lg:py-12`}
    >
      {(title || subtitle) && (
        <header className="mb-10">
          {title && (
            <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>
          )}
        </header>
      )}
      {children}
    </motion.div>
  );
}
