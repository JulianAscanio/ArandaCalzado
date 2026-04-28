import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./login.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { requestPasswordReset, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!email && !username) {
            setError("Ingresa al menos correo o usuario");
            return;
        }

        try {
            await requestPasswordReset({ email, username });
            setSuccess("Si los datos son correctos, recibiras instrucciones para recuperar tu contrasena.");
            setEmail("");
            setUsername("");
        } catch (err) {
            setError(err.message || "No se pudo enviar la solicitud");
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-panel card">
                <div className="auth-links auth-links--single">
                    <Link to="/login" className="auth-link auth-link--strong">
                        Volver
                    </Link>
                </div>
                <div className="auth-header">
                    <div className="brand-logo">AC</div>
                    <h1>Recuperar contrasena</h1>
                    <p>Te ayudamos a volver a entrar</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-alert auth-alert--error">{error}</div>}
                    {success && <div className="auth-alert auth-alert--success">{success}</div>}

                    <div className="auth-field">
                        <label htmlFor="forgot-email">Correo (recomendado)</label>
                        <input
                            id="forgot-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="auth-input"
                            placeholder="ejemplo@correo.com"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="forgot-username">Usuario (opcional)</label>
                        <input
                            id="forgot-username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="auth-input"
                            placeholder="Tu nombre de usuario"
                        />
                    </div>

                    <button type="submit" className="btn-primary auth-submit" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar solicitud"}
                    </button>
                </form>
            </div>
        </div>
    );
}
