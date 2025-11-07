"use client";

import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="/placeholder.svg?height=48&width=48"
              alt="Profile"
            />
            <AvatarFallback>EP</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-foreground">
                Elle Patterson
              </h1>
              <span className="text-muted-foreground">for Leverege</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <Badge
                variant="outline"
                className="bg-chart-3/10 text-chart-3 border-chart-3/30"
              >
                Available for work
              </Badge>
              <Button
                variant="link"
                className="h-auto p-0 text-sm text-muted-foreground"
              >
                Follow
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button
            size="icon"
            variant="outline"
            className="rounded-full bg-transparent"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button
            size="default"
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            Get in touch
          </Button>
        </div>
      </div>
    </header>
  );
}
