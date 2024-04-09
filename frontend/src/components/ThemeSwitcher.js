"use client"

import { useState } from "react"

import { handleThemeChange } from "@/utils/general"
import { LOCAL_STORAGE_KEYS } from "@/constants/general"

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const darkModeEnabled = Boolean(
        localStorage.getItem(LOCAL_STORAGE_KEYS.DARK_MODE),
      )

      if (darkModeEnabled) {
        handleThemeChange(darkModeEnabled)
      }

      return darkModeEnabled
    } else return false
  })

  const handleThemeToggle = () => {
    setIsDark(curr => {
      handleThemeChange(!curr)
      return !curr
    })
  }

  return (
    <div className='flex flex-row-reverse w-full'>
      <button
        className='text-sm w-fit text-neutral-500'
        onClick={handleThemeToggle}
        suppressHydrationWarning
      >
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  )
}

export default ThemeSwitcher
