'use client'

import { ProtectedRoute } from '@/components/protectedRoute'

export default function DashboardPage({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen">
                {/* Main content */}
                <main className="flex-1 p-6">
                    <h2 className="text-2xl font-bold mb-6">Self Management</h2>
                    <p>Aplikasi ini merupakan tugas final dari mata kuliah Pemrograman Web 2</p>
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    )
}
