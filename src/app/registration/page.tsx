'use client' // Tambahkan ini di bagian atas file

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'

const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [phone, setPhone] = useState('')
    const [error, setError] = useState<string>('')
    const router = useRouter()

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    displayName,
                    phone,
                }),
            })

            const result = await response.json()

            if (!response.ok || result.status === 'error') {
                setError(result.message || 'Registration failed')
                return
            }

            // Redirect ke login
            router.push('/login')
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
            <form onSubmit={handleSignup} className="max-w-sm w-full space-y-6 p-6 border rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

                <div className="space-y-1">
                    <Label htmlFor="displayName" className="">
                        Display Name
                    </Label>
                    <Input id="displayName" type="displayName" placeholder="Enter your displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="phone" className="">
                        Phone
                    </Label>
                    <Input id="phone" type="phone" placeholder="Enter your phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="email" className="">
                        Email
                    </Label>
                    <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="space-y-1">
                    <Label htmlFor="password" className="">
                        Password
                    </Label>
                    <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <Button type="submit" className="w-full mt-4">
                    Register
                </Button>

                {error && (
                    <Alert className="mt-4" variant="destructive">
                        <p>{error}</p>
                    </Alert>
                )}
            </form>
        </div>
    )
}

export default SignupPage
