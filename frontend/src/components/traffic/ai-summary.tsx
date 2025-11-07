import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface AISummaryProps {
  summary: string;
}

export default function AISummary({ summary }: AISummaryProps) {
  return (
    <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20 p-5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-violet-500/20 border border-violet-500/30 shrink-0">
          <Sparkles className="size-5 text-violet-300" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-violet-300 uppercase tracking-wide mb-2">
            AI Summary
          </h3>
          <p className="text-slate-200 text-sm leading-relaxed text-pretty">
            {summary}
          </p>
        </div>
      </div>
    </Card>
  );
}
