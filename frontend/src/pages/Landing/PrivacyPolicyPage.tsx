
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';

const PrivacyPolicyPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30 text-slate-800">
            {/* NAVBAR SIMPLE */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src="/images/verifdoc-logo-real.png" alt="VerifDoc" className="h-8 w-auto grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" />
                        <span className="font-bold text-slate-900 tracking-tight">VERIFDOC</span>
                    </Link>
                    <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                        <ArrowLeft size={16} /> Retour
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

                    {/* HEADER */}
                    <div className="bg-slate-900 text-white p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10 pattern-grid-lg opacity-20"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400 backdrop-blur-sm border border-white/10">
                                <Lock size={32} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">Politique de Confidentialité</h1>
                            <p className="text-slate-400 text-sm uppercase tracking-widest font-mono">
                                Conforme au Règlement (UE) 2016/679 (RGPD)
                            </p>
                            <p className="mt-4 text-slate-500 text-xs">
                                Dernière mise à jour : 06 Janvier 2026
                            </p>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-8 md:p-12 space-y-12">

                        {/* INTRODUCTION */}
                        <div className="prose prose-slate max-w-none">
                            <p className="lead text-lg text-slate-600 border-l-4 border-blue-500 pl-4 py-2 bg-slate-50 rounded-r-lg">
                                La présente Politique de Confidentialité a pour objet d’informer toute personne accédant à la plateforme VerifDoc des modalités selon lesquelles ses données personnelles sont collectées, traitées, conservées, sécurisées et supprimées dans le cadre de l’utilisation des services proposés.
                            </p>
                        </div>

                        {/* ARTICLES */}
                        <div className="space-y-8">
                            <Section title="ARTICLE 1 – OBJET DE LA POLITIQUE">
                                <p>La présente Politique de Confidentialité a pour objet d’informer toute personne accédant à la plateforme VerifDoc des modalités selon lesquelles ses données personnelles sont collectées, traitées, conservées, sécurisées et supprimées dans le cadre de l’utilisation des services proposés.</p>
                            </Section>

                            <Section title="ARTICLE 2 – CHAMP D’APPLICATION TERRITORIAL">
                                <p>La présente Politique s’applique à tout utilisateur accédant aux services VerifDoc dès lors que ceux-ci sont accessibles depuis le territoire de l’Union européenne, indépendamment du lieu d’établissement du Client.</p>
                            </Section>

                            <Section title="ARTICLE 3 – IDENTITÉ DU RESPONSABLE DU TRAITEMENT">
                                <p className="mb-4">Le responsable du traitement est :</p>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm space-y-1 mb-4">
                                    <p className="font-bold text-slate-900">VerifDoc</p>
                                    <p>Exploité par Xolo Go OÜ – Chawki Fares</p>
                                    <p>Société immatriculée en Estonie – Registre n° 14717109</p>
                                    <p>TVA intracommunautaire : EE102156920</p>
                                </div>
                                <p className="mb-4">Hébergé chez :</p>
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-sm space-y-1">
                                    <p className="font-bold text-slate-900">OVH SAS</p>
                                    <p>Capital de 50 000 000 €</p>
                                    <p>RCS Lille Métropole 424 761 419 00045</p>
                                    <p>Siège social : 2 rue Kellermann - 59100 Roubaix - France</p>
                                </div>
                            </Section>

                            <Section title="ARTICLE 4 – RÉPARTITION DES RÔLES RGPD">
                                <p>Dans le cadre des documents soumis à analyse, VerifDoc agit en qualité de <strong>sous-traitant</strong> au sens du RGPD.</p>
                                <p>Le Client agit en qualité de <strong>responsable de traitement</strong>, demeurant seul responsable de la licéité des données transmises.</p>
                            </Section>

                            <Section title="ARTICLE 5 – PRINCIPES GÉNÉRAUX DE TRAITEMENT">
                                <p>VerifDoc traite les données personnelles dans le strict respect des principes énoncés à l’article 5 du RGPD, notamment la minimisation, la limitation de finalité, la proportionnalité et la confidentialité.</p>
                            </Section>

                            <Section title="ARTICLE 6 – CATÉGORIES DE DONNÉES TRAITÉES">
                                <p>Les données susceptibles d’être traitées comprennent :</p>
                                <ul className="list-disc pl-5 space-y-1 mt-2">
                                    <li>Données d’identification (nom, email, société)</li>
                                    <li>Données techniques (IP, logs, sécurité)</li>
                                    <li>Données contenues dans les documents transmis par le Client, sans que VerifDoc n’en détermine le contenu.</li>
                                </ul>
                            </Section>

                            <Section title="ARTICLE 7 – LICÉITÉ DES DONNÉES TRANSMISES">
                                <p>Le Client garantit disposer de toutes les bases légales nécessaires à la transmission et au traitement des données contenues dans les documents soumis à VerifDoc.</p>
                            </Section>

                            <Section title="ARTICLE 8 – FINALITÉS STRICTEMENT DÉTERMINÉES">
                                <p>Les données personnelles sont traitées exclusivement aux fins :</p>
                                <ul className="list-disc pl-5 space-y-1 mt-2">
                                    <li>d’exécution du service</li>
                                    <li>d’analyse documentaire automatisée</li>
                                    <li>de sécurité et prévention des abus</li>
                                    <li>de respect des obligations légales</li>
                                </ul>
                            </Section>

                            <Section title="ARTICLE 9 – ABSENCE DE DÉCISION AUTOMATISÉE">
                                <p>VerifDoc ne met en œuvre aucune décision automatisée produisant des effets juridiques ou significatifs au sens de l’article 22 du RGPD.</p>
                            </Section>

                            <Section title="ARTICLE 10 – CARACTÈRE NON PROBANT DES RÉSULTATS">
                                <p>Les résultats fournis constituent une aide à la prise de décision et ne sauraient constituer une preuve juridique, un avis légal ou une expertise humaine.</p>
                            </Section>

                            <Section title="ARTICLE 11 – DONNÉES SENSIBLES">
                                <p>Le Client s’engage à ne transmettre des données sensibles (art. 9 RGPD) que si leur traitement est strictement nécessaire et légalement autorisé.</p>
                            </Section>

                            <Section title="ARTICLE 12 – DURÉE DE CONSERVATION">
                                <p>Les documents soumis à analyse sont automatiquement supprimés dans un délai maximal de <strong>48 heures</strong>, sauf obligation légale contraire.</p>
                            </Section>

                            <Section title="ARTICLE 13 – ABSENCE DE RÉUTILISATION DES DONNÉES">
                                <p>Les documents et données analysés ne sont jamais utilisés pour entraîner, améliorer ou alimenter les modèles d’intelligence artificielle de VerifDoc sans accord écrit exprès du Client.</p>
                            </Section>

                            <Section title="ARTICLE 14 – SÉCURITÉ DES DONNÉES">
                                <p>VerifDoc met en œuvre des mesures techniques et organisationnelles appropriées afin d’assurer la sécurité des données, conformément à l’article 32 du RGPD, sans obligation de résultat.</p>
                            </Section>

                            <Section title="ARTICLE 15 – VIOLATION DE DONNÉES">
                                <p>En cas de violation de données personnelles, VerifDoc notifiera le Client conformément aux articles 33 et 34 du RGPD.</p>
                            </Section>

                            <Section title="ARTICLE 16 – DROITS DES PERSONNES CONCERNÉES">
                                <p>Les personnes concernées disposent des droits prévus par le RGPD (accès, rectification, effacement, limitation, opposition, portabilité).</p>
                            </Section>

                            <Section title="ARTICLE 17 – LIMITATION DE RESPONSABILITÉ">
                                <p>VerifDoc ne saurait être tenu responsable du contenu des documents analysés ni des décisions prises par le Client sur la base des résultats fournis.</p>
                            </Section>

                            <Section title="ARTICLE 18 – TRANSFERTS HORS UNION EUROPÉENNE">
                                <p>Tout transfert de données hors UE est encadré par des garanties conformes au RGPD.</p>
                            </Section>

                            <Section title="ARTICLE 19 – MODIFICATION DE LA POLITIQUE">
                                <p>La présente Politique peut être modifiée à tout moment afin de rester conforme aux évolutions légales, réglementaires ou techniques.</p>
                            </Section>

                            <Section title="ARTICLE 20 – DROIT APPLICABLE">
                                <p>La présente Politique est régie par le droit de l’Union européenne et le droit estonien.</p>
                            </Section>

                        </div>
                    </div>

                    {/* FOOTER OF PAGE */}
                    <div className="bg-slate-50 p-8 text-center border-t border-slate-100">
                        <Link to="/" className="text-blue-600 font-bold hover:underline">Retour à l'accueil</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
            {title}
        </h2>
        <div className="text-slate-600 leading-relaxed pl-4">
            {children}
        </div>
    </div>
);

export default PrivacyPolicyPage;
