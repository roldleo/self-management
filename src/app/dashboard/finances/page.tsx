'use client'

import { useEffect, useState } from 'react'
import { getTransaction, addTrasaction, update, Delete } from '@/lib/transaction'
import { ProtectedRoute } from '@/components/protectedRoute'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import TransactionChart from '@/components/TransactionChart'

export default function TransactionPage() {
    const [transaction, setTransaction] = useState<any[]>([])
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('pendapatan')
    const [category, setCategory] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editId, setEditId] = useState<string | null>(null)

    useEffect(() => {
        getTransaction().then(setTransaction).catch(console.error)
    }, [])

    const resetForm = () => {
        setTitle('')
        setAmount('')
        setType('pendapatan')
        setCategory('')
        setEditId(null)
    }

    const handleSave = async () => {
        if (!title.trim() || !amount.trim() || (type === 'pengeluaran' && !category)) return

        const data = {
            title,
            amount: parseFloat(amount),
            type,
            category: type === 'pengeluaran' ? category : null,
        }

        if (editId) {
            await update(editId, data)
        } else {
            await addTrasaction(data)
        }

        resetForm()
        setIsDialogOpen(false)
        const updated = await getTransaction()
        setTransaction(updated)
    }

    const handleEdit = (item: any) => {
        setEditId(item.id)
        setTitle(item.title)
        setAmount(item.amount.toString())
        setType(item.type)
        setCategory(item.category || '')
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: string) => {
        await Delete(id)
        const updated = await getTransaction()
        setTransaction(updated)
    }

    return (
        <ProtectedRoute>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {/* Kiri: Transaksi dan form */}
                <div className="md:col-span-2 space-y-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Transactions</h1>
                        <Dialog
                            open={isDialogOpen}
                            onOpenChange={(open) => {
                                if (!open) resetForm()
                                setIsDialogOpen(open)
                            }}
                        >
                            <DialogTrigger asChild>
                                <Button className="text-sm px-5 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">{editId ? 'Edit' : 'Add'}</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{editId ? 'Edit Transaction' : 'Add New Transaction'}</DialogTitle>
                                    <DialogDescription>{editId ? 'Ubah data transaksi di bawah ini.' : 'Masukkan data transaksi di sini.'}</DialogDescription>
                                </DialogHeader>

                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul transaksi" className="w-full p-2 border rounded-md" />
                                <input
                                    type="text"
                                    value={amount ? `Rp ${parseInt(amount).toLocaleString('id-ID')}` : ''}
                                    onChange={(e) => {
                                        const raw = e.target.value.replace(/[^0-9]/g, '')
                                        setAmount(raw)
                                    }}
                                    placeholder="Jumlah"
                                    className="w-full p-2 border rounded-md mt-2"
                                    inputMode="numeric"
                                />
                                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border rounded-md mt-2">
                                    <option value="pendapatan">Pendapatan</option>
                                    <option value="pengeluaran">Pengeluaran</option>
                                </select>
                                {type === 'pengeluaran' && (
                                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded-md mt-2">
                                        <option value="">Pilih Kategori</option>
                                        <option value="konsumtif">Konsumtif</option>
                                        <option value="pengeluaran wajib">Pengeluaran Wajib</option>
                                        <option value="hiburan">Hiburan</option>
                                    </select>
                                )}

                                <Button className="mt-4 w-full" onClick={handleSave}>
                                    {editId ? 'Update' : 'Simpan'}
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {transaction.map((item) => (
                            <div key={item.id} className="rounded-2xl border p-4 shadow-sm bg-white flex flex-col gap-3">
                                <div className="flex flex-col">
                                    <div className="font-semibold text-lg">{item.title}</div>
                                    <div className="text-sm text-gray-500">
                                        {item.type} - Rp{item.amount.toLocaleString('id-ID')}
                                    </div>
                                    {item.type === 'pengeluaran' && <div className="text-xs text-red-500">Kategori: {item.category}</div>}
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <Button onClick={() => handleEdit(item)} className="text-sm px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDelete(item.id)} className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <TransactionChart transaction={transaction} />
            </section>
        </ProtectedRoute>
    )
}
