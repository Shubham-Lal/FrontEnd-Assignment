import { Dispatch, SetStateAction } from "react";

export type Auth = {
    user: {
        id: string | null
        username: string | null
        password: string | null
    }
    setUser: React.Dispatch<React.SetStateAction<{
        id: string | null
        username: string | null
        password: string | null
    }>>
    isAuthenticated: boolean
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
};