import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Rallx Kanban', description: 'Developer delivery console', manifest: '/manifest.webmanifest' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
