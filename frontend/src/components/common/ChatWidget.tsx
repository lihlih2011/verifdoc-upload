import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send } from 'lucide-react';
import axios from 'axios';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        { text: "Bonjour ! Je suis l'assistant virtuel. Comment puis-je vous aider ?", isUser: false }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
        setLoading(true);

        try {
            // Use relative URL properly handled by proxy in dev, or full url in prod
            // Assuming API_URL is needed if outside of dashboard context or just use /api/
            // Note: In prod, /api is proxied. locally too.
            const res = await axios.post(`/api/support/chat`, { message: userMsg });

            const botResponse = res.data.answer || "Désolé, je n'ai pas compris.";
            setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "Erreur de connexion au cerveau IA.", isUser: false }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4 font-sans">

            {/* CHAT WINDOW */}
            {isOpen && (
                <div className="w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 origin-bottom-right">

                    {/* Header */}
                    <div className="bg-gray-900 p-4 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                AI
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-sm">Assistant Tech</h4>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                                    <span className="text-gray-400 text-xs">Intelligence Active</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors bg-white/5 p-1 rounded-full hover:bg-white/20"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                                {!msg.isUser && (
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0 mr-2 mt-1" />
                                )}
                                <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm max-w-[85%]
                                    ${msg.isUser
                                        ? 'bg-blue-600 text-white rounded-tr-none'
                                        : 'bg-white text-gray-700 border border-gray-200 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex gap-1 items-center">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer */}
                    <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:border-blue-500/50 focus-within:bg-blue-50/30 transition-all">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Posez une question..."
                                className="flex-1 bg-transparent text-sm outline-none px-2 text-gray-700 placeholder-gray-400"
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg transition-colors shadow-md shadow-blue-600/20"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="text-center mt-2 flex justify-center items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                            <span className="text-[10px] text-gray-400">Propulsé par</span>
                            <span className="text-[10px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">VerifDoc Neural Engine</span>
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
