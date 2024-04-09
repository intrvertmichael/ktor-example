"use server"

import { cookies } from "next/headers"
import { isEmpty } from "lodash"

export const makeRequest = async ({ url, method, body, returnCookie }) => {
  try {
    const res = await fetch(url, {
      body,
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().get("session-id")?.value,
      },
    })

    if (url.includes("logout")) return

    const data = await res.json()
    if (returnCookie && isEmpty(data.message)) return res.headers.getSetCookie()
    return data
  } catch (error) {
    console.error(error)
  }
}
