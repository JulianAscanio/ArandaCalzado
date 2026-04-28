import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";

export default function AppLayout({ children, title = "Panel" }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="app-shell">
            <Sidebar isOpen={sidebarOpen} />

            <main className={ `app-main ${sidebarOpen ? "expanded" : ""}` }>
                <Topbar title={title} onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
                <div className="app-content">
                    {children}
                </div>
            </main>
        </div>
    );
}