/** @type {import('tailwindcss').Config} */
import PrimeUI from 'tailwindcss-primeui';

export default {
    darkMode: ['selector', '[class="p-dark"]'],
    content: [
        './resources/js/pages/**/*.vue',
        './resources/js/layouts/**/*.vue',
        './resources/js/components/**/*.{js,vue,ts}',
        './resources/js/doc/**/*.{js,vue,ts}',
        './resources/views/**/*.blade.php'
    ],
    plugins: [PrimeUI],
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1920px'
        }
    }
};
