
import React from "react";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-pairup-background min-h-screen">
      <Navbar />
      <main className={`pt-16 pb-${isMobile ? '20' : '8'} px-4 max-w-7xl mx-auto`}>
        {children}
      </main>
      <MobileNav />
      <Toaster />
    </div>
  );
};

export default Layout;
