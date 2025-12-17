import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { usePerformanceMetrics } from "@/hooks/usePerformanceMetrics";

export function PerformanceTooltip() {
  const { lastRender, domNodes, measure } = usePerformanceMetrics();
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (v) measure(); // 🔥 
        }}
      >
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Activity className="h-4 w-4" />
            Performance
          </Button>
        </TooltipTrigger>

        <TooltipContent className="w-64 p-4">
          <p className="mb-3 font-medium">Performance Metrics</p>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Render</span>
              <span className="font-semibold text-green-600">
                {lastRender} ms
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">DOM Nodes</span>
              <span className="font-semibold">{domNodes}</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
