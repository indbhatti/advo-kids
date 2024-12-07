import Image from "next/image";
import Link from "next/link";
import { Gloria_Hallelujah } from "next/font/google";
import Button from "@/components/button";
import { K } from "@/util/constants";

const funFont = Gloria_Hallelujah({ subsets: ["latin"], weight: "400" });

export default function Hero() {
  return (
    <div className="bg-yellow-500">
      <div className="container mx-auto pb-4 lg:h-[90vh] flex flex-col-reverse lg:flex-row justify-center items-center px-14 text-white">
        <div className="basis-1/2 flex flex-col justify-center items-center md:items-start">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-center md:text-left py-4">
            BEST WAY TO{" "}
            <span className={`${funFont.className} text-red-900 `}>
              <br />
              <strong>STUDY</strong>
            </span>{" "}
            ABOUT
            <br /> THE
            <span className={`${funFont.className} text-blue-600`}>
              {" "}
              <strong>LAWS</strong>
            </span>{" "}
            AND{" "}
            <span className={`${funFont.className} text-red-500`}>
              <br />
              <strong>RIGHTS</strong>
            </span>
          </h1>

          <p className="md:text-xl text-center md:text-left py-4">
            <strong>
              Empowering the Young, Upholding the Future:
              <br /> Your Rights, Our Mission. Let&apos;s Play
            </strong>
          </p>
          <div className="flex space-x-4 ">
            <Link href={K.Links.Quiz}>
              <Button
                className="bg-white text-black text-nowrap"
                spacing="py-4 px-8"
              >
                LET&apos;S PLAY
              </Button>
            </Link>
            <Link href="/#why">
              <Button
                className="border text-white text-nowrap"
                spacing="py-4 px-8"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="basis-1/2">
          <div>
            <Image
              src="/hero.png"
              width="800"
              height="800"
              alt=""
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
