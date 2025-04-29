import { ProtectedRoute } from '@/components/protectedRoute'

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
                <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
                <p className="text-gray-600">You are logged in!</p>
            </div>
        </ProtectedRoute>
    )
}
