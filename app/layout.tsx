import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/nav-bar";
import { FileProvider } from "./pdfcompress/FileContext";
import { OrderProvider } from "@/context/orderContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Printable",
  description: "one stop document printing solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <NavBar />
          <FileProvider>
<<<<<<< HEAD
          {children}
=======
            <OrderProvider> {children}</OrderProvider>
>>>>>>> 39d6af8bc786f740a3810023cbd77d0a79b8b393
          </FileProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
