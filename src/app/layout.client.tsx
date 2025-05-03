// src/app/layout.client.tsx
'use client' // Pastikan komponen ini dijalankan di sisi klien

import { AuthProvider } from './AuthContext'
import './globals.css'
import Navbar from '@/components/Navbar'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Navbar />
                    <main className="p-4">{children}</main>
                </AuthProvider>
            </body>
        </html>
    )
}
