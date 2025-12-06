import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'LexiDoc AI',
  description: 'AI-Powered Legal Document Analyzer & Contract Generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Suspense>
            <ProgressBar
                height="4px"
                color="hsl(var(--accent))"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </Suspense>
      </body>
    </html>
  );
}
