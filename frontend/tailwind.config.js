export  default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0a0a0f',
          blue: '#00d4ff',
          purple: '#8b5cf6',
          silver: '#94a3b8'
        }
      },
      backgroundImage: {
        'space': 'radial-gradient(circle at 20% 80%, #120a8f 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 40% 40%, #00d4ff 0%, transparent 50%)'
      }
    },
  },
  plugins: [],
}
 