import { createContext, PropsWithChildren, useState } from 'react';
import { Auth } from '../types/Auth';

export const AuthContext = createContext<Auth>({
    user: {
        id: "" || null,
        username: "" || null
    },
    setUser: () => { },
    isAuthenticating: true,
    setIsAuthenticating: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => { }
});

type AuthProviderProps = PropsWithChildren;

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<Auth["user"]>({
        id: null,
        username: null
    });
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<Auth["isAuthenticated"]>(false);

    return (
        <AuthContext.Provider value={{
            user, setUser,
            isAuthenticating, setIsAuthenticating,
            isAuthenticated, setIsAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;