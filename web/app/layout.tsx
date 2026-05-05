import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Ford Car Price Predictor",
  description:
    "Predict the market value of used Ford cars using ML. Fast, accurate, and easy to use.",
  authors: [{ name: "Utsav Jaiswal", url: "https://www.masterutsav.in" }, { name: "GitHub Repo", url: "https://github.com/Master-utsav/ML_1_Ford_Price_Prediction" } , { name: "LinkedIn", url: "https://www.linkedin.com/in/master-utsav" }, { name: "Twitter", url: "https://x.com/masterutsav01" },  {name: "Master Utsav", url: "https://www.masterutsav.in" }, ],

  openGraph: {
    title: "Ford Car Price Predictor",
    description:
      "Estimate used Ford car prices instantly with machine learning.",
    url: process.env.DOMAIN || "http://localhost:3000",
    siteName: "Ford Price Predictor",
    images: [
      {
        url: "/images/screen_main.jpeg", // main preview
        width: 1200,
        height: 630,
        alt: "Ford Price Prediction App UI",
      },
      {
        url: "/images/prediction_pop_up.jpeg",
        width: 1200,
        height: 630,
        alt: "Prediction Result Popup",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ford Car Price Predictor",
    description:
      "Estimate used Ford car prices instantly with ML-powered predictions.",
    images: ["/images/screen_main.jpeg"],
  },

  metadataBase: new URL(process.env.DOMAIN || "http://localhost:3000"),
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        plus_jakarta_sans.variable,
        "font-sans",
        plus_jakarta_sans.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
