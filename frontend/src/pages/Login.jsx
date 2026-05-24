import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import AuthCard from "../components/ui/AuthCard.jsx";
import PageLayout from "../components/common/PageLayout.jsx";
import Button from "../components/ui/Button.jsx";
import { Input } from "../components/ui/Input.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [migrantId, setMigrantId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(migrantId.trim(), password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout maxWidth="max-w-lg">
      <AuthCard title="Welcome back" subtitle="Sign in with your migrant ID">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
              {error}
            </p>
          )}
          <Input
            label="Migrant ID"
            value={migrantId}
            onChange={(e) => setMigrantId(e.target.value)}
            placeholder="MIG-..."
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={submitting}
          >
            <LogIn className="h-5 w-5" />
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          New here?{" "}
          <Link to="/register" className="font-semibold text-brand-600 hover:underline dark:text-brand-400">
            Create an account
          </Link>
        </p>
      </AuthCard>
    </PageLayout>
  );
}
