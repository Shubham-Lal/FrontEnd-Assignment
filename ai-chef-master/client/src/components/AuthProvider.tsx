import { createContext, PropsWithChildren, useState } from 'react';
import { Auth } from '../types/Auth';

export const AuthContext = createContext<Auth>({
    user: {
        id: "" || null,
        username: "" || null,
        password: "" || null
    },
    setUser: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { }
});

type AuthProviderProps = PropsWithChildren;

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<Auth["user"]>({
        id: null,
        username: null,
        password: null
    });
    const [isAuthenticated, setIsAuthenticated] = useState<Auth["isAuthenticated"]>(false);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;