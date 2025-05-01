'use client' // Pastikan komponen ini dijalankan di sisi klien

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            const user = data?.user

            if (user) {
                console.log('User logged in:', user)
                // Misal mau ke dashboard setelah login
                router.push('/dashboard')
            } else {
                setError('Invalid login credentials')
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('Unknown error occurred')
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleLogin} className="max-w-sm w-full space-y-4 p-6 border rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

                {/* Email Input */}
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full mt-4">
                    Login
                </Button>

                {/* Error Alert */}
                {error && (
                    <Alert variant="destructive" className="mt-4">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </form>
        </div>
    )
}

export default LoginPage
