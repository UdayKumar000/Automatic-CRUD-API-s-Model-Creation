import React, { useState } from 'react'
import { createContext } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    return (
        <div>
            <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider;
