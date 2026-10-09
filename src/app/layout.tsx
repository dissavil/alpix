import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ALPIX — строительная компания",
    template: "%s — ALPIX",
  },
  description:
    "Девелопмент и строительство жилой недвижимости в Алматы и Алматинской области. От земли и концепции до реализации проекта.",
  applicationName: "ALPIX",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#003631",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={manrope.variable}>
        <a className="skip-link" href="#main">
          Перейти к содержимому
        </a>

        {children}
      </body>
    </html>
  );
}