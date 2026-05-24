import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Siren } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import PageLayout from "../components/common/PageLayout.jsx";
import Button from "../components/ui/Button.jsx";
import { Input, Textarea } from "../components/ui/Input.jsx";
import { createEmergency } from "../services/migrant.service.js";

export default function Emergency() {
  const { user } = useAuth();
  const [currentCity, setCurrentCity] = useState(user?.currentCity || "");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");
    setSubmitting(true);
    try {
      const result = await createEmergency({ currentCity, message });
      setStatus(`Request submitted. Reference: ${result.emergencyId}`);
      setMessage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user?.verified) {
    return (
      <PageLayout maxWidth="max-w-2xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card border-amber-200/50 p-8 dark:border-amber-800/50"
        >
          <AlertTriangle className="mb-4 h-12 w-12 text-amber-500" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Verification required</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Emergency requests are available to verified accounts. Contact support with your ID:{" "}
            <strong className="font-mono text-brand-700 dark:text-brand-300">{user?.migrantId}</strong>
          </p>
        </motion.div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Emergency Help"
      subtitle="Submit an urgent request — coordinators will respond as quickly as possible."
      maxWidth="max-w-lg"
    >
      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass-card space-y-5 border-red-200/30 p-8 dark:border-red-900/30"
      >
        <div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 dark:bg-red-950/30">
          <Siren className="h-6 w-6 text-red-600" />
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            Use only for genuine emergencies
          </p>
        </div>
        {status && (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            {status}
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
          required
        />
        <Textarea
          label="Describe your situation"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit" variant="primary" size="lg" className="w-full !from-red-500 !to-red-600" disabled={submitting}>
          {submitting ? "Submitting…" : "Request emergency help"}
        </Button>
      </motion.form>
    </PageLayout>
  );
}
