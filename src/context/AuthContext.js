// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem('username') || '');

    useEffect(() => {
        if (username) {
            localStorage.setItem('username', username);
            setIsLoggedIn(true);
        }
    }, [username]); // Add username as a dependency

    const login = (username, accessToken) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('username', username);
        setIsLoggedIn(true)
        setUsername(username); // This will trigger the useEffect above
    };

    const logout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('access_token')
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
};
