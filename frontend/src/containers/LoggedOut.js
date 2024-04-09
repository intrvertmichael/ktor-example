import AuthForm from "@/components/AuthForm"
import { isEmpty } from "lodash"

export default function LoggedOut({ data }) {
  if (isEmpty(data)) {
    return (
      <p className='w-full px-6 py-3 text-center border rounded border-neutral-800'>
        Please make sure the Backend is running
      </p>
    )
  }

  return (
    <div className='flex flex-col items-center gap-6 mx-auto w-fit'>
      <p className='px-6 py-3 border rounded border-neutral-800 w-fit'>
        {data?.message}
      </p>

      <AuthForm />
    </div>
  )
}
