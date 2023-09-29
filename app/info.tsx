import Link from 'next/link'

export default function Info() {
  return (
    <div className="flex flex-col bg-info text-white pt-16 pb-5 mt-24" id="info">

      <div className="mx-auto mb-10 ">
        <h1 className="text-5xl inline underline underline-offset-8 decoration-kids">
          <span className="text-red-600 font-sans"><strong>ADVO</strong></span><span className='font-light font-sans'>-KIDS</span>

        </h1>
        <p className="absolute inline ml-2 font-sans font-bold"><strong> H C </strong></p>
      </div>

      <div className="container grid grid-cols-3">

        <div className="p-3">
          <h1 className="text-2xl font-sans font-bold">
            About Us
          </h1>
          <p className="font-light font-thin">
            We are a dedicated team passionate about advocating for children's rights and raising awareness about their needs. Our mission is to create a safe, informed, and empowered environment for children everywhere.
          </p>
        </div>

        <div className="p-3 text-center">
          <h1 className="text-2xl font-sans font-bold">
            Useful Link
          </h1>
          <ul className='font-light font-thin'>
            <li>
              <Link href="">
                Cartoon
              </Link>
            </li>
            <li>
              <Link href="">
                Puzzle
              </Link>
            </li>
            <li>
              <Link href="">
                3d controller
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-3 text-center">
          <h1 className="text-2xl  font-sans font-bold">
            Contact Us
          </h1>
          <p className='font-light font-thin'>
            Phone Number <br />
            Police: 100 <br />
            Emergency: 111 <br />
            Ambulance: 108 <br />
          </p>
          <Link href="/contact">
            <button className="bg-red-500 text-white px-4 py-2 my-2 rounded-lg hover:bg-red-600 transition ease-in-out shadow shadow-gray-500 active:bg-red-900">
            Contact Us Right Now
            </button>
          </Link>
        </div>
      </div>

      <div className="container">
        <hr className="my-6 text-red-500" />
        <div className="flex flex-row justify-center">

          <Link href="" className="mx-2">
            <img src="fb.png" alt="" />
          </Link>

          <Link href="" className="mx-2">
            <img src="twitter.png" alt="" />
          </Link>
          <Link href="" className="mx-2">
            <img src="linkedin.png" alt="" />
          </Link>
          <Link href="" className="mx-2">
            <img src="instagram.png" alt="" />
          </Link>

        </div>
      </div>
    </div>
  )
}
