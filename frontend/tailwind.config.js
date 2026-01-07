/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Nuxt UI SaaS / Kreativ Palette
                gray: {
                    50: '#F9FAFB',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D1D5DB',
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                    950: '#030712', // Rich Black (Background)
                },
                primary: {
                    DEFAULT: '#D946EF', // Fuchsia-500 equivalent for primary actions
                    50: '#FDF4FF',
                    100: '#FAE8FF',
                    200: '#F5D0FE',
                    300: '#F0ABFC',
                    400: '#E879F9',
                    500: '#D946EF', // Main Accent (Electric Purple/Pink)
                    600: '#C026D3',
                    700: '#A21CAF',
                    800: '#86198F',
                    900: '#701A75',
                    950: '#4A044E',
                },
                // Dashboard Compatibility
                boxdark: '#111827', // gray-900
                boxdark2: '#030712', // gray-950
                strokedark: '#374151', // gray-700
                'whiten': '#F3F4F6',
                'bodydark': '#AEB7C0',
                'bodydark1': '#DEE4EE',
                'bodydark2': '#8A99AF',
            },
            animation: {
                'spotlight': 'spotlight 2s ease .75s 1 forwards',
                'shine': 'shine 2s linear infinite',
            },
            keyframes: {
                spotlight: {
                    '0%': { opacity: 0, transform: 'translate(-72%, -62%) scale(0.5)' },
                    '100%': { opacity: 1, transform: 'translate(-50%,-40%) scale(1)' },
                },
                shine: {
                    'from': { backgroundPosition: '0 0' },
                    'to': { backgroundPosition: '-200% 0' },
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            fontSize: {
                xs: ['0.75rem', { lineHeight: '1.5' }],
                sm: ['0.875rem', { lineHeight: '1.5715' }],
                base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
                lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
                xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
                '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
                '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
                '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
                '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
                '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
            },
            screens: {
                xs: '480px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
