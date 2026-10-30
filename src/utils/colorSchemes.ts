// src/utils/colorSchemes.ts
export const COLOR_SCHEMES = {
  green: {
    bg: 'from-green-100 to-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
    particle: 'bg-green-200',
    shadow: 'rgba(34,197,94,0.5)',
    button: 'from-green-600 to-green-700',
    backBg: 'from-green-100 to-teal-50',
    backBorder: 'border-green-300'
  },
  orange: {
    bg: 'from-orange-100 to-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-700',
    particle: 'bg-orange-200',
    shadow: 'rgba(249,115,22,0.5)',
    button: 'from-orange-600 to-orange-700',
    backBg: 'from-orange-100 to-yellow-50',
    backBorder: 'border-orange-300'
  },
  purple: {
    bg: 'from-purple-100 to-purple-50',
    border: 'border-purple-300',
    text: 'text-purple-700',
    particle: 'bg-purple-200',
    shadow: 'rgba(168,85,247,0.5)',
    button: 'from-purple-600 to-purple-700',
    backBg: 'from-purple-100 to-pink-50',
    backBorder: 'border-purple-300'
  },
  blue: {
    bg: 'from-blue-100 to-blue-50',
    border: 'border-blue-300',
    text: 'text-blue-700',
    particle: 'bg-blue-200',
    shadow: 'rgba(59,130,246,0.5)',
    button: 'from-blue-600 to-blue-700',
    backBg: 'from-blue-100 to-cyan-50',
    backBorder: 'border-blue-300'
  }
} as const;
