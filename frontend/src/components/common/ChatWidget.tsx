import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">

            {/* CHAT WINDOW */}
            {isOpen && (
                <div className="w-[350px] h-[450px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 origin-bottom-right">

                    {/* Header */}
                    <div className="bg-gray-900 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                                VD
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">VerifDoc Assistant</h4>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    <span className="text-gray-400 text-xs">En ligne</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
                        <div className="flex items-start gap-2 max-w-[85%]">
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0" />
                            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-sm text-gray-600">
                                {t('chatbot.welcome')}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-3 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:border-blue-500/50 transition-colors">
                            <input
                                type="text"
                                placeholder={t('chatbot.placeholder')}
                                className="flex-1 bg-transparent text-sm outline-none px-2 text-gray-700 placeholder-gray-400"
                            />
                            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-gray-400">Powered by VerifDoc AI</p>
                        </div>
                    </div>
                </div>
            )}

            {/* TOGGLE BUTTON */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg shadow-blue-600/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95
          ${isOpen ? 'bg-gray-700 text-white rotate-90' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}
        `}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
            </button>

        </div>
    );
}
