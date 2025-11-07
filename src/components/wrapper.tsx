import { Outlet } from "@tanstack/react-router";

const SidebarWrapper = () => {
  return (
    <main className="flex h-screen w-screen">
      Sidebar
      <div className="grow w-full bg-background py-6">
        <div className="max-w-7xl mx-auto px-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default SidebarWrapper;
