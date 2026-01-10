import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        // Si c'est l'erreur "removeChild", on peut tenter de recharger la page automatiquement une fois ?
        if (error.message.includes("removeChild")) {
            console.warn("Detected Google Translate DOM conflict.");
        }
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-6">
                    <div className="max-w-md text-center">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Oups ! Une erreur d'affichage est survenue.</h2>
                        <p className="text-gray-400 mb-6">
                            Cela arrive parfois à cause des extensions de traduction automatique ou d'un conflit de mise à jour.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors"
                        >
                            Recharger la page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
