"use server"

import { isEmpty } from "lodash"
import { cookies } from "next/headers"

import { makeRequest } from "./general"
import { BASE_URL } from "@/constants/general"

export const checkUserStatus = async () => {
  return await makeRequest({ url: `${BASE_URL}/me` })
}

export const searchForExistingUser = async q => {
  return await makeRequest({ url: `${BASE_URL}/user/search?q=${q}` })
}

export const logUserIn = async ({ email, password }) => {
  if (isEmpty(email) || isEmpty(password)) {
    return
  }

  const data = await makeRequest({
    url: `${BASE_URL}/login`,
    method: "POST",
    body: JSON.stringify({ email, password }),
    returnCookie: true,
  })

  if (Array.isArray(data)) cookies().set("session-id", data[0])
  return data
}

export const createUser = async ({ username, email, password }) => {
  if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
    return
  }

  await makeRequest({
    url: `${BASE_URL}/user`,
    method: "POST",
    body: JSON.stringify({ email, password, username }),
  })

  await logUserIn({ email, password })
}

export const logUserOut = async () => {
  await makeRequest({
    url: `${BASE_URL}/logout`,
    method: "POST",
  })
}

export const updateEmail = async ({ data, email }) => {
  await makeRequest({
    url: `${BASE_URL}/me`,
    method: "PUT",
    body: JSON.stringify({
      ...data,
      email,
    }),
  })
}
export const addUserToNote = async ({ noteId, userId }) => {
  return await makeRequest({
    url: `${BASE_URL}/notes/${noteId}/invite/${userId}`,
    method: "POST",
  })
}
