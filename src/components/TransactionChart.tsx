'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const getFilteredData = (data: any[], filter: string) => {
    const now = new Date()
    return data.filter((item) => {
        const date = new Date(item.created_at)
        if (filter === 'hari') {
            return date.toDateString() === now.toDateString()
        } else if (filter === 'minggu') {
            const startOfWeek = new Date(now)
            startOfWeek.setDate(now.getDate() - now.getDay())
            return date >= startOfWeek && date <= now
        } else if (filter === 'bulan') {
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
        }
        return true
    })
}

export default function TransactionChart({ transaction }: { transaction: any[] }) {
    const [filter, setFilter] = useState('hari')
    const [chartData, setChartData] = useState([
        { name: 'Pemasukan', total: 0 },
        { name: 'Pengeluaran', total: 0 },
    ])

    useEffect(() => {
        const filtered = getFilteredData(transaction, filter)

        const pemasukan = filtered.filter((item) => item.type === 'pendapatan').reduce((acc, item) => acc + item.amount, 0)

        const pengeluaran = filtered.filter((item) => item.type === 'pengeluaran').reduce((acc, item) => acc + item.amount, 0)

        setChartData([
            { name: 'Pemasukan', total: pemasukan },
            { name: 'Pengeluaran', total: pengeluaran },
        ])
    }, [transaction, filter])

    return (
        <div className="sticky top-4 bg-white p-4 rounded-xl shadow-md h-fit">
            <div className="mb-4">
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded-md w-full">
                    <option value="hari">Hari Ini</option>
                    <option value="minggu">Minggu Ini</option>
                    <option value="bulan">Bulan Ini</option>
                </select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`} />
                    <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
