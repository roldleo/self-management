'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar for desktop */}
            <aside className="hidden md:flex md:w-64 bg-gray-100 border-r p-4 flex-col">
                <NavLinks />
            </aside>

            {/* Sidebar for mobile */}
            <div className="md:hidden p-4 border-b">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm">
                            <Menu className="w-4 h-4 mr-2" /> Menu
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                        <h2 className="text-xl font-bold mb-4">My Dashboard</h2>
                        <NavLinks />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main content */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}

function NavLinks() {
    return (
        <nav className="flex flex-col gap-3">
            <Link href="/dashboard" className="hover:underline">
                🏠 Dashboard
            </Link>
            <Link href="/dashboard/todos" className="hover:underline">
                ✅ To-Do List
            </Link>
            <Link href="/dashboard/finances" className="hover:underline">
                💸 Keuangan
            </Link>
            <Link href="/dashboard/profile" className="hover:underline">
                👤 Profil
            </Link>
        </nav>
    )
}
