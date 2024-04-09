"use server"

import { makeRequest } from "./general"
import { BASE_URL } from "@/constants/general"

export const getAllNotes = async () => {
  return await makeRequest({ url: `${BASE_URL}/notes` })
}

export const createNote = async contents => {
  return await makeRequest({
    url: `${BASE_URL}/notes`,
    method: "POST",
    body: JSON.stringify({ contents }),
  })
}

export const editNote = async (data, contents) => {
  await makeRequest({
    url: `${BASE_URL}/notes/${data.id}`,
    method: "PUT",
    body: JSON.stringify({
      ...data,
      contents,
    }),
  })
}

export const deleteNote = async noteId => {
  await makeRequest({
    url: `${BASE_URL}/notes/${noteId}`,
    method: "DELETE",
  })
}
