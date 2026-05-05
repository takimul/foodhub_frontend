import Navbar from "@/components/shared/navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";


export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}