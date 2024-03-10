"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import ProductProvider, {
  ProductContext,
} from "@/components/ProductsContext/ProductsContext";
import Footer from "@/components/footer/Footer";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {pathname !== "/login" && pathname !== "/register" && (
            <div>
              <div className=" w-3/4 m-auto ">
                <ProductProvider>
                  <Navbar />
                  {children}
                </ProductProvider>
              </div>
              <Toaster />
              <Footer />
            </div>
          )}

          {pathname === "/login" && (
            <div>
              <ProductProvider>{children}</ProductProvider>
            </div>
          )}
          {pathname === "/register" && (
            <div>
              <ProductProvider>{children}</ProductProvider>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
