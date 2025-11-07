"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  AlertTriangle,
  Users,
  Navigation,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const incidents = [
  { location: "I-580 / 4th St", date: "01/14/21, 7:02AM" },
  { location: "I-580 / Harrison St", date: "01/12/21, 8:56PM" },
  { location: "I-580 / Park Blvd", date: "01/05/21, 6:45AM" },
  { location: "I-580 / Broadway", date: "01/03/21, 5:36PM" },
  { location: "I-580 / I-980", date: "01/02/21, 8:01AM" },
];

const speedData = [
  { date: "01/01", lastTwoWeeks: 35, baseline: 42 },
  { date: "01/03", lastTwoWeeks: 32, baseline: 40 },
  { date: "01/05", lastTwoWeeks: 38, baseline: 43 },
  { date: "01/07", lastTwoWeeks: 42, baseline: 45 },
  { date: "01/09", lastTwoWeeks: 36, baseline: 41 },
  { date: "01/11", lastTwoWeeks: 33, baseline: 39 },
  { date: "01/13", lastTwoWeeks: 37, baseline: 42 },
];

export function ArterialTrendsSidebar() {
  return (
    <aside className="w-80 border-l border-border bg-card flex flex-col">
      {/* Sidebar Navigation */}
      <div className="border-b border-border p-4 space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2"
        >
          <Navigation className="h-4 w-4" />
          <span className="text-sm">Map</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2"
        >
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm">Alerts</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 bg-primary/10"
        >
          <AlertTriangle className="h-4 w-4 text-primary" />
          <span className="text-sm text-primary">Trends</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2"
        >
          <Users className="h-4 w-4" />
          <span className="text-sm">Team</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2"
        >
          <Settings className="h-4 w-4" />
          <span className="text-sm">Settings</span>
        </Button>
      </div>

      {/* Arterial Trends Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Arterial Trends
            </h3>
            <Select defaultValue="i580">
              <SelectTrigger className="w-[140px] h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="i580">Interstate 580</SelectItem>
                <SelectItem value="i880">Interstate 880</SelectItem>
                <SelectItem value="i80">Interstate 80</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-accent/10 border-accent/30">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 text-accent-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl font-bold text-foreground">3rd</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Most Congested Arterial in Alameda County
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Navigation className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl font-bold text-foreground">58%</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Congestion Level
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl font-bold text-foreground">5</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Accidents
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Navigation className="h-4 w-4 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-2xl font-bold text-foreground">1</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Road Closure
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Incidents Summary */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Summary of Incidents
            </h3>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs">
                Accidents
              </Badge>
              <Badge variant="outline" className="text-xs">
                Closures
              </Badge>
            </div>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-[1fr,auto,auto] gap-2 text-xs font-medium text-muted-foreground pb-2 border-b border-border">
              <div>Location</div>
              <div>Date</div>
              <div>Report</div>
            </div>
            {incidents.map((incident, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr,auto,auto] gap-2 items-center py-2 text-xs border-b border-border/50"
              >
                <div className="font-medium text-foreground truncate">
                  {incident.location}
                </div>
                <div className="text-muted-foreground">{incident.date}</div>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Average Auto Speeds */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">
              Average Auto Speeds in MPH
            </h3>
            <Tabs defaultValue="daily" className="w-auto">
              <TabsList className="h-7">
                <TabsTrigger value="daily" className="text-xs h-6 px-2">
                  Daily Averages
                </TabsTrigger>
                <TabsTrigger value="hourly" className="text-xs h-6 px-2">
                  Hourly Averages
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-4 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-3" />
              <span className="text-muted-foreground">Last Two Weeks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
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
                color: "hsl(var(--muted-foreground))",
              },
            }}
            className="h-[150px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={speedData}>
                <defs>
                  <linearGradient
                    id="speedLastTwoWeeks"
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
                  <linearGradient
                    id="speedBaseline"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--muted-foreground))"
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--muted-foreground))"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={10}
                  tickLine={false}
                  domain={[0, 60]}
                  ticks={[10, 20, 30, 40, 50, 60]}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  fill="url(#speedBaseline)"
                />
                <Area
                  type="monotone"
                  dataKey="lastTwoWeeks"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  fill="url(#speedLastTwoWeeks)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </aside>
  );
}
