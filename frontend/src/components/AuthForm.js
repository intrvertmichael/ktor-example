"use client"

import { useState } from "react"
import { isEmpty } from "lodash"

import { validateEmail, validateUsername } from "@/utils/general"
import { LOGIN_LABEL, REGISTER_LABEL } from "@/constants/general"
import { createUser, logUserIn } from "@/utils/api/user"

import FormField from "./FormField"
import HeaderButton from "./HeaderButton"
import SubmitBtn from "./SubmitBtn"

export default function AuthForm() {
  const [logIn, setLogIn] = useState(true)
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const emailIsEmpty = isEmpty(email)
  const usernameIsEmpty = isEmpty(username)
  const passwordIsEmpty = isEmpty(password)

  const handleUsernameChange = e => setUsername(e.target.value)
  const handleEmailChange = e => setEmail(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)

  const handleFormSubmit = async e => {
    e.preventDefault()

    if (emailIsEmpty || !validateEmail(email) || passwordIsEmpty) {
      return
    }

    if (logIn) {
      const res = await logUserIn({ email, password })
      if (res) return setError(res.message)
      return setError("")
    }

    if (usernameIsEmpty || !validateUsername(username)) return
    await createUser({ username, email, password })
  }

  return (
    <div className='grid gap-6'>
      {error && (
        <p className='p-3 text-center text-white bg-red-500 rounded'>{error}</p>
      )}

      <div className='flex gap-3 text-2xl'>
        <HeaderButton
          label={LOGIN_LABEL}
          showLabel={logIn}
          onClick={() => setLogIn(curr => !curr)}
        />

        <HeaderButton
          label={REGISTER_LABEL}
          showLabel={!logIn}
          onClick={() => setLogIn(curr => !curr)}
        />
      </div>

      <form
        className='flex flex-col items-end gap-2'
        onSubmit={handleFormSubmit}
      >
        {!logIn && (
          <FormField
            label='Username'
            type='text'
            value={username}
            onChange={handleUsernameChange}
            required
          />
        )}

        <FormField
          label='Email'
          type='email'
          value={email}
          onChange={handleEmailChange}
          required
        />

        <FormField
          label='Password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <SubmitBtn />
      </form>
    </div>
  )
}
