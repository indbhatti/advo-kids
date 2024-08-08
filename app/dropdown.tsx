"use client";
import { useState } from "react";
import SignOut from "./signout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import Lang from "./lang";
import { SimpleUser } from "@/models/user";

export default function Dropdown({
  data,
  user,
}: {
  data: Session;
  user: SimpleUser;
}) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(data);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        {data.user.image && (
          <Avatar>
            <AvatarImage src={`${data.user.image}`} />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
        )}
        {data.user.name && (
          <span className="text-gray-800">{data.user.name}</span>
        )}
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
              <a href="/quiz">Storyline Menu</a>
            </li>
            <li>
              <Lang user={user} />
            </li>
            {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="/profile">Profile</a>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <a href="/profile/settings/">Settings</a>
            </li> */}
            <SignOut />
          </ul>
        </div>
      )}
    </div>
  );
}
