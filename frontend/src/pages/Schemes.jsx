import { motion } from "framer-motion";
import { ExternalLink, Landmark } from "lucide-react";
import PageLayout from "../components/common/PageLayout.jsx";

const schemes = [
  {
    name: "Ayushman Bharat",
    category: "Healthcare",
    description:
      "Health insurance cover up to ₹5 lakh per family per year for secondary and tertiary care.",
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    name: "PM-SVANidhi",
    category: "Financial",
    description: "Micro-credit facility for street vendors to resume livelihoods.",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    name: "e-Shram Portal",
    category: "Worker welfare",
    description: "Register unorganized workers for social security and welfare benefits.",
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    name: "National Food Security Act",
    category: "Food",
    description:
      "Subsidized food grains for eligible households through the public distribution system.",
    gradient: "from-violet-500 to-purple-600"
  }
];

export default function Schemes() {
  return (
    <PageLayout
      title="Government Schemes"
      subtitle="Programs that may support migrants — always confirm eligibility with official sources."
      maxWidth="max-w-7xl"
    >
      <div className="mb-8 flex items-center gap-3 rounded-2xl glass px-5 py-4">
        <Landmark className="h-8 w-8 text-brand-600" />
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Information is for guidance only. Visit official government portals for applications and
          documents.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {schemes.map((scheme, i) => (
          <motion.article
            key={scheme.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card group overflow-hidden transition hover:-translate-y-1 hover:shadow-glow"
          >
            <div className={`h-1 bg-gradient-to-r ${scheme.gradient}`} />
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                {scheme.category}
              </span>
              <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">{scheme.name}</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400">{scheme.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 opacity-0 transition group-hover:opacity-100 dark:text-brand-400">
                Learn more <ExternalLink className="h-4 w-4" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </PageLayout>
  );
}
