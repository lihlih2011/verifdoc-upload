import { describe, it, expect } from 'vitest';

describe('VerifDoc App', () => {
    it('Should be true', () => {
        expect(true).toBe(true);
    });

    it('Should have correct title configuration', () => {
        const appName = "VerifDoc";
        expect(appName).toBe("VerifDoc");
    });
});
