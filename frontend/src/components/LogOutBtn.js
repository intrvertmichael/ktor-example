"use client"

import { useRouter } from "next/navigation"

import { logUserOut } from "@/utils/api/user"

export default function LogOutBtn() {
  const router = useRouter()

  const handleLogOut = () => {
    logUserOut()
    router.refresh()
  }

  return (
    <button onClick={handleLogOut} className='text-red-500 hover:text-red-600'>
      Log Out
    </button>
  )
}
