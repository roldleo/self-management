// src/app/layout.client.tsx
'use client' // Pastikan komponen ini dijalankan di sisi klien

import './globals.css'
import type { User } from '@supabase/supabase-js'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            setUser(session?.user || null)
        }

        getSession()

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null)
        })

        return () => {
            authListener?.subscription.unsubscribe()
        }
    }, [])

    return (
        <html lang="en">
            <body>
                <Navbar user={user} />
                <main className="p-4">{children}</main>
            </body>
        </html>
    )
}
