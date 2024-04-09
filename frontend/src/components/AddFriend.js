import { useCallback, useState } from "react"
import { debounce, isEmpty } from "lodash"

import { addUserToNote, searchForExistingUser } from "@/utils/api/user"

export default function AddFriend({ noteId }) {
  const [loading, setLoading] = useState(false)
  const [showFriendWindow, setShowFriendWindow] = useState(false)
  const [input, setInput] = useState("")
  const [friends, setFriends] = useState([])

  const searchForFriend = useCallback(
    debounce(async value => {
      if (isEmpty(value)) {
        setFriends([])
      } else {
        const possibleFriends = await searchForExistingUser(value)
        setFriends(possibleFriends)
      }

      setLoading(false)
    }, 1000),
    [],
  )

  const toggleFriendWindow = () => {
    setShowFriendWindow(curr => !curr)
    setInput("")
    setFriends([])
  }

  const handleChange = e => {
    setInput(e.target.value)
    setLoading(true)
    searchForFriend(e.target.value)
  }

  const handleCancel = () => {
    setInput("")
    setFriends([])
  }

  const handleFriendClick = async ({ id }) => {
    const res = await addUserToNote({ noteId, userId: id })
    if (res?.message) alert(res.message)
    toggleFriendWindow()
  }

  return (
    <div className='relative text-sm'>
      {showFriendWindow && (
        <div className='absolute bottom-0 left-0 z-50 grid gap-3 px-4 py-3 text-black bg-white border rounded w-72 '>
          {loading && <p>Searching...</p>}

          {!isEmpty(input) && !loading && isEmpty(friends) && (
            <p>
              No friends were found that matched that <strong>{input}</strong>
            </p>
          )}

          {!loading && !isEmpty(friends) && (
            <div>
              {friends.map(friend => (
                <button
                  key={friend.id}
                  className='w-full px-2 py-1 text-left rounded cursor-pointer hover:bg-neutral-200'
                  onClick={() => handleFriendClick(friend)}
                >
                  {friend.username} - {friend.email}
                </button>
              ))}
            </div>
          )}

          <div className='flex gap-1 border'>
            <input
              type='text'
              placeholder="Enter Friend's Name"
              value={input}
              onChange={handleChange}
              className='w-full px-2 bg-white'
              autoFocus
            />

            {!isEmpty(input) && (
              <button onClick={handleCancel} className='px-2'>
                x
              </button>
            )}
          </div>

          <button
            onClick={toggleFriendWindow}
            className='hover:text-neutral-500'
          >
            Cancel
          </button>
        </div>
      )}

      <button onClick={toggleFriendWindow} className='hover:text-black'>
        Add a friend
      </button>
    </div>
  )
}
