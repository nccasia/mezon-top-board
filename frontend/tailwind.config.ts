import type { Config } from 'tailwindcss'
import tailwindPreset from './tailwind.preset'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  presets: [tailwindPreset],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  plugins: []
}

export default config
