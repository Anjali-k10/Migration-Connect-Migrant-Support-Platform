export function Skeleton({ className = "" }) {
  return <div className={`shimmer-bg rounded-xl ${className}`} aria-hidden />;
}

export function CardSkeleton() {
  return (
    <div className="glass-card space-y-4 p-6">
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-10 w-1/3" />
    </div>
  );
}

export function GridSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
