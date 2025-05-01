// lib/transaction.ts
import { supabase } from './supabase'

export async function getTransaction() {
    const { data, error } = await supabase
        .from('transaction')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)

    if (error) throw error
    return data?.map((item) => ({
        ...item,
        created_at: item.created_at || new Date().toISOString(), // Pastikan created_at ada
    }))
}

export async function addTransaction(data: { title: string; amount: number; type: 'pendapatan' | 'pengeluaran'; category: string | null }) {
    const user = (await supabase.auth.getUser()).data.user
    const { error } = await supabase.from('transaction').insert({
        ...data,
        user_id: user?.id, // Pastikan user_id ada
        created_at: new Date().toISOString(), // Tambahkan created_at
    })

    if (error) throw error
}

export async function update(id: string, data: { title: string; amount: number; type: 'pendapatan' | 'pengeluaran'; category: string | null }) {
    const { error } = await supabase.from('transaction').update(data).eq('id', id)

    if (error) throw error
}

export async function deleteTransaction(id: string) {
    const { error } = await supabase.from('transaction').delete().eq('id', id)

    if (error) throw error
}
