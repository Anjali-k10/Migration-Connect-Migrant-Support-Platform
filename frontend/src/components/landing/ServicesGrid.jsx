import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Landmark,
  Siren,
  Users,
  IdCard,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading.jsx";

const services = [
  {
    icon: UtensilsCrossed,
    title: "Food & Shelter",
    description: "Find affordable food kitchens and safe shelters near your current city.",
    to: "/services",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: Landmark,
    title: "Government Schemes",
    description: "Discover healthcare, education, and financial programs you may qualify for.",
    to: "/schemes",
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: Siren,
    title: "Emergency Support",
    description: "Verified migrants can request urgent help from coordinators quickly.",
    to: "/emergency",
    color: "from-rose-500 to-red-600"
  },
  {
    icon: Users,
    title: "NGOs & Community Help",
    description: "Connect with local organizations offering guidance and on-the-ground aid.",
    to: "/services",
    color: "from-violet-500 to-purple-600"
  },
  {
    icon: IdCard,
    title: "Migrant ID Services",
    description: "Register securely and access your profile, verification, and support history.",
    to: "/register",
    color: "from-amber-500 to-orange-600"
  }
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } }
};

export default function ServicesGrid() {
  return (
    <section id="services" className="section-padding bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we offer"
          title="Everything you need in one place"
          description="Browse services designed for migrants — simple cards, clear paths, no confusion."
        />
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={item}>
              <Link
                to={service.to}
                className="group glass-card flex h-full flex-col p-6 hover:-translate-y-2 hover:shadow-glow"
              >
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg transition group-hover:scale-110`}
                >
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:gap-2 dark:text-brand-400">
                  Learn more
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
