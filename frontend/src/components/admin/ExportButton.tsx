import { adminService } from '../../services/adminService';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

export default function ExportButton() {
    const handleExport = async () => {
        try {
            await adminService.exportUsers();
            toast.success('Export CSV lancé');
        } catch (e) {
            toast.error('Erreur lors de l’export CSV');
            console.error(e);
        }
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
            <Download size={18} />
            Exporter les utilisateurs (CSV)
        </button>
    );
}
