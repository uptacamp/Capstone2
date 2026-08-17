/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'deep-space': '#050810',
        panel: '#0B1220',
        hairline: '#1C2733',
        amber: {
          DEFAULT: '#FFB000',
          dim: '#8A5E00',
        },
        sky: '#38BDF8',
        flame: '#FF5A36',
        go: '#34D399',
        hold: '#FBBF24',
        scrub: '#F87171',
        muted: '#7B8A9E',
      },
      fontFamily: {
        mono: ['var(--font-space-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
