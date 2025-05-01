import { supabase } from './supabase'

// lib/profile.ts
export type Profile = {
    id: string
    display_name: string
    phone: string
}

export async function getProfile(): Promise<Profile[]> {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)

    if (error) throw error
    return data
}

export async function updateUser(data: Profile): Promise<void> {
    const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', (await supabase.auth.getUser()).data.user?.id)

    if (error) throw error
}
