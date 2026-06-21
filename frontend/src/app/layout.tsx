import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font",
});

export const metadata: Metadata = {
  title: "DealHub Vietnam — Deal + Social + Video + Booking",
  description: "Nền tảng giao dịch địa phương: Deal + Social + Video + Booking. Du lịch, Nhà hàng, Spa, Khám sức khỏe.",
};

import { LanguageProvider } from "@/i18n/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
