import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        bubblegum: ["Bubblegum Sans", "sans-serif"],
        cursive: ["Dancing Script", "cursive"],
      },
      colors: {
        primaryOrange: "#b75645",
        // primaryBrown: "#966d61",
        primaryBrown: "#bc987e",
        primaryBrown300: "#af6e3f",
        primaryBrown200: "#866c5a",
      },
      boxShadow: {
        shadowLeft: "-10px 2px 10px rgb(0, 0, 0)",
      }
    },
  },
  plugins: [],
}
export default config
