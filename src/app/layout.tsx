import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PageLayout from "@/components/PageLayout";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gallery of Glosses",
  description: "Learn About Glosses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />

          <PageLayout>{children}</PageLayout>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
