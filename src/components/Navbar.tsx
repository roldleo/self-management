'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getProfile } from '@/lib/profile'

export default function Navbar() {
    const [displayName, setDisplayName] = useState<string | null>(null)

    useEffect(() => {
        // Fungsi untuk mengecek login status
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('access_token')
                if (token) {
                    // Ambil data profil dari API
                    const profile = await getProfile()
                    if (profile && profile.length > 0) {
                        const { display_name } = profile[0]
                        setDisplayName(display_name)
                    }
                } else {
                    setDisplayName(null)
                }
            } catch (error) {
                console.error('Error fetching profile data:', error)
                setDisplayName(null)
            }
        }

        fetchData() // Fetch data ketika komponen dirender ulang
    }, [localStorage.getItem('access_token')]) // Tambahkan dependency untuk memantau perubahan token

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('uuid')
        setDisplayName(null) // Reset state displayName saat logout
        window.location.href = '/login' // Redirect ke halaman login
    }

    return (
        <nav className="flex items-center justify-between p-4 border-b">
            <Link href="/dashboard" className="text-2xl font-bold">
                Self Management
            </Link>
            <div className="flex items-center gap-4">
                {displayName ? (
                    <div className="flex items-center gap-4">
                        <span>Welcome, {displayName}</span>
                        <Button onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <>
                        <Link href="/login">
                            <Button>Login</Button>
                        </Link>
                        <Link href="/registration">
                            <Button>Registration</Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
