import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "./ui/nav-bar";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atmos Weather App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const locale = await getLocale();
  console.log(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`bg-white ${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
      <NextIntlClientProvider messages={messages}>
      <main className="font-[family-name:var(--font-geist-sans)] flex min-h-screen flex-col">
        <header>
          <NavBar />
        </header>
        <div className="flex flex-col row-start-2 items-center">
            {children}
        </div>
      </main>
      </NextIntlClientProvider>
      </body>
    </html>
  );
}
