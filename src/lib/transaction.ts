import { supabase } from './supabase'

export async function getTransaction() {
    const { data, error } = await supabase
        .from('transaction')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)

    if (error) throw error
    return data
}

export async function addTrasaction(data: any) {
    const user = (await supabase.auth.getUser()).data.user
    const { error } = await supabase.from('transaction').insert(data)
    if (error) throw error
}
export async function update(id: string, data: any) {
    await supabase.from('transaction').update(data).eq('id', id)
}

export async function Delete(id: string) {
    await supabase.from('transaction').delete().eq('id', id)
}
