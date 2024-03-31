import type { Metadata } from "next";
import "../style/style.css"
import { Inter } from "next/font/google";
import Provider from "@/redux/component/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lockheart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " scrollNone"}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
