export default function Topbar({ title, onToggleSidebar }) {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <button
                    className="hamburger-btn"
                    onClick={onToggleSidebar}
                    aria-label="Mostrar u ocultar barra lateral"
                    title="Mostrar u ocultar barra lateral"
                >
                    ☰
                </button>

                <div>
                    <h1>{title}</h1>
                    <p>Aranda Calzado</p>
                </div>
            </div>
        </header>
    )
}