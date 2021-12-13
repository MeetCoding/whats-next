module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            'transparent': 'transparent',
            'current': 'currentColor',
            'white': '#FFFFFF',
            'blue': '#0277FA',
            'red': '#f9004f',
            'gray': {
                100: '#1E1E2C',
                200: '#1B233E',
                300: '#242636',
                400: '#2F3142',
            },
        },
        fontFamily: {
            'poppins': ['Poppins', 'sans-serif']
        },
        extend: {
            spacing: {
                'field': '40px',
                'panel': '440px',
                'result': '80px',
                'button': '50px',
            },
            maxWidth: {
                'panel': '400px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}