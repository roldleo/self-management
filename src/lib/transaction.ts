type Transaction = {
    id: string
    title: string
    amount: number
    type: 'pendapatan' | 'pengeluaran'
    category: string | null
    created_at: string
    user_id: string
}
export async function getTransaction(): Promise<Transaction[]> {
    const userId = localStorage.getItem('uuid')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions?userId=${userId}`)
    if (!res.ok) throw new Error(await res.text())
    const data: Transaction[] = await res.json()
    return data.map((item) => ({
        ...item,
        created_at: item.created_at || new Date().toISOString(),
    }))
}

export async function addTransaction(data: { title: string; amount: number; type: 'pendapatan' | 'pengeluaran'; category: string | null; user_id: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, created_at: new Date().toISOString() }),
    })
    if (!res.ok) throw new Error(await res.text())
}

export async function updateTransaction(
    id: string,
    data: {
        title: string
        amount: number
        type: 'pendapatan' | 'pengeluaran'
        category: string | null
    }
) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(await res.text())
}

export async function deleteTransaction(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error(await res.text())
}
