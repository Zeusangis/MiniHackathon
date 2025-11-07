"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const hourlyData = [
  { hour: "12AM", value: 20 },
  { hour: "2AM", value: 15 },
  { hour: "4AM", value: 25 },
  { hour: "6AM", value: 65 },
  { hour: "8AM", value: 85 },
  { hour: "10AM", value: 55 },
  { hour: "12PM", value: 60 },
  { hour: "2PM", value: 70 },
  { hour: "4PM", value: 80 },
  { hour: "6PM", value: 90 },
  { hour: "8PM", value: 45 },
  { hour: "10PM", value: 30 },
];

export function HourlyTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Hourly Congestion Trends</CardTitle>
          <Tabs defaultValue="weekdays" className="w-auto">
            <TabsList className="h-8">
              <TabsTrigger value="weekdays" className="text-xs">
                Weekdays
              </TabsTrigger>
              <TabsTrigger value="weekends" className="text-xs">
                Weekends
              </TabsTrigger>
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Congestion",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[180px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hourlyData}>
              <XAxis
                dataKey="hour"
                stroke="hsl(var(--muted-foreground))"
                fontSize={11}
                tickLine={false}
              />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="value"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        <p className="text-xs text-muted-foreground mt-4">
          Peak rush hour occurred from 8:15AM-9:07AM and 5:14PM-7:25PM
        </p>
      </CardContent>
    </Card>
  );
}
