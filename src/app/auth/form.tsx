"use client";
import Link from "next/link";

import { useState } from "react";

interface Props {
  submit(user: { username: string; password: string }): void;
  loading: boolean;
}

export default function Form({ submit, loading }: Props) {
  const [user, setUser] = useState({ username: "", password: "" });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  return (
    <div>
      <form className="flex flex-col pt-8">
        <label htmlFor="email" className="text-xl my-2">
          Email
        </label>
        <input
          onChange={handleChange}
          id="email"
          type="email"
          autoComplete="on"
          className="rounded-lg p-1"
          name="username"
        />
        <label htmlFor="password" className="text-xl my-2">
          Password
        </label>
        <input
          onChange={handleChange}
          id="password"
          type="password"
          autoComplete="on"
          className="rounded-lg p-1"
          name="password"
        />
        <button
          onClick={() => {
            submit(user);
          }}
          type="button"
          className={`text-white ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
          } rounded-lg p-2 mt-5`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="flex flex-col">
        <Link
          href="/auth/register"
          className="text-white bg-blue-500 hover:bg-blue-600 rounded-lg p-2 mt-5 text-center"
        >
          <button>Sign Up</button>
        </Link>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
