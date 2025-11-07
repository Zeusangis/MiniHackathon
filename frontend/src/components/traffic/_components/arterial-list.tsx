"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const arterials = [
  { name: "I-880", change: "+5%", congestion: 59 },
  { name: "I-80", change: "+3%", congestion: 55 },
  { name: "I-580", change: "+1%", congestion: 49 },
  { name: "Hwy 24", change: "+2%", congestion: 33 },
  { name: "I-980", change: "+8%", congestion: 24 },
  { name: "Hwy 123", change: "+4%", congestion: 18 },
];

export function ArterialList() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Most Congested Arterials</CardTitle>
          <Tabs defaultValue="highways" className="w-auto">
            <TabsList className="h-8">
              <TabsTrigger value="highways" className="text-xs">
                Highways
              </TabsTrigger>
              <TabsTrigger value="non-highways" className="text-xs">
                Non-Highways
              </TabsTrigger>
              <TabsTrigger value="all" className="text-xs">
                All Arterials
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {arterials.map((arterial) => (
          <div key={arterial.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">
                  {arterial.name}
                </span>
                <span className="text-accent text-xs">{arterial.change}</span>
              </div>
              <span className="text-muted-foreground">
                {arterial.congestion}%
              </span>
            </div>
            <div className="h-1.5 bg-secondary/20 dark:bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-muted-foreground dark:bg-foreground rounded-full"
                style={{ width: `${arterial.congestion}%` }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
