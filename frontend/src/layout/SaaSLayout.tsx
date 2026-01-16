import { Outlet } from 'react-router-dom';
import SaaSHeader from '../components/layout/SaaSHeader';
import SaaSFooter from '../components/layout/SaaSFooter';

export default function SaaSLayout() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-50 font-sans transition-colors duration-300 flex flex-col">
            <SaaSHeader />

            {/* Main Content Area (Pushes Footer down) */}
            <main className="flex-1 pt-20">
                {/* pt-20 to account for fixed header height */}
                <Outlet />
            </main>

            <SaaSFooter />
        </div>
    );
}
