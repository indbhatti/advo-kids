'use client'
import { signOut } from 'next-auth/react'

export default function Signin() {
  return (
    <li
      onClick={() => { signOut() }}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-sans">
      Sign Out
    </li>
  )
}
