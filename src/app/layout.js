import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "AEON",
  description: "Web Engineer Assessment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
