import Header from "../../components/landing/ui/header";
import Footer from "../../components/landing/ui/footer";
import PageIllustration from "../../components/landing/page-illustration";

export default function CompanyPage() {
    return (
        <div className="flex min-h-screen flex-col overflow-hidden bg-gray-950 font-inter tracking-tight text-gray-200 antialiased">
            <PageIllustration />
            <Header />
            <main className="grow pt-20">
                <section className="relative">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6">
                        <div className="py-12 md:py-20">
                            {/* Section header */}
                            <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
                                <h1 className="h1 mb-4 font-nacelle text-4xl font-semibold text-white animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text text-transparent">
                                    Notre Mandat <span className="text-purple-500">Institutionnel</span>
                                </h1>
                                <p className="text-xl text-gray-400">
                                    VerifDoc agit en tant que Tiers de Confiance Numérique, dédié à la sécurisation des échanges économiques et à la préservation de l'intégrité financière.
                                </p>
                            </div>

                            {/* Content Blocks */}
                            <div className="space-y-12">
                                {/* Block 1: Mission */}
                                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                                    <div className="md:w-1/2">
                                        <div className="relative rounded-2xl bg-gray-900 border border-gray-800 p-8 text-white overflow-hidden group hover:border-purple-500/30 transition-colors duration-500">
                                            {/* Glow Effect */}
                                            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                                            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

                                            <h3 className="relative z-10 text-2xl font-bold mb-4 font-nacelle text-white">Garantir la Confiance</h3>
                                            <p className="relative z-10 text-gray-300 leading-relaxed">
                                                Dans un environnement numérique de plus en plus exposé aux tentatives de corruption documentaire, notre mission est de fournir aux institutions un cadre de vérification opposable, souverain et technologiquement neutre.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="md:w-1/2">
                                        <h3 className="text-2xl font-bold text-white mb-3 font-nacelle">Une Infrastructure Souveraine</h3>
                                        <p className="text-gray-400 mb-6 leading-relaxed">
                                            L'ensemble de nos protocoles de traitement est hébergé exclusivement sur le territoire national, garantissant une conformité totale avec le Règlement Général sur la Protection des Données (RGPD) et les normes SecNumCloud.
                                        </p>
                                        <ul className="space-y-4">
                                            <li className="flex items-center gap-3 text-gray-300 group">
                                                <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                                                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                                <span className="font-medium">Hébergement Certifié HDS/ISO 27001</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-gray-300 group">
                                                <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                                                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                                <span className="font-medium">Audits de sécurité semestriels</span>
                                            </li>
                                            <li className="flex items-center gap-3 text-gray-300 group">
                                                <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/50 transition-colors">
                                                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                                <span className="font-medium">Comité d'éthique indépendant</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
