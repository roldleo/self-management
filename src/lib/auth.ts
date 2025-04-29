export async function login(email: string, password: string) {
    if (email === 'admin@example.com' && password === 'password') {
        return true
    }
    return false
}
