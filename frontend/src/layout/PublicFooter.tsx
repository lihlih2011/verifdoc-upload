import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, ShieldCheck } from 'lucide-react';

export const PublicFooter = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-white dark:bg-[#020617] text-slate-600 dark:text-slate-400 text-sm border-t border-slate-100 dark:border-white/5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1">
                        <div className="flex items-center mb-6">
                            <img
                                src="/images/verifdoc-logo-2026.png"
                                alt="VerifDoc"
                                className="h-16 w-auto transition-all hover:brightness-110 dark:brightness-0 dark:invert"
                            />
                        </div>
                        <p className="mb-6 leading-relaxed text-slate-500 dark:text-slate-400">
                            Vérifiez vos documents avec l'IA. Détectez instantanément les faux documents grâce à notre technologie d'IA avancée.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://twitter.com/verifdoc" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="https://linkedin.com/company/verifdoc" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">{t('footer.product')}</h4>
                        <ul className="space-y-3">
                            <li><a href="/#how-it-works" className="hover:text-blue-600 transition-colors">{t('footer.how_it_works')}</a></li>
                            <li><a href="/#pricing" className="hover:text-blue-600 transition-colors">{t('footer.pricing')}</a></li>
                            <li><a href="/#testimonials" className="hover:text-blue-600 transition-colors">{t('footer.testimonials')}</a></li>
                            <li><Link to="/contact" className="hover:text-blue-600 transition-colors">{t('nav.book_demo')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">{t('footer.company')}</h4>
                        <ul className="space-y-3">
                            <li><Link to="/company" className="hover:text-blue-600 transition-colors">{t('footer.about')}</Link></li>
                            <li><Link to="/join-us" className="hover:text-blue-600 transition-colors">Carrières <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold ml-1">HOT</span></Link></li>
                            <li><Link to="/contact" className="hover:text-blue-600 transition-colors">{t('footer.contact')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider text-xs">{t('footer.legal')}</h4>
                        <ul className="space-y-3">
                            <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">{t('footer.privacy')}</Link></li>
                            <li><Link to="/terms" className="hover:text-blue-600 transition-colors">{t('footer.terms')}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-100 dark:border-white/5 mt-16 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                        <div className="flex gap-8 text-slate-500 font-medium ml-auto mr-auto md:ml-0 md:mr-0 items-center flex-wrap justify-center md:justify-start">
                            <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-blue-600" /> {t('footer.iso')}</div>
                            <div className="flex items-center gap-2">
                                <img src="/images/rgpd_logo.png" alt="RGPD" className="h-8 w-auto" />
                                <span className="font-bold text-blue-900 dark:text-blue-400 text-xs uppercase tracking-wide">{t('footer.rgpd')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <img src="/images/ai_act_logo.png" alt="AI Act" className="h-6 w-auto" />
                                <span className="font-bold text-blue-900 dark:text-blue-400 text-xs uppercase tracking-wide">{t('footer.ai_act')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-[10px] text-slate-400 leading-tight max-w-5xl mx-auto text-center border-t border-slate-50 dark:border-white/5 pt-8">
                        <p className="mb-2">
                            {t('footer.disclaimer')}
                        </p>
                        <div className="flex justify-center gap-4 mb-2 font-medium">
                            <Link to="/terms" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">{t('footer.terms')}</Link>
                            <span>&bull;</span>
                            <Link to="/privacy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">{t('footer.privacy')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
