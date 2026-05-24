import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Share2, MessageCircle, Globe, Users } from "lucide-react";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Find Help" },
  { to: "/schemes", label: "Schemes" },
  { to: "/register", label: "Register" },
  { to: "/login", label: "Login" }
];

const social = [
  { icon: Share2, label: "Share", href: "#" },
  { icon: MessageCircle, label: "Messages", href: "#" },
  { icon: Globe, label: "Website", href: "#" },
  { icon: Users, label: "Community", href: "#" }
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
                <Heart className="h-5 w-5 fill-white text-white" />
              </span>
              Migrant Connect
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              A human-centered platform connecting migrants with shelters, food, schemes, and
              emergency support across India.
            </p>
            <div className="mt-6 flex gap-3">
              {social.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition hover:bg-brand-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Quick links</h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 transition hover:text-brand-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Support</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <Link to="/emergency" className="hover:text-brand-300">
                  Emergency help
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-300">
                  Help centers
                </Link>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-brand-300">
                  Community stories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3 text-slate-400">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                support@migrantconnect.org
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                1800-XXX-HELP (24/7)
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                Mumbai & Delhi — expanding nationwide
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Migrant Connect. All rights reserved.</p>
          <p>Built with care for social impact.</p>
        </div>
      </div>
    </footer>
  );
}
