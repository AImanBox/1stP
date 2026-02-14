import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Capstone Web App',
  description: 'A modern Next.js web application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
