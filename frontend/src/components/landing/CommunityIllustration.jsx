import { motion } from "framer-motion";

export default function CommunityIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative mx-auto w-full max-w-lg"
      aria-hidden
    >
      <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-brand-400/30 to-accent-400/20 blur-3xl" />
      <svg
        viewBox="0 0 480 400"
        className="relative w-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="240" cy="200" r="160" fill="url(#glow)" opacity="0.4" />
        <defs>
          <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#14b89a" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        {/* Network lines */}
        <motion.path
          d="M240 120 L120 200 M240 120 L360 200 M120 200 L240 280 M360 200 L240 280 M240 120 L240 280"
          stroke="#0d9488"
          strokeWidth="2"
          strokeDasharray="6 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        {/* Center hub */}
        <circle cx="240" cy="200" r="48" fill="#0d9488" className="dark:fill-brand-500" />
        <path
          d="M225 200h30M240 185v30"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* People nodes */}
        {[
          [120, 200, "#f59e0b"],
          [360, 200, "#14b89a"],
          [240, 120, "#6366f1"],
          [240, 280, "#ec4899"],
          [180, 160, "#0ea5e9"],
          [300, 240, "#10b981"]
        ].map(([cx, cy, fill], i) => (
          <motion.g
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
          >
            <circle cx={cx} cy={cy} r="36" fill={fill} opacity="0.9" />
            <circle cx={cx} cy={cy - 8} r="14" fill="white" opacity="0.95" />
            <ellipse cx={cx} cy={cy + 18} rx="20" ry="14" fill="white" opacity="0.9" />
          </motion.g>
        ))}
        {/* Floating badges */}
        <motion.rect
          x="60"
          y="80"
          width="100"
          height="36"
          rx="18"
          fill="white"
          className="dark:fill-slate-800"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        />
        <text x="110" y="103" textAnchor="middle" className="fill-brand-700 text-[11px] font-bold">
          Food & Shelter
        </text>
        <motion.rect
          x="320"
          y="300"
          width="110"
          height="36"
          rx="18"
          fill="white"
          className="dark:fill-slate-800"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        />
        <text x="375" y="323" textAnchor="middle" className="fill-brand-700 text-[11px] font-bold">
          Emergency Help
        </text>
      </svg>
    </motion.div>
  );
}
