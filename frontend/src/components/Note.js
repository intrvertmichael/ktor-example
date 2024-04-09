"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { deleteNote, editNote } from "@/utils/api/note"
import { createFullDate, getLocalStorageNotes } from "@/utils/general"
import { LOCAL_STORAGE_KEYS } from "@/constants/general"

import SubmitBtn from "./SubmitBtn"
import AddFriend from "./AddFriend"

export default function Note({ data }) {
  const router = useRouter()

  const [editing, setEditing] = useState()
  const [editedNote, setEditedNote] = useState()

  useEffect(() => {
    const localStorageNotes = getLocalStorageNotes()
    setEditing(Boolean(localStorageNotes[data.id]))
    setEditedNote(localStorageNotes[data.id] || data.contents)
  }, [data.contents, data.id])

  const handleEdit = () => {
    setEditing(true)
    setEditedNote(data.contents)

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.NOTES_BEING_EDITED,
      JSON.stringify({
        ...getLocalStorageNotes(),
        [data.id]: data.contents,
      }),
    )
  }

  const cancelEdit = () => {
    setEditing(false)
    setEditedNote(data.contents)

    const localStorageNotes = getLocalStorageNotes()
    delete localStorageNotes[data.id]

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.NOTES_BEING_EDITED,
      JSON.stringify(localStorageNotes),
    )
  }

  const handleDelete = async e => {
    e.preventDefault()

    if (confirm("Are you sure you want to delete this note ?")) {
      await deleteNote(data.id)
      router.refresh()
    }
  }

  const handleEditedNoteChange = e => {
    setEditedNote(e.target.value)

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.NOTES_BEING_EDITED,
      JSON.stringify({
        ...getLocalStorageNotes(),
        [data.id]: e.target.value,
      }),
    )
  }

  const handleEditNoteSubmit = async e => {
    e.preventDefault()

    await editNote(data, editedNote)
    setEditedNote(data.contents)
    cancelEdit()

    router.refresh()
  }

  return (
    <div className='p-3 text-black bg-yellow-200 rounded dark:bg-yellow-500'>
      {editing ? (
        <form onSubmit={handleEditNoteSubmit} className='grid gap-2'>
          <input
            name='noteEdit'
            type='text'
            value={editedNote}
            onChange={handleEditedNoteChange}
            className='w-full px-2 bg-white rounded'
            required
          />

          <div className='flex flex-row-reverse gap-3'>
            <SubmitBtn dataId='noteEdit' />
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className='grid gap-3'>
          <p className='text-sm'>{createFullDate(data.modified)}</p>

          <p className='text-2xl font-bold '>{data.contents}</p>

          <div className='flex flex-row-reverse items-center justify-between text-sm text-yellow-700'>
            <div className='flex gap-3'>
              <button onClick={handleEdit} className='hover:text-black'>
                Edit
              </button>

              <button onClick={handleDelete} className='hover:text-red-500'>
                Delete
              </button>
            </div>

            <AddFriend noteId={data.id} />
          </div>
        </div>
      )}
    </div>
  )
}
