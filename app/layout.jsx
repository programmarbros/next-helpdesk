import "./globals.css";
import { Rubik } from "next/font/google";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";
import Navbar from "./components/navbar";

const rubik = Rubik({ subsets: ["latin"] })

export const metadata = {
  title: 'Next HelpDesk',
  description: 'A simple help desk template built with Next.js',
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        {children}
        <ServiceWorkerRegister />
        </body>
    </html>
  );
}
