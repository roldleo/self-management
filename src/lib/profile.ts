import { supabase } from './supabase'

export async function getProfile() {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)

    if (error) throw error
    return data
}

export async function updateUser(data: any) {
    await supabase
        .from('profiles')
        .update(data)
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
}
