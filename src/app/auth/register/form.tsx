"use client";

import { useState, useEffect } from "react";

interface Props {
  submit(user: { email: string; password: string; name: string }): void;
  loading: boolean;
}

export default function Form({ submit, loading }: Props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    verifyPassword: "",
  });
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    if (
      user.password === user.verifyPassword &&
      user.password.length > 2 &&
      user.name != "" &&
      user.email != "" &&
      user.email.includes("@") &&
      user.email.includes(".")
    ) {
      setVerify(true);
    } else {
      setVerify(false);
    }
  }, [user]);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  return (
    <div>
      <form className="flex flex-col pt-8">
        <label htmlFor="name" className="text-xl my-2">
          Name
        </label>
        <input
          onChange={handleChange}
          id="name"
          type="name"
          autoComplete="on"
          className="rounded-lg p-1"
          name="name"
        />
        <label htmlFor="email" className="text-xl my-2">
          Email
        </label>
        <input
          onChange={handleChange}
          id="email"
          type="email"
          autoComplete="on"
          className="rounded-lg p-1"
          name="email"
        />
        <label htmlFor="password" className="text-xl my-2">
          Password
        </label>
        <input
          onChange={handleChange}
          id="password"
          type="password"
          autoComplete="off"
          className="rounded-lg p-1"
          name="password"
        />
        <label htmlFor="password-verify" className="text-xl my-2">
          Verify Password
        </label>
        <input
          onChange={handleChange}
          id="verifyPassword"
          type="password"
          autoComplete="off"
          className="rounded-lg p-1"
          name="verifyPassword"
        />
        <button
          onClick={() => {
            if (verify == true) {
              submit(user);
            }
          }}
          type="button"
          className={`text-white rounded-lg p-2 mt-5 ${
            verify
              ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
              : "bg-gray-500 cursor-default"
          } `}
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
      <div className="flex flex-col">
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">Or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
      </div>
    </div>
  );
}
