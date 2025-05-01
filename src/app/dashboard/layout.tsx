import { ReactNode } from 'react'
import { ProtectedRoute } from '@/components/protectedRoute'
import DashboardLayout from '@/components/DashboardLayout'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DashboardLayout>
            <ProtectedRoute>
                <div className="flex min-h-screen">
                    {/* Main content */}
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </ProtectedRoute>
        </DashboardLayout>
    )
}
