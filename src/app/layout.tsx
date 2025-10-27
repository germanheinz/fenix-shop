import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components";
import { interFont, robotoFont } from "@/config/fonts";


export const metadata: Metadata = {
  title: {
    template: '%s | Fenix Shop',
    default: 'Fenix Shop',
  },
  description: "Your premium fashion e-commerce experience",
  icons: {
    icon: [
      // {
        // url: '/favicon.ico',
        // sizes: '32x32',
        // type: 'image/x-icon',
      // },
      // {
      //   url: '/icon.svg',
      //   type: 'image/svg+xml',
      // }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} ${robotoFont.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}