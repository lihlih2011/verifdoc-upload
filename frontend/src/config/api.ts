
// Configuration centralisée de l'API
// Si une variable d'environnement VITE_API_URL est définie, on l'utilise.
// Sinon, si on est en localhost, on utilise localhost:8000.
// Sinon, on peut mettre une URL de prod par défaut.

const getApiUrl = () => {
    // 1. Priority: Environment Variable (Set this in Vercel Dashboard)
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    // 2. Localhost Development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return "http://localhost:8000";
    }

    // 3. Fallback (Production - Self Hosted)
    // Use the current domain (e.g., https://verifdoc.io) because backend is proxied behind /api
    return window.location.origin;
};

export const API_URL = getApiUrl();
console.log("API URL configured to:", API_URL);

export default API_URL;
