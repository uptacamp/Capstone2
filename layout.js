import { Inter, Space_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Space Coast — Next Liftoff',
  description: 'Live countdown to the next Florida rocket launch.',
};

export const viewport = {
  themeColor: '#050810',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="font-sans text-white antialiased overflow-hidden h-screen w-screen">
        {children}
      </body>
    </html>
  );
}
