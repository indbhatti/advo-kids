'use client'
import Link from 'next/link'

import { useState } from 'react';

interface Props {
  submit(user: { username: string, password: string }): void;
}

export default function Form({ submit }: Props) {
  const [user, setUser] = useState({ username: '', password: '' })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
    // console.log(user);
  };


  return (
    <div>
      <form className="flex flex-col pt-8 ">
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
          autoComplete="on"
          className="rounded-lg p-1"
          name="password" />
        <button onClick={() => {
          submit(user);
        }} type="button"
          className="text-white bg-gray-500 rounded-lg p-2 mt-5 hover:bg-gray-600 font-sans">
          Login
        </button>
      </form>
      <div className="flex flex-col">
        <Link href="/auth/register" className="text-white bg-gray-500 rounded-lg p-2 mt-5 hover:bg-gray-600 text-center font-sans">
          <button className='font-sans'>
            Sign Up
          </button>
        </Link>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400 font-sans"></div>
          <span className="flex-shrink mx-4 text-gray-400 font-sans">Or</span>
          <div className="flex-grow border-t border-gray-400 font-sans"></div>
        </div>
      </div>
    </div>
  );
}
