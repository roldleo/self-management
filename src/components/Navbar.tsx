'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { User } from '@supabase/supabase-js'

export default function Navbar({ user }: { user: User | null }) {
    const [displayName, setDisplayName] = useState<string | null>(null)

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                const { data } = await supabase.from('profiles').select('display_name').eq('id', user.id).single()

                if (data) {
                    setDisplayName(data.display_name)
                }
            }
        }

        fetchProfile()
    }, [user])

    return (
        <nav className="flex items-center justify-between p-4 border-b">
            <Link href="/dashboard" className="text-2xl font-bold">
                Self Management
            </Link>
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <span>Welcome, {displayName ?? user.email}</span>
                        <Button
                            onClick={async () => {
                                await supabase.auth.signOut()
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
