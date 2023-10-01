import Link from 'next/link'
import SignIn from './signin'
import Dropdown from './dropdown'
import { options } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { SessionType, getUser } from './utility'
import { UserType } from '@/models/user'
import Lang from './lang'


export default async function Navbar() {
  const data: SessionType | null = await getServerSession(options)
  let user : UserType | null = null
  if (data && data.user) {
    user = await getUser(data.user.userId);
  }

  return (
    <nav className="p-4 bg-kids">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center">
          <Link className="text-white mb-3 lg:mb-0 text-3xl basis-1/6 font-sans" href="/">
            <strong><span className="text-red-600 font-sans">
              ADVO</span>
              <span>-KIDS
              </span></strong>
          </Link>
          <ul className="md:flex hidden lg:visible space-x-4 mb-3 lg:mb-0 basis-2/6 font-sans font-semibold">
            <li>
              <Link href="/" className="text-white hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link href="/#about" className="text-white hover:text-gray-300">About</Link>
            </li>
            <li>
              <Link href="/#why" className="text-white hover:text-gray-300">Why us?</Link>
            </li>
            <li>
              <Link href="/#info" className="text-white hover:text-gray-300">Contact</Link>
            </li>
          </ul>
          <div className="flex flex-row items-center space-x-4 basis-3/6 justify-end font-sans font-semibold">
            <Link href="/selection-menu">
              <button className="bg-white text-black px-4 py-2 hover:bg-red-100 shadow shadow-red-400 active:bg-red-400 font-sans font-extrabold">
                PLAY NOW
              </button>
            </Link>
            {data &&
              <div className="inline px-3 text-white">Rewards</div>
            }
            {data && user &&
              <Lang userId={data.user.userId} userLanguage={user.language} />
            }
            {data ? (
              <Dropdown data={data} />
            ) : (
              <SignIn />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
