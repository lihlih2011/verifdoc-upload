
import { useState } from 'react';

const faqs = [
    {
        question: "VerifDoc est-il conforme au RGPD ?",
        answer: "Oui, absolument. Toutes les données sont hébergées en France (SecNumCloud) et nous appliquons une politique de rétention stricte. Vos documents ne servent jamais à entraîner nos modèles sans votre consentement explicite."
    },
    {
        question: "Quelle est la précision de la détection ?",
        answer: "Notre moteur forensique atteint un taux de précision de 99.8% sur les documents administratifs français (CNI, Passeport, Bulletin de paie, Avis d'impôt, Justificatif de domicile)."
    },
    {
        question: "Puis-je intégrer VerifDoc via API ?",
        answer: "Tout à fait. Nous sommes 'API First'. Notre documentation Swagger est complète et vous pouvez intégrer nos endpoints de détection directement dans vos parcours d'onboarding utilisateur."
    },
    {
        question: "Combien de temps prend une analyse ?",
        answer: "L'analyse standard prend moins de 3 secondes par document. Pour les dossiers complets (3-5 documents), le verdict global est rendu en moins de 10 secondes."
    },
];

export default function Faq() {
    return (
        <section className="relative py-24 bg-gray-950/30 border-t border-gray-800">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="mx-auto max-w-3xl text-center pb-12">
                    <h2 className="text-3xl font-bold font-nacelle mb-4 text-white">Questions Fréquentes</h2>
                    <p className="text-gray-400">Tout ce que vous devez savoir avant de commencer.</p>
                </div>

                <div className="mx-auto max-w-3xl divide-y divide-gray-800">
                    {faqs.map((faq, index) => (
                        <FaqItem key={index} question={faq.question} answer={faq.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="py-6">
            <button
                className="flex w-full items-center justify-between text-left text-lg font-medium text-gray-200 transition-colors hover:text-primary-400"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <span className="ml-6 flex h-7 w-7 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors group-hover:bg-primary-500/20 group-hover:text-primary-500">
                    <svg className={`h-4 w-4 transform transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
            >
                <p className="text-gray-400 leading-relaxed pr-10">{answer}</p>
            </div>
        </div>
    );
}
