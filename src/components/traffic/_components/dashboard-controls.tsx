"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DashboardControls() {
  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Dashboard</span>
            <Select defaultValue="alameda">
              <SelectTrigger className="w-[200px] mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alameda">Alameda County</SelectItem>
                <SelectItem value="santa-clara">Santa Clara County</SelectItem>
                <SelectItem value="san-mateo">San Mateo County</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <span className="text-sm text-muted-foreground">
              Reporting Period
            </span>
            <Select defaultValue="last-two-weeks">
              <SelectTrigger className="w-[180px] mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-two-weeks">Last Two Weeks</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">
              Comparison Period
            </span>
            <Select defaultValue="baseline">
              <SelectTrigger className="w-[180px] mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baseline">Baseline</SelectItem>
                <SelectItem value="last-year">Last Year</SelectItem>
                <SelectItem value="previous-period">Previous Period</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
