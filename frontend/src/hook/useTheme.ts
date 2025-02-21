import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const htmlTag = document.documentElement
    htmlTag.classList.remove('dark')
    if (theme === 'dark') {
      htmlTag.classList.add('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, setTheme }
}
