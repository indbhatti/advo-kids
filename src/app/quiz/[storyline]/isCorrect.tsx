import hindi from "@/hindi";
import { K } from "@/util/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type props = {
  language: string;
  isCorrect: string;
  handleNextClick: () => void;
  setIsCorrect: (type: string) => void;
};

export default function IsCorrect({
  language,
  isCorrect,
  handleNextClick,
  setIsCorrect,
}: props) {
  const router = useRouter();
  return (
    <div>
      {isCorrect != "CLEAR" && (
        <div>
          <div className="bg-black opacity-70 z-10 h-screen w-screen fixed left-0 top-0"></div>
          <div
            className="
          container bg-yellow-400 z-20 fixed rounded-3xl p-8
          md:grid flex flex-col grid-cols-3 place-items-center
          font-sans font-extrabold"
          >
            {isCorrect === "YES" && (
              <div className="row-span-2">
                <Image
                  width={1000}
                  height={1000}
                  src={`/correct.png`}
                  alt="Correct"
                  className="h-60 md:h-full md:w-full w-auto"
                />
                <h1 className="text-center font-sans font-extrabold text-xl  bg-white">
                  {language === "English" ? "C O R R E C T !" : hindi.right}
                </h1>
              </div>
            )}{" "}
            {isCorrect === "FINISH" && (
              <div>
                <Image
                  width={1000}
                  height={1000}
                  src={`/correct.png`}
                  alt="Incorrect"
                  className="h-60 md:h-full md:w-full w-auto"
                />
                <h1 className="text-center font-sans font-extrabold text-xl  bg-white">
                  {language === "English" ? "C O R R E C T" : hindi.right}
                </h1>
              </div>
            )}
            {isCorrect === "NO" && (
              <div>
                <Image
                  width={1000}
                  height={1000}
                  src={`/incorrect.png`}
                  alt="Incorrect"
                  className="h-60 md:h-full md:w-full w-auto"
                />
                <h1 className="text-center font-sans font-extrabold text-xl  bg-white">
                  {language === "English" ? "I N C O R R E C T" : hindi.wrong}
                </h1>
              </div>
            )}
            <Link
              href="/quiz"
              className="bg-blue-600 block text-center md:inline text-white rounded-2xl
               p-8 px-12 mt-5 text-4xl rounded-half shadow shadow-gray-500 hover:brightness-75 w-xl font-sans"
            >
              <button>{language === "English" ? "Menu" : hindi.menu}</button>
            </Link>
            {isCorrect === "YES" && (
              <button
                onClick={handleNextClick}
                className="bg-green-500 block text-center md:inline text-white rounded-2xl
                p-8 px-12 mt-5 text-4xl rounded-half shadow shadow-gray-500 hover:brightness-75 w-xl font-sans"
              >
                {language === "English" ? "Next Question" : hindi.nextQustion}
              </button>
            )}
            {isCorrect === "NO" && (
              <button
                onClick={() => setIsCorrect("CLEAR")}
                className="bg-red-500 text-center md:inline text-white rounded-2xl
                 p-8 px-12 mt-5 text-4xl rounded-half shadow shadow-gray-500 hover:brightness-75 w-xl font-sans"
              >
                {language === "English" ? "Try Again" : hindi.tryAgain}
              </button>
            )}
            {isCorrect === "FINISH" && (
              <button
                onClick={() => {
                  router.push(K.Links.Quiz);
                }}
                className="bg-purple-600 text-center md:inline text-white rounded-2xl
                 p-8 px-12 mt-5 text-4xl rounded-half shadow shadow-gray-500 hover:brightness-75 w-xl font-sans"
              >
                {language === "English" ? "FINISH" : hindi.right}
                {/*  hindi for this */}
              </button>
            )}
            {isCorrect === "YES" && (
              <h1 className="col-start-2 col-span-2 text-4xl">
                {language === "English" ? "YOU WIN 300 COINS" : hindi.win}
              </h1>
            )}
            {isCorrect === "FINISH" && (
              <h1 className="col-start-2 col-span-2 text-4xl">
                {language === "English" ? "YOU FINISHED THE QUIZ" : hindi.win}
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
