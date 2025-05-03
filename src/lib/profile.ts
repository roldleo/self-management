export type Profile = {
    id: string
    display_name: string
    phone: string
}

export async function getProfile(): Promise<Profile[]> {
    const userId = localStorage.getItem('uuid')

    if (!userId) return []

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile?id=${userId}`)
    if (!res.ok) throw new Error('Failed to fetch profile')

    return res.json()
}

export async function updateUser(data: Profile): Promise<void> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile?id=${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) throw new Error('Failed to update profile')
}
