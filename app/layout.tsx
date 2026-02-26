import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Together We Are America',
  description: 'A fun flag quiz game for countries across the Americas and the Caribbean.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
