export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'status-active': '#10b981',
        'status-warning': '#f59e0b',
        'status-error': '#ef4444',
      }
    },
  },
  plugins: [],
}