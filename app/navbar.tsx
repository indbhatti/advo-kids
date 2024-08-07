import Link from "next/link";
import Dropdown from "./dropdown";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { SimpleUser } from "@/models/user";
import { getUserById } from "@/server-actions/serveractions";
import { Session } from "next-auth";
import { Indie_Flower } from "next/font/google";
const indie = Indie_Flower({ subsets: ["latin"], weight: ["400"] });

export default async function Navbar() {
  const data: Session | null = await getServerSession(options);

  let user: SimpleUser | null = null;
  if (data && data.user) {
    user = await getUserById(data.user.userId);
  }

  return (
    <nav className="p-8 bg-kids md:text-lg">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-center">
          <Link className="text-white mb-3 lg:mb-0 text-3xl basis-1/6" href="/">
            <strong>
              <span className="text-red-600">ADVO</span>
              <span className={indie.className}>-KIDS</span>
            </strong>
          </Link>
          <ul className="hidden lg:flex space-x-4 mb-3 lg:mb-0 basis-2/6 ">
            <li>
              <Link href="/" className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#about" className="text-white hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/#why" className="text-white hover:text-gray-300">
                Why us?
              </Link>
            </li>
            <li>
              <Link href="/#info" className="text-white hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex flex-row items-center space-x-4 basis-3/6 justify-end self-end">
            <Link href="/quiz" className="hidden md:block">
              <button className="bg-white text-black px-4 py-2 hover:bg-gray-100 shadow shadow-gray-500 active:bg-gray-600 rounded-full font-bold">
                PLAY NOW!
              </button>
            </Link>
            {data && user && <Dropdown data={data} user={user} />}
          </div>
        </div>
      </div>
    </nav>
  );
}
