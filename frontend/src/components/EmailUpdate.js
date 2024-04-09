"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { updateEmail } from "@/utils/api/user"

import SubmitBtn from "./SubmitBtn"

export default function EmailUpdate({ user }) {
  const router = useRouter()

  const [editing, setEditing] = useState(false)
  const [newEmail, setNewEmail] = useState("")

  const handleEmailEdit = () => setEditing(curr => !curr)

  const handleSubmit = async e => {
    e.preventDefault()

    await updateEmail({ data: user, email: newEmail })
    setNewEmail("")
    setEditing(false)

    router.refresh()
  }

  if (editing) {
    return (
      <form className='flex justify-center gap-2' onSubmit={handleSubmit}>
        <label>New Email:</label>

        <input
          type='email'
          value={newEmail}
          onChange={e => setNewEmail(e.target.value)}
          className='px-2 border rounded'
          required
        />

        <div className='flex flex-row gap-2'>
          <SubmitBtn />
          <button
            onClick={handleEmailEdit}
            className='text-xs text-neutral-500 hover:text-neutral-400'
          >
            Cancel
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      <p>{user.email}</p>
      <button
        className='px-2 text-xs text-neutral-500 hover:text-neutral-400'
        onClick={handleEmailEdit}
      >
        Update Email
      </button>
    </div>
  )
}
