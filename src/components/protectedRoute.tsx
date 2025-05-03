'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        const checkSession = async () => {
            const token = localStorage.getItem('access_token')
            const uuid = localStorage.getItem('uuid')
            if (!token || !uuid) {
                router.push('/login')
                return
            }
        }

        checkSession()
    }, [router])

    return <>{children}</>
}
