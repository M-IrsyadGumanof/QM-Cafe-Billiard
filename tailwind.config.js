import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    DEFAULT: '#ffcc00',
                    hover: '#ffe066',
                },
                surface: {
                    DEFAULT: '#111515',
                    card: '#1d2222',
                    elevated: '#151919',
                },
                border: {
                    DEFAULT: '#222727',
                    strong: '#2b3232',
                },
                muted: '#9aa7b3',
                dim: '#5b6e6e',
            },
        },
    },

    plugins: [forms],
};
