
import { Inter, Roboto } from 'next/font/google';


export const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '700'],
  display: 'swap',
});

export const robotoFont = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700'],
  display: 'swap',
});