import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import Button from "../ui/Button.jsx";
import CommunityIllustration from "./CommunityIllustration.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden bg-mesh-light dark:bg-mesh-dark">
      <div className="absolute inset-0 bg-hero-gradient opacity-80" />
      <div className="section-padding relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium text-brand-800 dark:text-brand-200">
              <Heart className="h-4 w-4 fill-accent-500 text-accent-500" />
              Trusted support for migrants nationwide
            </span>
            <h1 className="font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Helping Migrants Find{" "}
              <span className="text-gradient">Support Faster</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Connect with food kitchens, shelters, NGOs, government schemes, and emergency
              assistance — all in one warm, human-centered platform built for real needs.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button to={user ? "/emergency" : "/register"} variant="primary" size="lg">
                Get Help
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button to="/services" variant="secondary" size="lg">
                Explore Services
              </Button>
              {!user && (
                <Button to="/register" variant="outline" size="lg">
                  Register
                </Button>
              )}
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm text-slate-600 dark:text-slate-400">
              {["Free to register", "Verified centers", "24/7 emergency"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
          <CommunityIllustration />
        </div>
      </div>
    </section>
  );
}
