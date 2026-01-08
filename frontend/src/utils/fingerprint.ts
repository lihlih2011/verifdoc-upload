
/**
 * Simple Browser Fingerprinting Utility
 * Generates a unique ID based on browser/device characteristics.
 * This is better than IP checking because it persists through VPNs.
 */
export async function getDeviceFingerprint(): Promise<string> {
    const data = [
        navigator.userAgent,
        navigator.language,
        new Date().getTimezoneOffset(),
        screen.width + 'x' + screen.height,
        screen.colorDepth,
        // Canvas Fingerprinting (Unicité matérielle)
        getCanvasFingerprint()
    ];

    const stringData = data.join('||');
    return await sha256(stringData);
}

function getCanvasFingerprint(): string {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return 'no-canvas';

        canvas.width = 200;
        canvas.height = 50;

        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText("VerifDoc_Auth_v1", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText("VerifDoc_Auth_v1", 4, 17);

        return canvas.toDataURL();
    } catch (e) {
        return 'canvas-error';
    }
}

async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Storage Manager
const STORAGE_KEY = 'vd_trial_usage';
const MAX_TRIALS = 3;

export const TrialManager = {
    async checkEligibility(): Promise<{ allowed: boolean; remaining: number }> {
        const fingerprint = await getDeviceFingerprint();
        const usageData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const count = usageData[fingerprint] || 0;

        return {
            allowed: count < MAX_TRIALS,
            remaining: Math.max(0, MAX_TRIALS - count)
        };
    },

    async consumeTrial(): Promise<number> {
        const fingerprint = await getDeviceFingerprint();
        const usageData = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const count = (usageData[fingerprint] || 0) + 1;

        usageData[fingerprint] = count;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usageData));

        return Math.max(0, MAX_TRIALS - count);
    }
};
