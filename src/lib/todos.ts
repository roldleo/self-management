import { supabase } from './supabase'

export async function getTodos() {
    const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)

    if (error) throw error
    return data
}

export async function addTodo(title: string) {
    const user = (await supabase.auth.getUser()).data.user
    const { error } = await supabase.from('todos').insert([
        {
            title,
            is_done: false,
            user_id: user?.id,
        },
    ])
    if (error) throw error
}
export async function markDone(id: string) {
    await supabase.from('todos').update({ is_done: true }).eq('id', id)
}

export async function Delete(id: string) {
    await supabase.from('todos').delete().eq('id', id)
}
