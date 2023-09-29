import Image from 'next/image'
import Link from "next/link"

export default function Hero() {
  return (
    <div>
      <div className="flex flex-col lg:flex-row container justify-center items-center p-14">
        <div className="basis-1/2">
          <div className="text-white">
            <h1 className="text-6xl font-sans"><strong>
              BEST WAY TO <span style={{ color: "brown" }}><br /><strong>STUDY</strong></span> ABOUT<br /> THE
              <span style={{ color: "blue" }}> <strong>LAWS</strong></span> AND <span style={{ color: "red" }}><br /><strong>RIGHTS</strong></span>
            </strong></h1>
            <p className="text-xl font-sans">
              <strong>Empowering the Young, Upholding the Future:<br /> Your Rights, Our Mission. Let's Play</strong>
            </p>
            <div className="my-4">
              <Link href="/selection-menu">
                <button className="text-black bg-white px-4 py-2 rounded-full translate-y-1 hover:translate-y-0 transition ease-in-out shadow shadow-red-500 active:bg-orange-400">Play Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <div>
            <Image src="/hero.png" width="800" height="800" alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  )
}
