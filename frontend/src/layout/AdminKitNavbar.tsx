import { Menu, Bell, Search, User } from 'lucide-react';
import { useState } from 'react';

export default function AdminKitNavbar({ toggleSidebar }: { toggleSidebar: () => void }) {
    return (
        <nav className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shadow-sm sticky top-0 z-10">

            {/* Left: Toggle & Search */}
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="text-slate-500 hover:text-blue-600 lg:hidden">
                    <Menu size={24} />
                </button>

                {/* Search Input (AdminKit style) */}
                <div className="hidden md:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-md text-slate-500 text-sm">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="bg-transparent border-none outline-none w-48 text-slate-700 placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">

                {/* Notifications */}
                <button className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                {/* User Dropdown Trigger */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-semibold text-slate-700">Admin User</div>
                        <div className="text-xs text-slate-500">Administrateur</div>
                    </div>
                    <div className="h-9 w-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200">
                        <User size={18} />
                    </div>
                </div>
            </div>
        </nav>
    );
}
