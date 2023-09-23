import Image from 'next/image'
import Link from 'next/link'

export default function Why() {
  return (
    <div className="flex flex-col-reverse lg:flex-row container justify-center items-center px-14 pt-16" id="why">
      <div className="basis-1/2">
        <div className="">
          <h1 className="text-5xl">Why Us?</h1>
          <p className="text-xl p-3">
            Choosing us means choosing a dedicated team that is deeply committed to the cause of child awareness and rights. We are unique in our approach, as we strive to make complex laws and rights understandable for children.We use innovative and engaging methods to deliver our content, ensuring it resonates with our young audience. With us, you're not just choosing a website, you're choosing a partner in creating a safer world for children.
          </p>
          <div className="my-4">
            <Link href="/selection-menu">
              <button className="bg-white px-4 py-2 rounded-full translate-y-1 hover:translate-y-0 transition ease-in-out shadow shadow-gray-500 active:bg-gray-400">
                Play Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="basis-1/2">
        <Image src="/admission.png" width="600" height="600" alt="" className="mx-auto" />
      </div>
    </div>
  )
}
