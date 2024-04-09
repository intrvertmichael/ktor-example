"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { createNote } from "@/utils/api/note"

import SubmitBtn from "./SubmitBtn"

export default function NoteCreate() {
  const router = useRouter()

  const [note, setNote] = useState("")

  const handleChange = e => setNote(e.target.value)

  const handleSubmit = async e => {
    e.preventDefault()

    await createNote(note)
    setNote("")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className='px-6 py-3'>
      <p className='pb-3'>Add a new note:</p>

      <div className='flex gap-1'>
        <input
          name='noteCreate'
          type='text'
          value={note}
          onChange={handleChange}
          required
          className='w-full px-2 border rounded'
        />

        <SubmitBtn />
      </div>
    </form>
  )
}
