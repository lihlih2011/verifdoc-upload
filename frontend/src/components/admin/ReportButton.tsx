import { adminService } from '../../services/adminService';
import { FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function ReportButton() {
    const generate = async () => {
        try {
            const blob = await adminService.generateMonthlyReport();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'monthly_report.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
            toast.success('Rapport PDF généré');
        } catch (e) {
            toast.error('Erreur lors de la génération du rapport');
            console.error(e);
        }
    };

    return (
        <button
            onClick={generate}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
            <FileText size={18} />
            Générer le rapport PDF
        </button>
    );
}
