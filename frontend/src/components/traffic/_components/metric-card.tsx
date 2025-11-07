import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Info } from "lucide-react";
import { cn } from "@/lib/cn";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    direction: "up" | "down";
    label: string;
  };
  variant?: "default" | "primary";
  showInfo?: boolean;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  variant = "default",
  showInfo = false,
}: MetricCardProps) {
  return (
    <Card
      className={cn(variant === "primary" && "bg-primary/20 border-primary/30")}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>
          {showInfo && <Info className="h-4 w-4 text-muted-foreground" />}
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-foreground">{value}</span>
            {subtitle && (
              <span className="text-sm text-muted-foreground">{subtitle}</span>
            )}
          </div>
          {trend && (
            <div className="flex items-center gap-1.5 text-sm">
              {trend.direction === "up" ? (
                <ArrowUp className="h-4 w-4 text-chart-3" />
              ) : (
                <ArrowDown className="h-4 w-4 text-accent" />
              )}
              <span
                className={cn(
                  "font-medium",
                  trend.direction === "up" ? "text-chart-3" : "text-accent"
                )}
              >
                {trend.value}
              </span>
              <span className="text-muted-foreground">{trend.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
