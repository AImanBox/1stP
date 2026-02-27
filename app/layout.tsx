import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Machine Failure Predictions Web App',
  description: 'Machine learning models for predicting and preventing machine failures',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
