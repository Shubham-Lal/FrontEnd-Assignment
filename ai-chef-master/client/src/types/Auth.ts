import { Dispatch, SetStateAction } from "react";

export type Auth = {
    user: {
        id: string | null
        username: string | null
    }
    setUser: React.Dispatch<React.SetStateAction<{
        id: string | null
        username: string | null
    }>>
    isAuthenticating: boolean
    setIsAuthenticating: Dispatch<SetStateAction<boolean>>
    isAuthenticated: boolean
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
};