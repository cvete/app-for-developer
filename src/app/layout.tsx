import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'properti',
  description: 'The Leading Real Estate Tech Agent in 2030.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-gray-50 min-h-screen'}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
