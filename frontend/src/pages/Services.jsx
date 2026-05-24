import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import HelpCenterCard from "../components/cards/HelpCenterCard.jsx";
import PageLayout from "../components/common/PageLayout.jsx";
import HelpMap from "../components/services/HelpMap.jsx";
import { GridSkeleton } from "../components/ui/Skeleton.jsx";
import { Input } from "../components/ui/Input.jsx";
import { useLocation } from "../hooks/useLocation.js";
import {
  getCheapestFoodCenters,
  getCheapestShelters,
  getHelpCenters,
  getNearestHelpCenters
} from "../services/helpCenter.service.js";

const modes = [
  ["all", "All in city"],
  ["nearest", "Nearest to me"],
  ["shelters", "Cheapest shelters"],
  ["food", "Cheapest food"]
];

export default function Services() {
  const { coords, error: locError, loading: locLoading } = useLocation();
  const [city, setCity] = useState("Mumbai");
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("all");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        let data;
        if (mode === "nearest" && coords) {
          data = await getNearestHelpCenters(coords.lat, coords.lng);
        } else if (mode === "shelters") {
          data = await getCheapestShelters(city);
        } else if (mode === "food") {
          data = await getCheapestFoodCenters(city);
        } else {
          data = await getHelpCenters({ city });
        }
        if (!cancelled) setCenters(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [city, mode, coords]);

  return (
    <PageLayout
      title="Help Centers & Services"
      subtitle="Find food kitchens, shelters, and NGOs — filter by city or discover what's nearest to you."
      maxWidth="max-w-7xl"
    >
      <div className="mb-10 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <HelpMap centers={centers} />
        </div>
        <div className="flex flex-col justify-center gap-4 lg:col-span-2">
          <p className="text-slate-600 dark:text-slate-400">
            {loading
              ? "Loading map…"
              : `${centers.length} center${centers.length !== 1 ? "s" : ""} shown`}
          </p>
          {mode === "nearest" && locError && (
            <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950/50 dark:text-amber-200">
              Enable location for nearest results, or switch to city search.
            </p>
          )}
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {modes.map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMode(value)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              mode === value
                ? "bg-brand-600 text-white shadow-lg shadow-brand-600/25"
                : "glass-card px-5 py-2 text-slate-700 hover:border-brand-300 dark:text-slate-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode !== "nearest" && (
        <div className="mb-8 max-w-xs">
          <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
      )}

      {mode === "nearest" && locLoading && (
        <p className="mb-4 text-sm text-slate-500">Getting your location…</p>
      )}

      {error && (
        <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-red-700 dark:bg-red-950/50 dark:text-red-300">
          {error}
        </p>
      )}

      {loading ? (
        <GridSkeleton count={4} />
      ) : centers.length === 0 ? (
        <div className="glass-card flex flex-col items-center py-16 text-center">
          <Search className="mb-4 h-12 w-12 text-slate-300" />
          <p className="text-slate-600 dark:text-slate-400">No centers found. Try another city or filter.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {centers.map((center, i) => (
            <HelpCenterCard key={center._id} center={center} index={i} />
          ))}
        </div>
      )}
    </PageLayout>
  );
}
