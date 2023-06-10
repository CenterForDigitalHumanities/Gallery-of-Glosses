/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': 'hsl(215, 35%, 50%)',
                'accent': 'hsl(12.75, 80%, 40%)',
                'lightGrey': 'hsl(218, 14%, 85%)',
                'grey': 'hsl(231, 5%, 48%)',
                'darkGrey': 'hsl(216, 4%, 26%)',
                'gold': 'hsl(38, 49%, 43%)',
                'error': 'hsl(0, 64%, 53%)',
                'success': 'hsl(113, 81%, 41%)',
                'bg-color': 'hsl(0, 0%, 100%)',
                'bg-secondary-color': 'hsl(240, 14%, 96%)',
            },
            spacing: {
                'grid-gutter': '2rem',
            },
            maxWidth: {
                'max': '120rem',
            },
            fontSize: {
                'custom': '1.6rem',
            },
            backgroundImage: {
                'statues': "url('/images/statues.jpeg')",
            }
        },
     },
    plugins: [],
}