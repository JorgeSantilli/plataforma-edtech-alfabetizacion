import type { Metadata } from "next";
import { Spline_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SessionSync from "@/components/auth/SessionSync";

const splineSans = Spline_Sans({
  variable: "--font-spline-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LiteracyFlow",
  description: "Plataforma EdTech de Alfabetización Inicial en Español",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          splineSans.variable,
          "font-sans antialiased"
        )}
      >
        <SessionSync />
        {children}
      </body>
    </html>
  );
}
