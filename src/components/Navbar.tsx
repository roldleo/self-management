'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getProfile } from '@/lib/profile'
import { useAuth } from '@/app/AuthContext'

export default function Navbar() {
    const { displayName, setDisplayName, isAuthenticated, setIsAuthenticated } = useAuth()

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fetchData = async () => {
                const token = localStorage.getItem('access_token')
                if (token) {
                    try {
                        // Ambil data profil setelah login
                        const profile = await getProfile()
                        if (profile && profile.length > 0) {
                            const { display_name } = profile[0]
                            setDisplayName(display_name)
                            setIsAuthenticated(true)
                        }
                    } catch (error) {
                        console.error('Error fetching profile data:', error)
                        setDisplayName(null)
                        setIsAuthenticated(false)
                    }
                } else {
                    setDisplayName(null)
                    setIsAuthenticated(false)
                }
            }

            fetchData()
        }
    }, [setDisplayName, setIsAuthenticated])

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token')
            localStorage.removeItem('uuid')
        }
        setDisplayName(null)
        setIsAuthenticated(false)
        window.location.href = '/login'
    }

    return (
        <nav className="flex items-center justify-between p-4 border-b">
            <Link href="/dashboard" className="text-2xl font-bold">
                Self Management
            </Link>
            <div className="flex items-center gap-4">
                {isAuthenticated ? (
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
