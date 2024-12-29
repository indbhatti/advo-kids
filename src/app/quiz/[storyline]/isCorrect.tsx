import hindi from "@/hindi";
import { K } from "@/util/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type props = {
  loading: boolean;
  language: string;
  isCorrect: string;
  handleNextClick: () => void;
  setIsCorrect: (type: string) => void;
};

export default function IsCorrect({
  loading,
  language,
  isCorrect,
  handleNextClick,
  setIsCorrect,
}: props) {
  const router = useRouter();

  useEffect(() => {
    // Disable background scrolling
    if (isCorrect != "CLEAR") {
      document.body.style.overflow = "hidden";
    }
    return () => {
      // Re-enable background scrolling when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  function ImageComp({
    src,
    alt,
    title,
    hindiTitle,
  }: {
    src: string;
    alt: string;
    title: string;
    hindiTitle: string;
  }) {
    return (
      <div className="">
        <Image width={500} height={500} src={src} alt={alt} />
        <h1 className="text-center font-extrabold text-xl bg-white">
          {language === "English" ? title : hindiTitle}
        </h1>
      </div>
    );
  }

  function ButtonComp({
    title,
    hindiTitle,
    className,
    onClick = () => {},
  }: {
    title: string;
    hindiTitle: string;
    className?: string;
    onClick?: () => void;
  }) {
    return (
      <button
        onClick={onClick}
        className={`${className} text-white rounded-3xl md:py-6 sm:px-10 sm:text-2xl
         shadow shadow-gray-500 text-nowrap py-2 px-4`}
      >
        {language === "English" ? title : hindiTitle}
      </button>
    );
  }
  return (
    <>
      {isCorrect != "CLEAR" && (
        <div className="fixed inset-0 h-screen w-screen bg-[#0000005c] z-50 flex justify-center items-center">
          <div className="bg-yellow-400 z-50 p-10 rounded-3xl font-extrabold">
            {isCorrect === "YES" && (
              <ImageComp
                src={`/correct.png`}
                alt="Correct"
                title="C O R R E C T !"
                hindiTitle={hindi.right}
              />
            )}
            {isCorrect === "FINISH" && (
              <ImageComp
                src={`/correct.png`}
                alt="Correct"
                title="F I N I S H !"
                hindiTitle={hindi.right}
              />
            )}
            {isCorrect === "NO" && (
              <ImageComp
                src={`/incorrect.png`}
                alt="Incorrect"
                title="I N C O R R E C T !"
                hindiTitle={hindi.wrong}
              />
            )}
            <div className="flex justify-between pt-8">
              <Link
                href="/quiz"
                className="bg-blue-600 text-white rounded-3xl py-2 px-4
               sm:py-6 sm:px-10 sm:text-2xl shadow shadow-gray-500 hover:brightness-75"
              >
                <button>{language === "English" ? "Menu" : hindi.menu}</button>
              </Link>
              {loading && (
                <ButtonComp
                  title={"Loading..."}
                  hindiTitle={hindi.nextQuestion}
                  className="bg-gray-500 cursor-default"
                />
              )}
              {!loading && isCorrect === "YES" && (
                <ButtonComp
                  title={"Next Question"}
                  hindiTitle={hindi.nextQuestion}
                  className="bg-green-500 hover:bg-green-600"
                  onClick={handleNextClick}
                />
              )}
              {!loading && isCorrect === "NO" && (
                <ButtonComp
                  title={"Try Again"}
                  hindiTitle={hindi.tryAgain}
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => setIsCorrect("CLEAR")}
                />
              )}
              {!loading && isCorrect === "FINISH" && (
                <ButtonComp
                  title={"FINISH"}
                  hindiTitle={hindi.right}
                  className="bg-purple-500 hover:bg-purple-600"
                  onClick={() => {
                    router.push(K.Links.Quiz);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
