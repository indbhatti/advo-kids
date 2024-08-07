import Image from "next/image";
import Link from "next/link";
import { Indie_Flower } from "next/font/google";
const indie = Indie_Flower({ subsets: ["latin"], weight: ["400"] });

export default function Hero() {
  return (
    <div className="bg-kids">
      <div className="flex flex-col-reverse lg:flex-row container justify-center items-center p-14">
        <div className="basis-1/2">
          <div className="text-white">
            <h1 className="text-4xl sm:text-6xl font-sans">
              <strong>
                BEST WAY TO{" "}
                <span className={`${indie.className} text-red-600`}>
                  <br />
                  <strong>STUDY</strong>
                </span>{" "}
                ABOUT
                <br /> THE
                <span className={`${indie.className} text-blue-600`}>
                  {" "}
                  <strong>LAWS</strong>
                </span>{" "}
                AND{" "}
                <span className={`${indie.className} text-red-600`}>
                  <br />
                  <strong>RIGHTS</strong>
                </span>
              </strong>
            </h1>

            <p className="text-xl font-sans mt-2">
              Empowering the Young, Upholding the Future:
              <br /> Your Rights, Our Mission. Let&apos;s Play
            </p>
            <div className="mt-10">
              <Link href="/quiz">
                <button className="bg-white text-black px-10 py-5 rounded-corner translate-y-1 hover:translate-y-0 transition ease-in-out shadow shadow-orange-500 active:bg-green-400 rounded-full font-semibold">
                  LET&apos;S PLAY!
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <div>
            <Image
              src="/advo1.png"
              width="800"
              height="800"
              alt=""
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
