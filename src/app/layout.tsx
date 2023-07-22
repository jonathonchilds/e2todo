import { Josefin_Sans } from "next/font/google";
import { Provider } from "@/components/Providers";
import BackgroundImages from "@/components/BackgroundImages";
import "./globals.css";

// Implements Next.js' new font optimization - improves page load performance and reduces layout shift
const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "E2 Todo App",
  description: "E2 Todo App Recreation Using Next.js 13!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={josefinSans.className}>
      <body className="dark:bg-dark-vd-blue  bg-light-vl-grayish-blue ">
        <Provider>
          <BackgroundImages />
          {children}
        </Provider>
      </body>
    </html>
  );
}
