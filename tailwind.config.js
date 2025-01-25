module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1e40af'
        },
        secondary: {
          DEFAULT: '#4f46e5',
          dark: '#3730a3'
        },
        success: {
          DEFAULT: '#16a34a',
          dark: '#15803d'
        },
        danger: {
          DEFAULT: '#dc2626',
          dark: '#b91c1c'
        },
        warning: {
          DEFAULT: '#f59e0b',
          dark: '#d97706'
        }
      }
    }
  },
  plugins: []
}
