import { Sora, Inter } from "next/font/google";
import "./globals.css";

const display = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

const title = "Rafter Technologies | Solution of Tech Desires";
const description =
  "IT consulting, network support, web development, corporate training and career services from a remote-first hybrid team.";

export const metadata = {
  title, description,
  keywords: ["IT services", "IT consulting", "web development", "corporate training", "resume writing"],
  openGraph: { title, description, type: "website", siteName: "Rafter Technologies" },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
