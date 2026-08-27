import { Suspense, lazy, useEffect, useState } from "react";

const CoffeeScene = lazy(() => import("./CoffeeScene"));

export function SceneMount({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={className} aria-hidden />;

  return (
    <div className={className}>
      <Suspense fallback={null}>
        <CoffeeScene />
      </Suspense>
    </div>
  );
}
