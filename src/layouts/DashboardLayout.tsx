import type { ReactNode } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
