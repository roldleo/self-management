'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { getProfile } from '@/lib/profile'

export default function Navbar() {
    const [displayName, setDisplayName] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await getProfile()
                if (profile && profile.length > 0) {
                    const { display_name } = profile[0]
                    setDisplayName(display_name)
                }
            } catch (error) {
                console.error('Error fetching profile data:', error)
                setDisplayName('')
            }
        }
        fetchData()
    }, [])

    return (
        <nav className="flex items-center justify-between p-4 border-b">
            <Link href="/dashboard" className="text-2xl font-bold">
                Self Management
            </Link>
            <div className="flex items-center gap-4">
                {displayName ? (
                    <div className="flex items-center gap-4">
                        <span>Welcome, {displayName}</span>
                        <Button
                            onClick={async () => {
                                localStorage.removeItem('access_token')
                                localStorage.removeItem('uuid')
                                window.location.href = '/login'
                            }}
                        >
                            Logout
                        </Button>
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
