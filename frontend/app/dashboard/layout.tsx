"use client";
import { useEffect } from "react";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import DashboardSidebarContainer from "@/app/dashboard/dashbord-sidebar-container";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter, usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      // Use the browser's own location to build the redirect — avoids any
      // mismatch between Next.js pathname and the real query string.
      const { pathname: p, search, hash } = globalThis.location;
      const currentUrl = p + search + hash;
      router.replace(`/login?redirect=${encodeURIComponent(currentUrl)}`);
    }
  }, [user, pathname]);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <DashboardSidebarContainer
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      <div className="flex flex-col flex-1 min-h-0 min-w-0">
        <div className="flex-shrink-0">
          <DashboardHeader onMenuToggle={() => setMobileSidebarOpen(true)} />
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
