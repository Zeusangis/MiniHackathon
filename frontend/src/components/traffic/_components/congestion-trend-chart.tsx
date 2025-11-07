"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { date: "01/01", lastTwoWeeks: 45, baseline: 42 },
  { date: "01/03", lastTwoWeeks: 52, baseline: 48 },
  { date: "01/05", lastTwoWeeks: 48, baseline: 50 },
  { date: "01/07", lastTwoWeeks: 38, baseline: 45 },
  { date: "01/09", lastTwoWeeks: 55, baseline: 52 },
  { date: "01/11", lastTwoWeeks: 72, baseline: 58 },
  { date: "01/13", lastTwoWeeks: 58, baseline: 55 },
];

export function CongestionTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Daily Congestion Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-3" />
            <span className="text-muted-foreground">Last Two Weeks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Baseline</span>
          </div>
        </div>
        <ChartContainer
          config={{
            lastTwoWeeks: {
              label: "Last Two Weeks",
              color: "hsl(var(--chart-3))",
            },
            baseline: {
              label: "Baseline",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="colorLastTwoWeeks"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-3))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-3))"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="date"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                label={{
                  value: "100%",
                  position: "insideTopLeft",
                  fill: "hsl(var(--muted-foreground))",
                }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="baseline"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorBaseline)"
              />
              <Area
                type="monotone"
                dataKey="lastTwoWeeks"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
                fill="url(#colorLastTwoWeeks)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
