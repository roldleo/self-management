'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getProfile, updateUser } from '@/lib/profile'

export default function ProfilePage() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await getProfile()
                if (profile && profile.length > 0) {
                    const { id, display_name, phone } = profile[0]
                    setUserId(id)
                    setName(display_name)
                    setPhone(phone)
                }
            } catch (error) {
                console.error('Error fetching profile data:', error)
            }
        }
        fetchData()
    }, [])

    // Update data profil pengguna
    const handleSave = async () => {
        if (!userId) return

        const updatedData = { id: userId, display_name: name, phone }

        try {
            await updateUser(updatedData)
            setIsEditing(false)
            console.log('Profil berhasil diperbarui')
        } catch (error) {
            console.error('Gagal memperbarui profil:', error)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Profil Pengguna</h1>

            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nama
                </label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} className="mt-1" />
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Telepon
                </label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditing} className="mt-1" />
            </div>

            <div className="flex justify-between mt-6">{isEditing ? <Button onClick={handleSave}>Simpan</Button> : <Button onClick={() => setIsEditing(true)}>Edit</Button>}</div>
        </div>
    )
}
