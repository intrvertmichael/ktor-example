import { checkUserStatus } from "@/utils/api/user"

import LoggedIn from "@/containers/LoggedIn"
import LoggedOut from "@/containers/LoggedOut"

export default async function Home() {
  const data = await checkUserStatus()

  if (data?.email) return <LoggedIn user={data} />
  return <LoggedOut data={data} />
}
