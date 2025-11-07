import { createFileRoute } from "@tanstack/react-router";
import "../App.css";
import TrafficPage from "@/components/traffic/page";

export const Route = createFileRoute("/")({
  component: App,
});
function App() {
  return (
    <div className="App bg-neutral-900">
      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn> */}
      <div className="flex flex-col ">
        <TrafficPage />
      </div>
      {/* </SignedIn> */}
    </div>
  );
}
