import { useCallback, useState } from "react";

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    lastRender: 0,
    domNodes: 0,
  });

  const measure = useCallback(() => {
    const start = performance.now();

    requestAnimationFrame(() => {
      setMetrics({
        lastRender: Math.round(performance.now() - start),
        domNodes: document.getElementsByTagName("*").length,
      });
    });
  }, []);

  return { ...metrics, measure };
}
