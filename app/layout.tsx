import React from "react";
import ToasterProvider from "@/providers/ToasterProvider";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ModalProvider from "@/providers/ModalProvider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Gallery of Glosses",
  description: "Explore Glosses and Manuscripts",
};

export const revalidate = 0;

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <ModalProvider />
        <Navbar>
          <div className="main">{children}</div>
          <Footer />
        </Navbar>
      </body>
    </html>
  );
};

export default RootLayout;
