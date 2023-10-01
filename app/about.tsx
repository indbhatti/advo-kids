import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <div className="flex flex-col lg:flex-row container justify-center items-center px-14 sm:pt-56" id="about">
      <div className="basis-1/2 my-5">
        <div>
          <Image src="/why1.png" width="600" height="700" alt="" className="img-fluid" />
        </div>
      </div>
      <div className="basis-1/2">
        <h1 className="text-5xl font-serif font-extrabold">
          About our Education
        </h1>
        <p className="text-xl p-3 font-sans font-semibold">
          Education is the cornerstone of our mission. We are firm believers in the transformative power of knowledge, and we strive to educate children about their rights, enabling them to safeguard themselves and stand up for others.  Our goal is to arm children with the necessary knowledge to confidently and safely navigate their world.
        </p>
        <div className="my-4">
          <Link href="/contact">
                <button className="bg-white font-extrabold text-black px-4 py-2 rounded-full translate-y-1 hover:translate-y-0 transition ease-in-out shadow shadow-yellow-500 active:bg-red-400 font-sans">
                CONTACT US
                </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
