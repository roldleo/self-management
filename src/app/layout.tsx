// src/app/layout.tsx
import LayoutServer from './layout.server'
import LayoutClient from './layout.client'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutServer>
            <LayoutClient>{children}</LayoutClient>
        </LayoutServer>
    )
}
