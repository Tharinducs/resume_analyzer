"use client";
import { DashboardHeader } from "@/components/dashboard-header";
import DashboardSidebarContainer from "@/app/dashboard/dashbord-sidebar-container";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <DashboardSidebarContainer />
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-shrink-0">
          <DashboardHeader />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
