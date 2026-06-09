function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-tgs-surface rounded animate-pulse ${className}`} />
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-tgs-bg">
      {/* Nav */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-[rgba(14,14,14,0.85)] border-b border-tgs-border z-[100]" />

      {/* Hero skeleton */}
      <div className="min-h-screen pt-16 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-center gap-16 px-6 md:px-10 max-w-[1200px] mx-auto w-full py-16">
          <div className="space-y-5 order-2 lg:order-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-16 w-72" />
            <Skeleton className="h-14 w-48" />
            <div className="pt-2 space-y-2">
              <Skeleton className="h-4 w-full max-w-[420px]" />
              <Skeleton className="h-4 w-3/4 max-w-[340px]" />
              <Skeleton className="h-4 w-2/3 max-w-[280px]" />
            </div>
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-11 w-36" />
              <Skeleton className="h-11 w-28" />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <Skeleton className="w-[260px] h-[330px] md:w-[290px] md:h-[365px] rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
