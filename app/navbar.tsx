import Link from 'next/link'
import SignIn from './signin'
import Dropdown from './dropdown'
import { options } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { SessionType } from './utility'


export default async function Navbar() {
  const data : SessionType | null = await getServerSession(options)
  return (
    <nav className="p-4 bg-kids">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-center">
          <Link className="text-white mb-3 lg:mb-0 text-3xl basis-1/6" href="/">
            <strong><span className="text-red-600 font-sans">
              ADVO</span></strong>
            <span className='font-sans' ><strong>-KIDS</strong>
            </span>
          </Link>
          <ul className="flex space-x-4 mb-3 lg:mb-0 basis-2/6">
            <li>
              <Link href="/" className="text-white hover:text-gray-300 font-sans font-semibold">Home</Link>
            </li>
            <li>
              <Link href="/#about" className="text-white hover:text-gray-300 font-sans font-semibold">About</Link>
            </li>
            <li>
              <Link href="/#why" className="text-white hover:text-gray-300 font-sans font-semibold">Why us?</Link>
            </li>
            <li>
              <Link href="/#info" className="text-white hover:text-gray-300 font-sans font-semibold">Contact</Link>
            </li>
          </ul>
          <ul className="flex space-x-4 basis-3/6 justify-end">
            <Link href="/selection-menu">
              <button className="bg-white px-4 py-2 rounded-full transition ease-in-out shadow shadow-orange-500 active:bg-red-400 font-sans">
                Play Now
              </button>
            </Link>
            {data ? (
            <Dropdown data={data} />
            ) : (
              <SignIn />
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
