import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import AuthCard from "../components/ui/AuthCard.jsx";
import PageLayout from "../components/common/PageLayout.jsx";
import Button from "../components/ui/Button.jsx";
import { Input, Select } from "../components/ui/Input.jsx";

const initial = {
  name: "",
  dateOfBirth: "",
  homeState: "",
  currentCity: "",
  occupation: "",
  idType: "Aadhaar",
  idNumber: "",
  password: "",
  emergencyContact: ""
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(null);
    setSubmitting(true);
    try {
      const result = await register(form);
      setSuccess(result.migrantId);
      setForm(initial);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout maxWidth="max-w-lg">
      <AuthCard title="Join Migrant Connect" subtitle="Register securely — save your migrant ID">
        {success && (
          <div className="mb-6 rounded-xl bg-emerald-50 px-4 py-4 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-200">
            Account created and you&apos;re signed in. Your migrant ID:{" "}
            <strong className="font-mono">{success}</strong>
            <Link to="/dashboard" className="ml-2 font-semibold underline">
              Go to dashboard
            </Link>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
              {error}
            </p>
          )}
          <Input label="Full name" value={form.name} onChange={update("name")} required />
          <Input
            label="Date of birth"
            type="date"
            value={form.dateOfBirth}
            onChange={update("dateOfBirth")}
            required
          />
          <Input label="Home state" value={form.homeState} onChange={update("homeState")} required />
          <Input
            label="Current city"
            value={form.currentCity}
            onChange={update("currentCity")}
            required
          />
          <Input label="Occupation" value={form.occupation} onChange={update("occupation")} />
          <Select label="ID type" value={form.idType} onChange={update("idType")}>
            <option>Aadhaar</option>
            <option>VoterID</option>
            <option>WorkerID</option>
          </Select>
          <Input label="ID number" value={form.idNumber} onChange={update("idNumber")} required />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={update("password")}
            required
          />
          <Input
            label="Emergency contact"
            type="tel"
            value={form.emergencyContact}
            onChange={update("emergencyContact")}
            required
          />
          <Button type="submit" variant="primary" size="lg" className="w-full mt-2" disabled={submitting}>
            <UserPlus className="h-5 w-5" />
            {submitting ? "Registering…" : "Create account"}
          </Button>
        </form>
      </AuthCard>
    </PageLayout>
  );
}
