import { isEmpty } from "lodash"

import { THEMES, LOCAL_STORAGE_KEYS } from "@/constants/general"

export const validateEmail = email => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
}

export const validateUsername = username =>
  !isEmpty(username) && username.length > 3

export const createFullDate = date => {
  const dateObj = new Date(date)
  const timezoneOffset = dateObj.getTimezoneOffset()

  dateObj.setMinutes(dateObj.getMinutes() - timezoneOffset)

  const parsedDate = dateObj.toLocaleString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short",
  })

  return parsedDate
}

export const handleThemeChange = darkModeEnabled => {
  document.documentElement.style.setProperty(
    "color-scheme",
    darkModeEnabled ? THEMES.DARK : THEMES.LIGHT,
  )

  if (darkModeEnabled) {
    document.documentElement.classList.add("dark")
    localStorage.setItem(LOCAL_STORAGE_KEYS.DARK_MODE, JSON.stringify(true))
  } else {
    document.documentElement.classList.remove("dark")
    localStorage.removeItem(LOCAL_STORAGE_KEYS.DARK_MODE)
  }
}

export const getLocalStorageNotes = () => {
  if (typeof window !== "undefined") {
    const localStorageNotes = localStorage.getItem(
      LOCAL_STORAGE_KEYS.NOTES_BEING_EDITED,
    )

    return !isEmpty(localStorageNotes) ? JSON.parse(localStorageNotes) : []
  } else return []
}
