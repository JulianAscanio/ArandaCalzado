import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./login.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(username, password);
        } catch (err) {
            setError(err.message || "Error al iniciar sesión");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card card">
                <div className="login-header">
                    <div className="brand-logo">AC</div>
                    <h2>Aranda Calzado</h2>
                    <p>Inicia sesión para continuar</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="login-error">{error}</div>}
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="search-bar__input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="search-bar__input"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary login-btn" disabled={loading}>
                        {loading ? "Cargando..." : "Ingresar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
