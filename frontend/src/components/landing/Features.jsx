import { motion } from "framer-motion";
import {
  MapPin,
  Map,
  ShieldCheck,
  Languages,
  Lock
} from "lucide-react";
import SectionHeading from "../ui/SectionHeading.jsx";

const features = [
  {
    icon: MapPin,
    title: "Real-time help centers",
    description: "Up-to-date listings for food, shelter, and NGO support in your area."
  },
  {
    icon: Map,
    title: "Nearby shelters map",
    description: "See distance-sorted centers so you can choose what’s closest."
  },
  {
    icon: ShieldCheck,
    title: "Verified emergency support",
    description: "Emergency requests from verified accounts reach coordinators faster."
  },
  {
    icon: Languages,
    title: "Multilingual support",
    description: "Designed for diverse communities with clear, accessible language."
  },
  {
    icon: Lock,
    title: "Secure registration",
    description: "Your ID is hashed and your data is protected with care."
  }
];

export default function Features() {
  return (
    <section id="features" className="section-padding bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Migrant Connect"
          title="Built for dignity and speed"
          description="Modern tools with a human touch — because finding help shouldn’t be hard."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl border border-transparent p-6 transition hover:border-brand-200 hover:bg-white hover:shadow-soft dark:hover:border-brand-800 dark:hover:bg-slate-900"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-900/60 dark:text-brand-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
