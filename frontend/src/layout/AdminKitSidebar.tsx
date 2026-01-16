import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    Shield,
    CreditCard,
    HelpCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminKitSidebar() {
    const location = useLocation();
    const { t } = useTranslation();

    const isActive = (path: string) => location.pathname === path;

    // AdminKit Sidebar Style: Dark Blue Background #222e3c
    return (
        <nav className="min-h-screen w-[260px] bg-[#222e3c] text-[#e9ecef] flex flex-col shrink-0 transition-all duration-300 z-20">
            {/* Brand */}
            <div className="h-16 flex items-center px-6 text-xl font-semibold tracking-wide text-white">
                <span className="text-blue-400 mr-2">Verif</span>Doc
            </div>

            <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 mb-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Pages
                </div>

                <ul className="space-y-1">
                    <li>
                        <Link
                            to="/admin"
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors ${isActive('/admin')
                                    ? 'bg-blue-600/20 text-white border-l-4 border-blue-500' // Active State
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/users"
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors ${isActive('/admin/users')
                                    ? 'bg-blue-600/20 text-white border-l-4 border-blue-500'
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Users size={18} />
                            <span>Utilisateurs</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/documents"
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors ${isActive('/admin/documents')
                                    ? 'bg-blue-600/20 text-white border-l-4 border-blue-500'
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <FileText size={18} />
                            <span>Documents</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/billing"
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors ${isActive('/admin/billing')
                                    ? 'bg-blue-600/20 text-white border-l-4 border-blue-500'
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <CreditCard size={18} />
                            <span>Facturation</span>
                        </Link>
                    </li>
                </ul>

                <div className="px-4 mt-8 mb-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Administration
                </div>

                <ul className="space-y-1">
                    <li>
                        <Link
                            to="/admin/security"
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors ${isActive('/admin/security')
                                    ? 'bg-blue-600/20 text-white border-l-4 border-blue-500'
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Shield size={18} />
                            <span>Sécurité</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/support"
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors ${isActive('/admin/support')
                                    ? 'bg-blue-600/20 text-white border-l-4 border-blue-500'
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <HelpCircle size={18} />
                            <span>Support</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/settings"
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-sm transition-colors ${isActive('/admin/settings')
                                    ? 'bg-blue-600/20 text-white border-l-4 border-blue-500'
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Settings size={18} />
                            <span>Paramètres</span>
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Footer Profile Mini */}
            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 text-slate-300 hover:text-white w-full">
                    <LogOut size={18} />
                    <span>Déconnexion</span>
                </button>
            </div>
        </nav>
    );
}
