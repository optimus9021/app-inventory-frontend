import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppShellProvider } from "@/context/AppShellContext";
import { AppShell } from "@/components/layout/AppShell";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Inventory Management System",
  description: "Comprehensive inventory management system with analytics, supply chain, and sales data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <ToastProvider>
            <AppShellProvider>
              <AppShell>
                {children}
              </AppShell>
            </AppShellProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
