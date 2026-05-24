import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, MapPin, ShieldCheck, Siren, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import PageLayout from "../components/common/PageLayout.jsx";
import Button from "../components/ui/Button.jsx";
import { Input } from "../components/ui/Input.jsx";
import { updateMyProfile } from "../services/migrant.service.js";

const quickActions = [
  { to: "/services", icon: Search, label: "Find help", color: "from-brand-500 to-emerald-600" },
  { to: "/schemes", icon: ShieldCheck, label: "Schemes", color: "from-blue-500 to-indigo-600" },
  { to: "/emergency", icon: Siren, label: "Emergency", color: "from-rose-500 to-red-600" }
];

export default function Dashboard() {
  const { user, refreshProfile } = useAuth();
  const [currentCity, setCurrentCity] = useState(user?.currentCity || "");
  const [occupation, setOccupation] = useState(user?.occupation || "");
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await updateMyProfile({ currentCity, occupation, emergencyContact });
      await refreshProfile();
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) return null;

  return (
    <PageLayout
      title="Your Dashboard"
      subtitle={`Welcome back, ${user.name}`}
      maxWidth="max-w-7xl"
    >
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {quickActions.map((action, i) => (
          <motion.div
            key={action.to}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link
              to={action.to}
              className="glass-card flex items-center gap-4 p-5 transition hover:-translate-y-1 hover:shadow-glow"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white`}
              >
                <action.icon className="h-6 w-6" />
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="glass-card p-8 lg:col-span-2">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-500 text-2xl font-bold text-white">
              {user.name?.charAt(0) || "M"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
              <p className="font-mono text-sm text-brand-600 dark:text-brand-400">{user.migrantId}</p>
            </div>
          </div>
          <dl className="mt-8 space-y-4">
            {[
              { icon: MapPin, label: "Home state", value: user.homeState },
              { icon: MapPin, label: "Current city", value: user.currentCity },
              {
                icon: ShieldCheck,
                label: "Verification",
                value: user.verified ? "Verified" : "Pending"
              }
            ].map((row) => (
              <div key={row.label} className="flex items-start gap-3">
                <row.icon className="mt-0.5 h-5 w-5 text-brand-600" />
                <div>
                  <dt className="text-xs font-medium uppercase text-slate-500">{row.label}</dt>
                  <dd
                    className={`font-medium ${
                      row.label === "Verification" && user.verified
                        ? "text-emerald-600"
                        : row.label === "Verification"
                          ? "text-amber-600"
                          : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {row.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <form
          onSubmit={handleSave}
          className="glass-card space-y-5 p-8 lg:col-span-3"
        >
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
            <User className="h-5 w-5 text-brand-600" />
            Update profile
          </h2>
          {message && (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
              {message}
            </p>
          )}
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
              {error}
            </p>
          )}
          <Input
            label="Current city"
            value={currentCity}
            onChange={(e) => setCurrentCity(e.target.value)}
          />
          <Input
            label="Occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
          <Input
            label="Emergency contact"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
          />
          <Button type="submit" variant="secondary">
            Save changes
          </Button>
        </form>
      </div>
    </PageLayout>
  );
}
