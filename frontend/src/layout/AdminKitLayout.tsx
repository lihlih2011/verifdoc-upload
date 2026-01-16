import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminKitSidebar from './AdminKitSidebar';
import AdminKitNavbar from './AdminKitNavbar';

export default function AdminKitLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-[#f5f7fb] overflow-hidden font-sans">

            {/* Sidebar (Desktop: Static, Mobile: Absolute/Drawer) */}
            <div className={`${sidebarOpen ? 'w-[260px]' : 'w-0'} transition-all duration-300 overflow-hidden shrink-0 h-full relative`}>
                <AdminKitSidebar />
            </div>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Top Navbar */}
                <AdminKitNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                {/* Scrollable Page Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <Outlet />
                </main>

                {/* Simple Footer */}
                <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-sm text-slate-500">
                    <p>© 2024 VerifDoc. Tous droits réservés.</p>
                </footer>
            </div>

        </div>
    );
}
