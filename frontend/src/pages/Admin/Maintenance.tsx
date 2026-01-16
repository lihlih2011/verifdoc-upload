import { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import { Switch } from '@headlessui/react';
import { toast } from 'sonner';

export default function Maintenance() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        adminService.getMaintenanceFlag().then(setEnabled).catch(console.error);
    }, []);

    const toggle = async () => {
        const newVal = !enabled;
        try {
            await adminService.setMaintenanceFlag(newVal);
            setEnabled(newVal);
            toast.success(`Mode maintenance ${newVal ? 'activé' : 'désactivé'}`);
        } catch (e) {
            toast.error("Erreur lors du changement de mode maintenance");
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-700">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Mode Maintenance</h2>
                <Switch
                    checked={enabled}
                    onChange={toggle}
                    className={`${enabled ? 'bg-red-600' : 'bg-slate-600'
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                    <span
                        className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                </Switch>
            </div>

            <p className="mt-2 text-sm text-slate-400">
                Lorsque le mode maintenance est activé, les utilisateurs voient une page d’attente,
                mais les administrateurs conservent l’accès.
            </p>
        </div>
    );
}
