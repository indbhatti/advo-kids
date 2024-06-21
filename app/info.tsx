import Image from "next/image";
import Link from "next/link";

export default function Info() {
  return (
    <div className="flex flex-col bg-bluekid text-white pt-16 pb-5" id="info">
      <div className="mx-auto mb-10">
        <h1 className="text-5xl inline decoration-kids">
          <strong>
            <span className="text-red-600 font-sans">ADVO</span>
            <span className="font-sans">-KIDS</span>
          </strong>
        </h1>
        <p className="absolute inline ml-2">
          <strong> H C </strong>
        </p>
      </div>

      <div className="container sm:grid sm:grid-cols-3">
        <div className="p-3 text-center">
          <h1 className="text-2xl font-serif">About Us</h1>
          <p className="font-sans">
            We are a dedicated team passionate about advocating for
            children&apos;s rights and raising awareness about their needs. Our
            mission is to create a safe, informed, and empowered environment for
            children everywhere.
          </p>
        </div>

        <div className="p-3 text-center font-sans">
          <h1 className="text-2xl font-serif">Useful Link</h1>
          <ul className="font-sans">
            <li>
              <Link href="">Puzzles</Link>
            </li>
            <li>
              <Link href="">Gifts</Link>
            </li>
            <li>
              <Link href="">3D Stories</Link>
            </li>
          </ul>
        </div>

        <div className="p-3 text-center">
          <h1 className="text-2xl font-serif">Contact Us</h1>
          <p className="font-sans font-semibold">
            Phone Number <br />
            Police: 100 <br />
            Emergency: 111 <br />
            Ambulance: 108 <br />
          </p>
          <Link href="mailto:inderprbhatti@gmail.com">
            <button className="bg-red-500 font-sans text-white px-4 py-2 my-2 rounded-lg hover:bg-red-600 transition ease-in-out shadow shadow-gray-500 active:bg-red-900">
              Contact Us Right Now
            </button>
          </Link>
        </div>
      </div>

      <div className="container">
        <hr className="my-6 text-red-500" />
        <div className="flex flex-row justify-center">
          <Link href="" className="mx-2">
            <Image src="/fb.png" alt="facebook" height="30" width="30" />
          </Link>

          <Link href="" className="mx-2">
            <Image src="/twitter.png" alt="twitter" height="30" width="30" />
          </Link>
          <Link href="" className="mx-2">
            <Image src="/linkedin.png" alt="linkedin" height="30" width="30" />
          </Link>
          <Link href="" className="mx-2">
            <Image
              src="/instagram.png"
              alt="instagram"
              height="30"
              width="30"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
