'use client'
import Link from 'next/link'

import { useState, useEffect } from 'react';

interface Props {
  submit(user: { username: string, password: string, nickname: string }): void;
}

export default function Form({ submit }: Props) {
  const [user, setUser] = useState({ username: '', password: '', nickname: '', verifyPassword: '' })
  const [verify, setVerify] = useState(false)

  useEffect(() => {
    if (user.password === user.verifyPassword && user.password.length > 2 && user.nickname != '' && user.username != '' && user.username.includes("@") && user.username.includes(".")) {
      setVerify(true);
    } else {
      setVerify(false);
    }
  }, [user])

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };


  return (
    <div>
      <form className="flex flex-col pt-8">
        <label htmlFor="nickname" className="text-xl my-2 font-sans">Nickname</label>
        <input
          onChange={handleChange}
          id="nickname"
          type="nickname"
          autoComplete="on"
          className="rounded-lg p-1"
          name="nickname" />
        <label htmlFor="email" className="text-xl my-2 font-sans">Email</label>
        <input
          onChange={handleChange}
          id="email"
          type="email"
          autoComplete="on"
          className="rounded-lg p-1"
          name="username" />
        <label htmlFor="password" className="text-xl my-2 font-sans">Password</label>
        <input onChange={handleChange}
          id="password"
          type="password"
          autoComplete="off"
          className="rounded-lg p-1"
          name="password" />
        <label htmlFor="password-verify" className="text-xl my-2 font-sans">Verify Password</label>
        <input onChange={handleChange}
          id="verifyPassword"
          type="password"
          autoComplete="off"
          className="rounded-lg p-1"
          name="verifyPassword" />
        <button onClick={() => {
          if (verify == true) {
            submit(user);
          }
        }} type="button"
          className={`text-white rounded-lg p-2 mt-5 ${verify ? ("bg-gray-500 hover:bg-gray-600") : ("bg-red-800")} `}>
          Register
        </button>
      </form>
      <div className="flex flex-col">
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400 font-sans"></div>
          <span className="flex-shrink mx-4 text-gray-400 font-sans">Or</span>
          <div className="flex-grow border-t border-gray-400 font-sans"></div>
        </div>
      </div>
    </div>
  );
}
