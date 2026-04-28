import { useState } from "react";
import { Link } from "react-router-dom";
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
            setError(err.message || "Error al iniciar sesion");
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-panel card">
                <div className="auth-header">
                    <div className="brand-logo">AC</div>
                    <h1>Aranda Calzado</h1>
                    <p>Inicia sesion para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-alert auth-alert--error">{error}</div>}

                    <div className="auth-field">
                        <label htmlFor="login-username">Usuario</label>
                        <input
                            id="login-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="auth-input"
                            placeholder="Escribe tu usuario"
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="login-password">Contrasena</label>
                        <input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input"
                            placeholder="Tu contrasena"
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                        {loading ? "Cargando..." : "Ingresar"}
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/olvide-contrasena" className="auth-link">
                        Olvide mi contrasena
                    </Link>
                </div>
            </div>
        </div>
    );
}
