// src/app/layout.server.tsx
export const metadata = {
    title: 'MyApp',
    description: 'My awesome Next.js app with shadcn/ui',
}

// Server-side layout tanpa hooks
export default function LayoutServer({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
