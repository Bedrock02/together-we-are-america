import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        crema: 'var(--color-crema)',
        cacao: 'var(--color-cacao)',
        bosque: 'var(--color-bosque)',
        coral: 'var(--color-coral)',
        mango: 'var(--color-mango)',
        cielo: 'var(--color-cielo)'
      },
      boxShadow: {
        album: '0 20px 50px rgba(74, 46, 27, 0.18)'
      }
    }
  },
  plugins: []
};

export default config;
