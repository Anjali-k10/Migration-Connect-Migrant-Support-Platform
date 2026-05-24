import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "../ui/SectionHeading.jsx";

const testimonials = [
  {
    name: "Ravi Kumar",
    role: "Construction worker, Mumbai",
    text: "I found a shelter within hours. The app made everything clear when I was scared and alone.",
    avatar: "RK"
  },
  {
    name: "Priya Sharma",
    role: "Volunteer coordinator",
    text: "We connect faster with people who need us. Verified requests help us respond with confidence.",
    avatar: "PS"
  },
  {
    name: "Ahmed Hassan",
    role: "Migrant from Bihar",
    text: "Government schemes were confusing before. Now I know what I can apply for and where to go.",
    avatar: "AH"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Voices from the community"
          title="Stories that inspire us"
          description="Real experiences from migrants and volunteers using Migrant Connect."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card relative flex flex-col p-8"
            >
              <Quote className="absolute right-6 top-6 h-10 w-10 text-brand-200 dark:text-brand-800" />
              <div className="mb-4 flex gap-1 text-accent-500">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="flex-1 text-slate-700 dark:text-slate-300">&ldquo;{t.text}&rdquo;</p>
              <footer className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-6 dark:border-slate-800">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
                  {t.avatar}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-slate-900 dark:text-white">
                    {t.name}
                  </cite>
                  <p className="text-sm text-slate-500">{t.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
