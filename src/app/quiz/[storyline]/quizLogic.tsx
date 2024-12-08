"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SimpleQuestion } from "@/models/questions";
import hindi from "@/hindi";
import { SimpleUser } from "@/models/user";
import IsCorrect from "./isCorrect";
import Video from "./video";
import { correct, getQuestion } from "@/serverActions/question";
import Loading from "@/components/loading";
import { K } from "@/util/constants";

export default function QuizLogic({
  user,
  storylineId,
}: {
  user: SimpleUser;
  storylineId: string;
}) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<SimpleQuestion>();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState<number>(
    user.progress[storylineId] || 0
  );
  const language = "English";

  useEffect(() => {
    const setQ = async () => {
      const question: SimpleQuestion | null = await getQuestion(
        language,
        storylineId,
        currentQuestionNumber
      );
      if (question) {
        setCurrentQuestion(question);
      } else {
        // Redirect if the question number is higher than the total number of questions
        router.push(K.Links.Quiz);
      }
    };
    setQ();
  }, [currentQuestionNumber, storylineId]);

  const [selectedOption, setSelectedOption] = useState(0);
  const [isCorrect, setIsCorrect] = useState<string>("CLEAR");

  if (currentQuestion != undefined) {
    const handleClick = async () => {
      if (selectedOption === currentQuestion.answer) {
        try {
          const response = await correct(
            user._id,
            storylineId,
            currentQuestion.questionNumber
          );
          if (response?.status === 200) {
            setIsCorrect("YES");
          }
          if (response?.status === 409) {
            setIsCorrect("FINISH");
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setIsCorrect("NO");
      }
    };

    const handleNextClick = () => {
      setIsCorrect("CLEAR");
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    };

    const handleOptionClick = (option: number) => {
      setSelectedOption(option);
    };

    return (
      <div className="container bg-opacity-30 bg-gray-300 p-1 rounded-3xl">
        <IsCorrect
          language={language}
          isCorrect={isCorrect}
          setIsCorrect={setIsCorrect}
          handleNextClick={handleNextClick}
        />

        <div className="m-5">
          <Video
            src={`/question_videos/${language}/${currentQuestion.storylineId}/${currentQuestion.questionNumber}.mp4`}
          />
          <h1 className="text-5xl mt-5 font-sans font-extrabold">
            {language === "English" ? "Question" : hindi.quesiton}{" "}
            {currentQuestion.questionNumber}:
          </h1>
          <p className="text-xl my-5 font-sans font-bold">
            {currentQuestion.questionStatement}
          </p>

          <div className="flex flex-col md:grid md:grid-cols-4 my-4 gap-4">
            <button
              className={`text-white md:col-span-2 rounded-xl p-3 shadow shadow-gray-500 
                 transition text-xl font-bold font-sans ease-in-out hover:opacity-90 active:brightness-150 ${
                   selectedOption === 1 ? "bg-green-500" : "bg-yellow-500"
                 }`}
              onClick={() => handleOptionClick(1)}
            >
              <span className="text-black">A.</span> {currentQuestion.option1}
            </button>
            <button
              className={`md:col-span-2 text-white rounded-xl p-3 shadow shadow-gray-500
                 transition text-xl font-bold font-sans ease-in-out hover:opacity-90 active:brightness-150 ${
                   selectedOption === 2 ? "bg-green-500" : "bg-yellow-500"
                 }`}
              onClick={() => handleOptionClick(2)}
            >
              <span className="text-black">B.</span> {currentQuestion.option2}
            </button>
            <button
              className={`md:col-span-2 rounded-xl text-white p-3 shadow shadow-gray-500
                 text-xl font-bold transition font-sans ease-in-out hover:opacity-90 active:brightness-150 ${
                   selectedOption === 3 ? "bg-green-500" : "bg-yellow-500"
                 }`}
              onClick={() => handleOptionClick(3)}
            >
              <span className="text-black">C.</span> {currentQuestion.option3}
            </button>
            <button
              className={`md:col-span-2 rounded-xl p-3 shadow text-white shadow-gray-500 
                text-xl font-bold font-sans transition ease-in-out hover:opacity-90 active:brightness-150 ${
                  selectedOption === 4 ? "bg-green-500" : "bg-yellow-500"
                }`}
              onClick={() => handleOptionClick(4)}
            >
              <span className="text-black">D.</span> {currentQuestion.option4}
            </button>
            {currentQuestion.questionNumber == 0 && (
              <button
                className="rounded-xl p-3 px-6 mt-4 text-white font-sans shadow font-bold 
                text-xl shadow-gray-500 transition ease-in-out active:brightness-150"
                onClick={() => {
                  setCurrentQuestionNumber(currentQuestionNumber - 1);
                }}
              >
                {language === "English" ? "Go back" : hindi.goBack}
              </button>
            )}
            <button
              className="col-start-4 rounded-xl bg-blue-600 p-3 px-6 mt-4 text-white font-bold text-xl shadow shadow-gray-500 transition ease-in-out active:brightness-150"
              onClick={() => {
                handleClick();
              }}
            >
              {language === "English" ? "Submit" : hindi.submit}
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="rounded-3xl overflow-hidden h-full bg-gray-100">
        <Loading />;
      </div>
    );
  }
}
