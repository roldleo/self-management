'use client'

import { useEffect, useState } from 'react'
import { getTodos, addTodo, markDone, Delete } from '@/lib/todos'
import { ProtectedRoute } from '@/components/protectedRoute'

type Todo = {
    id: string
    title: string
    is_done: boolean
}

export default function TodosPage() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [newTodo, setNewTodo] = useState('')

    useEffect(() => {
        getTodos().then(setTodos).catch(console.error)
    }, [])

    const handleAdd = async () => {
        if (!newTodo.trim()) return
        await addTodo(newTodo)
        setNewTodo('')
        const updatedTodos = await getTodos()
        setTodos(updatedTodos)
    }
    const handleUpdate = async (id: string) => {
        await markDone(id)
        const updatedTodos = await getTodos()
        setTodos(updatedTodos)
    }
    const handleDelete = async (id: string) => {
        await Delete(id)
        const updatedTodos = await getTodos()
        setTodos(updatedTodos)
    }

    return (
        <ProtectedRoute>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
                <div className="flex gap-2 mb-4">
                    <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="What do you need to do?" className="border p-2 rounded w-full" />
                    <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Add
                    </button>
                </div>
                <ul>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {todos.map((todo) => (
                            <div key={todo.id} className={`rounded-2xl border p-4 shadow-sm ${todo.is_done ? 'bg-green-400' : 'bg-yellow-400'} flex flex-col gap-3`}>
                                <div className="flex items-start gap-2">
                                    <span className="text-green-500 text-xl">{todo.is_done ? '✅' : '🕒'}</span>
                                    <div className={`text-xl font-medium text-white`}>{todo.title}</div>
                                </div>

                                <div className="flex gap-2 mt-2">
                                    {!todo.is_done && (
                                        <button onClick={() => handleUpdate(todo.id)} className="text-sm px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                            Done
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(todo.id)} className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </ul>
            </div>
        </ProtectedRoute>
    )
}
