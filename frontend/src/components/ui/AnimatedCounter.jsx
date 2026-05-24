import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, duration, start]);

  return count;
}

export default function AnimatedCounter({ value, suffix = "", label, icon: Icon }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(value, 2200, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass-card group p-6 text-center transition hover:-translate-y-1 hover:shadow-glow"
    >
      {Icon && (
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 transition group-hover:scale-110 dark:bg-brand-900/50 dark:text-brand-300">
          <Icon className="h-6 w-6" />
        </div>
      )}
      <p className="font-display text-4xl font-bold text-brand-700 dark:text-brand-300">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
    </motion.div>
  );
}
