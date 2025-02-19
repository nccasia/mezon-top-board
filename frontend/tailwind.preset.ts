import { Config } from 'tailwindcss'
import { TinyColor } from '@ctrl/tinycolor';

const tailwindPreset: Config = {
  theme: {
    extend: {
      colors: {
        primary: {
            default: '#F2385A',
            hover: new TinyColor('#F2385A').lighten(5).toString(),
            active: new TinyColor('#F2385A').lighten(10).toString(),
            border: new TinyColor('#F2385A').setAlpha(0.2).toString()
        },
        secondary: {
            default: '#F25E86',
            hover: new TinyColor('#F25E86').lighten(5).toString(),
            active: new TinyColor('#F25E86').lighten(10).toString(),
            border: new TinyColor('#F25E86').setAlpha(0.2).toString()
        },
        default: {
            default: '#fff',
            hover: new TinyColor('#000').lighten(5).toString(),
            active: new TinyColor('#000').lighten(10).toString(),
            border: new TinyColor('#000').setAlpha(0.2).toString()
        },
      },
      boxShadow: {
        sm: '0px 2px 4px 0px rgba(11, 10, 55, 0.15)',
        lg: '0px 8px 20px 0 rgba(18, 16, 99, 0.06)'
      },
      fontSize: {
        xs: ['14px', { lineHeight: '24px', letterSpacing: '-0.03em' }],
        sm: ['16px', { lineHeight: '28px', letterSpacing: '-0.03em' }],
        lg: ['18px', { lineHeight: '28px', letterSpacing: '-0.03em' }],
        xl: ['24px', { lineHeight: '36px', letterSpacing: '-0.03em' }],
        '2xl': ['36px', { lineHeight: '48px', letterSpacing: '-0.032em' }],
        '3xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.032em' }],
        '4xl': ['56px', { lineHeight: '64px', letterSpacing: '-0.032em' }],
        '5xl': ['80px', { lineHeight: '80px', letterSpacing: '-0.032em' }]
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif']
      }
    }
  }
}

export default tailwindPreset
