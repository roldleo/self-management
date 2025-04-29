// src/app/layout.tsx
import LayoutServer, { metadata } from './layout.server'
import LayoutClient from './layout.client'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutServer>
            <LayoutClient>{children}</LayoutClient>
        </LayoutServer>
    )
}
