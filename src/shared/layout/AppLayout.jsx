import Sidebar from "./Sidebar";
import Topbar from "./TopBar";

export default function AppLayout({ children, title = "Panel" }) {
    return (
        <div className="app-shell">
            <Sidebar />
            <main className="app-main">
                <Topbar title={title} />
                <div className="app-content">
                    {children}
                </div>
            </main>
        </div>
    );
}