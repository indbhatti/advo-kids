import Image from 'next/image'
import Link from "next/link"

export default function Hero() {
  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row container justify-center items-center p-14">
        <div className="basis-1/2">
          <div className="text-white">
            <h1 className="text-4xl sm:text-6xl font-sans"><strong>
              BEST WAY TO <span style={{ color: "brown" }}><br /><strong>STUDY</strong></span> ABOUT<br /> THE
              <span style={{ color: "blue" }}> <strong>LAWS</strong></span> AND <span style={{ color: "red" }}><br /><strong>RIGHTS</strong></span>
            </strong></h1>

            <p className="text-xl font-sans">
              <strong>Empowering the Young, Upholding the Future:<br /> Your Rights, Our Mission. Let's Play</strong>
            </p>
            <div className="my-4">
              <Link href="/selection-menu">
                <button className="bg-white text-black px-10 py-5 rounded-corner translate-y-1 hover:translate-y-0 transition ease-in-out shadow shadow-orange-500 active:bg-green-400 font-sans font-extrabold">
                  LET'S PLAY
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <div>
            <Image src="/advo1.png" width="800" height="800" alt="" className="img-fluid" />
          </div>
        </div>
      </div>
    </>
  )
}
