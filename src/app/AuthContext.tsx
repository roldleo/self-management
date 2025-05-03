// context/AuthContext.tsx
'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

type AuthContextType = {
    displayName: string | null
    setDisplayName: (name: string | null) => void
    isAuthenticated: boolean
    setIsAuthenticated: (auth: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [displayName, setDisplayName] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    return <AuthContext.Provider value={{ displayName, setDisplayName, isAuthenticated, setIsAuthenticated }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
