import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles, ChevronRight, Minimize2 } from 'lucide-react';
import { findAnswer, QAItem } from '../../data/chatbotKnowledge';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type Message = {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    timestamp: Date;
    actionLink?: { text: string; url: string };
};

interface SmartChatbotProps {
    mode: 'sales' | 'support';
}

const SmartChatbot = ({ mode }: SmartChatbotProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial greeting
    useEffect(() => {
        if (messages.length === 0) {
            const greeting = mode === 'sales'
                ? "Bonjour ! Je suis l'assistant IA de VerifDoc. Je peux répondre à vos questions sur nos tarifs, la sécurité ou notre technologie. Comment puis-je vous aider ?"
                : "Bonjour ! Besoin d'aide technique ou d'une explication sur un rapport ? Je suis là pour vous.";

            setTimeout(() => {
                addMessage(greeting, 'bot');
            }, 1000);
        }
    }, [mode]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping, isOpen]);

    const addMessage = (text: string, sender: 'bot' | 'user', actionLink?: { text: string; url: string }) => {
        setMessages(prev => [...prev, {
            id: Date.now().toString() + Math.random(),
            text,
            sender,
            timestamp: new Date(),
            actionLink
        }]);
    };

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userText = inputValue;
        setInputValue('');
        addMessage(userText, 'user');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const answer = findAnswer(userText, mode);
            setIsTyping(false);

            if (answer) {
                addMessage(answer.answer, 'bot', answer.actionLink);
            } else {
                addMessage(
                    mode === 'sales'
                        ? "Je n'ai pas la réponse exacte, mais notre équipe commerciale serait ravie de vous en dire plus. Voulez-vous prendre rendez-vous ?"
                        : "Je ne trouve pas de réponse dans ma base. Voulez-vous ouvrir un ticket support ?",
                    'bot',
                    mode === 'sales' ? { text: "Réserver une démo", url: "/demo" } : { text: "Ouvrir un ticket", url: "/dashboard/tickets" }
                );
            }
        }, 1000 + Math.random() * 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <>
            {/* FLOATING TRIGGER BUTTON */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50 group border border-white/20"
                    >
                        <MessageSquare size={24} className="fill-current group-hover:rotate-12 transition-transform duration-300" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* CHAT WINDOW */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "fixed z-50 bg-white/90 backdrop-blur-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col transition-all duration-300",
                            isMinimized
                                ? "bottom-6 right-6 w-72 h-16 rounded-2xl"
                                : "bottom-6 right-6 w-[380px] h-[600px] rounded-3xl"
                        )}
                    >
                        {/* HEADER */}
                        <div
                            className="bg-slate-900 p-4 flex items-center justify-between cursor-pointer select-none"
                            onClick={() => !isMinimized && setIsMinimized(true)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center relative">
                                    <Bot size={20} className="text-white" />
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">VerifDoc AI</h3>
                                    <p className="text-blue-400 text-xs flex items-center gap-1">
                                        <Sparkles size={10} /> En ligne
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                                {isMinimized ? (
                                    <button onClick={(e) => { e.stopPropagation(); setIsMinimized(false); }} className="hover:text-white p-1">
                                        <ChevronRight className="-rotate-90" size={18} />
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }} className="hover:text-white p-1">
                                            <Minimize2 size={16} />
                                        </button>
                                        <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="hover:text-white p-1">
                                            <X size={18} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* MESSAGES AREA */}
                        {!isMinimized && (
                            <>
                                <div className="flex-1 bg-slate-50 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
                                    <div className="text-center text-xs text-slate-400 my-4">
                                        Aujourd'hui, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>

                                    {messages.map((msg) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={msg.id}
                                            className={cn(
                                                "max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm",
                                                msg.sender === 'user'
                                                    ? "bg-blue-600 text-white ml-auto rounded-tr-sm"
                                                    : "bg-white text-slate-700 mr-auto rounded-tl-sm border border-slate-100"
                                            )}
                                        >
                                            <p>{msg.text}</p>
                                            {msg.actionLink && (
                                                <a
                                                    href={msg.actionLink.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 mt-2 text-xs font-bold uppercase tracking-wide px-3 py-1.5 bg-black/5 rounded-full hover:bg-black/10 transition-colors"
                                                >
                                                    {msg.actionLink.text} <ChevronRight size={12} />
                                                </a>
                                            )}
                                            <span className="text-[10px] opacity-50 block mt-1 text-right">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </motion.div>
                                    ))}

                                    {isTyping && (
                                        <div className="flex gap-1 items-center p-3 bg-white w-fit rounded-2xl rounded-tl-sm border border-slate-100">
                                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* INPUT AREA */}
                                <div className="p-3 bg-white border-t border-slate-100">
                                    <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                                        <input
                                            type="text"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            placeholder="Posez votre question..."
                                            className="bg-transparent flex-1 outline-none text-sm text-slate-800 placeholder:text-slate-400"
                                        />
                                        <button
                                            onClick={handleSend}
                                            disabled={!inputValue.trim()}
                                            className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm"
                                        >
                                            <Send size={14} className={inputValue.trim() ? "translate-x-0.5" : ""} />
                                        </button>
                                    </div>
                                    <div className="text-center mt-2">
                                        <span className="text-[10px] text-slate-300 font-medium">Powered by VerifDoc AI Engine</span>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default SmartChatbot;
