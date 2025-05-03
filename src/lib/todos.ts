// Mendapatkan daftar todos
export async function getTodos() {
    const userId = localStorage.getItem('uuid')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error('Failed to fetch todos')
    }

    const data = await response.json()
    return data
}

// Menambahkan todo baru
export async function addTodo(title: string) {
    const userId = localStorage.getItem('uuid')
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, userId }),
    })

    if (!response.ok) {
        throw new Error('Failed to add todo')
    }

    return await response.json()
}

// Menandai todo selesai
export async function markDone(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error('Failed to mark todo as done')
    }

    return await response.json()
}

// Menghapus todo
export async function deleteTodo(id: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        throw new Error('Failed to delete todo')
    }

    return await response.json()
}
