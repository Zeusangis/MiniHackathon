import TrafficPage from "@/components/traffic/page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/traffic")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TrafficPage />;
}
