import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 hover:from-accent-400 hover:to-accent-500 disabled:opacity-60",
  secondary:
    "bg-brand-600 text-white shadow-lg shadow-brand-600/20 hover:bg-brand-500 dark:bg-brand-500 dark:hover:bg-brand-400 disabled:opacity-60",
  outline:
    "border-2 border-brand-600/30 bg-white/80 text-brand-800 hover:border-brand-500 hover:bg-brand-50 dark:border-brand-400/40 dark:bg-slate-900/50 dark:text-brand-200 dark:hover:bg-brand-950 disabled:opacity-60",
  ghost:
    "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base"
};

const motionProps = {
  whileHover: { scale: 1.03, y: -1 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 20 }
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  type = "button",
  disabled,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={classes} {...props}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={classes}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}
