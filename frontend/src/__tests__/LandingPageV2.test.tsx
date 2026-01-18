
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import LandingPageV2 from '../src/pages/LandingPageV2';
import React from 'react';

// Mock translation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
        i18n: { language: 'fr', changeLanguage: () => { } },
    }),
}));

describe('LandingPageV2', () => {
    it('renders the main heading', () => {
        render(
            <BrowserRouter>
                <LandingPageV2 />
            </BrowserRouter>
        );
        // Look for the text "Ne croyez pas sur parole"
        expect(screen.getByText(/Ne croyez pas sur parole/i)).toBeInTheDocument();
    });

    it('renders the CTA button', () => {
        render(
            <BrowserRouter>
                <LandingPageV2 />
            </BrowserRouter>
        );
        expect(screen.getByText(/Lancer une Analyse Live/i)).toBeInTheDocument();
    });
});
