export function Input({ label, className = "", ...props }) {
  return (
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
      {label}
      <input
        className={`mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${className}`}
        {...props}
      />
    </label>
  );
}

export function Textarea({ label, className = "", ...props }) {
  return (
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
      {label}
      <textarea
        className={`mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${className}`}
        {...props}
      />
    </label>
  );
}

export function Select({ label, children, className = "", ...props }) {
  return (
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
      {label}
      <select
        className={`mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
