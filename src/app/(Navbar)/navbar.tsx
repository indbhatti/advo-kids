import Link from "next/link";
import Button from "@/components/button";
import { Gloria_Hallelujah } from "next/font/google";
import { auth } from "@/auth";
import { Session } from "next-auth";
import Dropdown from "./dropdown";

const funFont = Gloria_Hallelujah({ subsets: ["latin"], weight: "400" });

export default async function Navbar() {
  const session: Session | null = await auth();

  const links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/#about" },
    { title: "Why us?", href: "/#why" },
    { title: "Contact", href: "/#info" },
  ];

  return (
    <div className="bg-yellow-500">
      <nav className="container px-14 mx-auto flex flex-col lg:flex-row items-center justify-center py-8 text-white">
        <Link
          className="mb-3 lg:mb-0 text-4xl basis-1/6 font-sans text-nowrap"
          href="/"
        >
          <strong>
            <span className={`text-red-600 fonts`}>ADVO</span>
            <span className={`${funFont.className}`}>-KIDS</span>
          </strong>
        </Link>
        <ul className="lg:pl-10 flex space-x-4 mb-3 lg:mb-0 lg:mr-auto font-bold text-xl">
          {links.map((link) => (
            <li key={link.title}>
              <Link
                href={link.href}
                className="hover:text-gray-700 text-nowrap"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-row items-center space-x-4 justify-end font-sans font-semibold">
          <Link href="/quiz">
            <Button className="bg-white hover:bg-gray-200 text-black">
              PLAY NOW
            </Button>
          </Link>
          {/*
            {data && user && <Lang user={user} />}
            */}
          {session && <Dropdown session={session} />}
        </div>
      </nav>
    </div>
  );
}
