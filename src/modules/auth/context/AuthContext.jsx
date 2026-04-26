import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("access_token"));
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            localStorage.setItem("access_token", token);
        } else {
            localStorage.removeItem("access_token");
        }
    }, [token]);

    const login = async (username, password) => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Credenciales inválidas");
            }

            const data = await response.json();
            setToken(data.access);
            navigate("/inventario");
        } catch (error) {
            console.error("Error en login:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
