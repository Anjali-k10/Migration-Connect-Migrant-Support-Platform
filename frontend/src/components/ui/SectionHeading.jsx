import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  id
}) {
  const alignClass =
    align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`mb-12 max-w-2xl ${alignClass}`}
    >
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full bg-brand-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}
