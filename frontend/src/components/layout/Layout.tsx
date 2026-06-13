import React from "react";
import { Navbar } from "./Navbar";
import { TopBar } from "./TopBar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen" style={{ background: '#040405', color: '#F4F0EA' }}>
      <TopBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};
