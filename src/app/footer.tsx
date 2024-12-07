import Image from "next/image";
import Link from "next/link";
import { Gloria_Hallelujah } from "next/font/google";
const funFont = Gloria_Hallelujah({ subsets: ["latin"], weight: "400" });

export default function Footer() {
  return (
    <div className="bg-zinc-800">
      <div
        className="flex flex-col md:flex-row justify-between items-center container mx-auto text-white p-10 mt-10"
        id="info"
      >
        <Link href="/" className="mb-4 md:mb-0">
          <h1 className="text-5xl inline decoration-kids">
            <strong>
              <span className="text-red-600">ADVO</span>
              <span className={`${funFont.className}`}>-KIDS</span>
            </strong>
          </h1>
          <p className="absolute inline ml-2">
            <strong> H C </strong>
          </p>
        </Link>

        <div className="flex flex-row justify-center">
          <Link href="" className="mx-2">
            <Image width={50} height={50} src="/fb.png" alt="" />
          </Link>
          <Link href="" className="mx-2">
            <Image width={50} height={50} src="/twitter.png" alt="" />
          </Link>
          <Link href="" className="mx-2">
            <Image width={50} height={50} src="/linkedin.png" alt="" />
          </Link>
          <Link href="" className="mx-2">
            <Image width={50} height={50} src="/instagram.png" alt="" />
          </Link>
        </div>
      </div>
      <h1 className="text-center text-white p-4 font-bold bg-black">
        Copyright 2024 made by HEX CODERS with Love
      </h1>
    </div>
  );
}
