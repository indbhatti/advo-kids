'use client'
import { signIn } from 'next-auth/react'

export default function Signin() {
  return (
    <button onClick={() => { signIn() }} className="bg-white px-4 py-2 rounded-full translate-y-1 hover:translate-y-0 transition ease-in-out shadow shadow-gray-500 active:bg-gray-400">
      Sign-in
    </button>
  )
}
