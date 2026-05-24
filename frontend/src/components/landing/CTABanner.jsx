import { motion } from "framer-motion";
import { HandHeart } from "lucide-react";
import Button from "../ui/Button.jsx";

export default function CTABanner() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-emerald-600 px-8 py-16 text-center shadow-glow sm:px-16"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl" />
          <div className="relative">
            <HandHeart className="mx-auto mb-6 h-14 w-14 text-accent-300" />
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Ready to find support or lend a hand?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-brand-100">
              Join thousands of migrants and volunteers building a safer, more connected
              community.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button to="/register" variant="primary" size="lg" className="!shadow-xl">
                Register as Migrant
              </Button>
              <Button
                to="/services"
                variant="outline"
                size="lg"
                className="!border-white/40 !bg-white/10 !text-white hover:!bg-white/20"
              >
                Volunteer / Explore
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
