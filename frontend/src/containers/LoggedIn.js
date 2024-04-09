import { capitalize, isEmpty } from "lodash"

import { getAllNotes } from "@/utils/api/note"

import LogOutBtn from "@/components/LogOutBtn"
import NoteCreate from "@/components/NoteCreate"
import Note from "@/components/Note"
import EmailUpdate from "@/components/EmailUpdate"

export default async function LoggedIn({ user }) {
  const allNotes = await getAllNotes()

  return (
    <>
      <div className='flex justify-between w-full'>
        <p className='px-6 py-3 border rounded border-neutral-800'>
          Welcome {capitalize(user.username)} 🙂
        </p>

        <LogOutBtn />
      </div>

      <NoteCreate />

      <div className='grid gap-3'>
        {allNotes.reverse().map(data => (
          <Note key={data.id} data={data} />
        ))}
      </div>

      <EmailUpdate user={user} />
    </>
  )
}
