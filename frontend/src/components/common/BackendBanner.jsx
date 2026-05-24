import { AlertCircle, RefreshCw } from "lucide-react";
import { useApi } from "../../context/ApiContext.jsx";

export default function BackendBanner() {
  const { online, checking, refresh } = useApi();

  if (checking || online) return null;

  return (
    <div
      role="alert"
      className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-amber-950 dark:border-amber-900 dark:bg-amber-950/80 dark:text-amber-100"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 text-sm">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <span>
          Backend is offline — login, registration, and live help centers will not work. From the
          project root run: <code className="rounded bg-amber-100 px-1.5 py-0.5 font-mono dark:bg-amber-900">npm run dev</code>
        </span>
        <button
          type="button"
          onClick={refresh}
          className="inline-flex items-center gap-1 rounded-full bg-amber-600 px-3 py-1 text-xs font-semibold text-white hover:bg-amber-700"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </button>
      </div>
    </div>
  );
}
