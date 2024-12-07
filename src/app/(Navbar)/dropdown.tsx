"use client";
import { K } from "@/util/constants";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function Dropdown({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative text-black">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <div className="bg-white rounded-full h-10 w-10 overflow-hidden">
          <img src={`${session?.user?.image}`} alt="IMG" />
        </div>
        <span className="text-gray-800">{session.user?.name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 5.293a1 1 0 011.414 0L10 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul className="py-2 divide-y">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href={K.Links.Quiz}>Storyline Menu</Link>
            </li>
            {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/profile">Profile</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <Link href="/profile/settings/">Settings</Link>
            </li> */}
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                signOut();
              }}
            >
              SignOut
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
