import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
    ],
    theme: {
    extend: {
        fontFamily: {
            playfairDisplay: ['"Playfair Display"', 'serif'],
            inter: ['Inter', 'sans-serif'],
        },
    },
},
    plugins: [],
}
