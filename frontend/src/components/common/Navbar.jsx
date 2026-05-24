import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import Button from "../ui/Button.jsx";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/#services", label: "Services", hash: true },
  { to: "/services", label: "Find Help" },
  { to: "/schemes", label: "Schemes" },
  { to: "/#features", label: "Features", hash: true }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-brand-600 text-white dark:bg-brand-500"
        : "text-slate-600 hover:bg-brand-50 hover:text-brand-800 dark:text-slate-300 dark:hover:bg-brand-950 dark:hover:text-brand-200"
    }`;

  const handleHashNav = (e, to) => {
    if (!to.startsWith("/#")) return;
    e.preventDefault();
    const id = to.replace("/#", "");
    if (location.pathname !== "/") {
      window.location.href = to;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-soft dark:shadow-none"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-lg">
            <Heart className="h-5 w-5 fill-white" />
          </span>
          <span className="text-gradient">Migrant Connect</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.hash ? (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => handleHashNav(e, link.to)}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-800 dark:text-slate-300 dark:hover:bg-brand-950"
              >
                {link.label}
              </a>
            ) : (
              <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
                {link.label}
              </NavLink>
            )
          )}
          {user && (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/emergency" className={linkClass}>
                Emergency
              </NavLink>
            </>
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2.5 text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {user ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="rounded-full px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50 dark:text-brand-300"
              >
                Login
              </NavLink>
              <Button to="/register" variant="primary" size="sm">
                Register
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 text-slate-600 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-full p-2 text-slate-700 dark:text-slate-200"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass border-t lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) =>
                link.hash ? (
                  <a
                    key={link.to}
                    href={link.to}
                    onClick={(e) => handleHashNav(e, link.to)}
                    className="rounded-xl px-4 py-3 font-medium text-slate-700 dark:text-slate-200"
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className="rounded-xl px-4 py-3 font-medium text-slate-700 dark:text-slate-200"
                  >
                    {link.label}
                  </NavLink>
                )
              )}
              {user && (
                <>
                  <NavLink to="/dashboard" className="rounded-xl px-4 py-3 font-medium">
                    Dashboard
                  </NavLink>
                  <NavLink to="/emergency" className="rounded-xl px-4 py-3 font-medium">
                    Emergency
                  </NavLink>
                </>
              )}
              {!user && (
                <div className="mt-2 flex flex-col gap-2">
                  <Button to="/login" variant="outline" size="md" className="w-full">
                    Login
                  </Button>
                  <Button to="/register" variant="primary" size="md" className="w-full">
                    Register
                  </Button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {!isHome && scrolled && (
        <div className="h-px bg-gradient-to-r from-transparent via-brand-300/50 to-transparent" />
      )}
    </header>
  );
}
