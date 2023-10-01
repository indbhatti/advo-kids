'use client'
import { useEffect, useState } from "react"
import { getUser, setLanguage } from "./utility"
import { redirect } from "next/navigation";
import { UserType } from "@/models/user";
import { useRouter } from "next/navigation";


export default function Lang({ userId }) {

  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLang] = useState("English");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setLanguage(userId, language)
  }, [language])

  const handleChange = async (e) => {
    const lang = e.target.innerText
    setLang(lang)
    setIsOpen(!isOpen)
    router.refresh()
  }

  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2"
        >
          <h1>Language</h1>
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
              <li
                onClick={handleChange}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                English
              </li>
              <li
                onClick={handleChange}
                defaultValue="English"
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Hindi
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>

  )
}

// <div>
//   <div className="relative">
//     <button
//       onClick={toggleDropdown}
//       className="flex items-center space-x-2"
//     >
//       <h1 className="">Language</h1>
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-5 w-5 text-gray-600"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//       >
//         <path
//           fillRule="evenodd"
//           d="M4.293 5.293a1 1 0 011.414 0L10 10.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
//           clipRule="evenodd"
//         />
//       </svg>
//     </button>
//     {isOpen && (
//       <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
//         <ul className="py-2 divide-y">
//           <li
//             defaultValue="English"
//             onClick={handleClick}
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//             English
//           </li>
//         </ul>
//         <ul className="py-2 divide-y">
//           <li
//             value="Hindi"
//             onClick={handleClick}
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//             Hindi
//           </li>
//         </ul>
//       </div>
//     )}
//   </div>
// </div>
