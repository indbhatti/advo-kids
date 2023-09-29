'use client'
import { useState } from 'react'
import { QuestionSchema } from '../../../../models/questions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Options(data: { question: QuestionSchema, username: string, params: { question: string, storyline: string } },) {

  const [selectedOption, setSelectedOption] = useState(0);
  const [isCorrect, setIsCorrect] = useState("CLEAR");
  const { question } = data;
  const router = useRouter();

  const handleClick = async () => {
    if (selectedOption === question.answer) {
      const dataToPost = { username: data.username, number: question.questionNumber, storylineNumber: question.storylineNumber }
      try {
        const response = await fetch("http://localhost:3000/api/correct", {
          method: "POST",
          body: JSON.stringify(dataToPost),
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        console.log(JSON.stringify(response))
        if (response.status === 409) {
          router.push(`/selection-menu/`)
        } else {
          setIsCorrect("YES");
        }

        if (!response.ok) {
          throw new Error('Failed to Post');
        }

      }
      catch (error) {
        console.error('Error Posting:', error);
      }
    } else {
      setIsCorrect("NO")
    }
  }

  const handleNextClick = () => {
    setIsCorrect("CLEAR");
    router.push(`/quiz/${data.params.storyline}/${Number(data.params.question) + 1}`)
  }

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
  };

  return (
    <div className="container bg-opacity-30 bg-gray-300 p-1 rounded-3xl">
      {isCorrect != "CLEAR" &&
        <div>
          <div className="bg-black opacity-70 z-10 h-screen w-screen fixed left-0 top-0">
          </div>
          <div className="container bg-white z-20 fixed rounded-3xl p-3 h-1/2 md:grid flex flex-col grid-cols-2 place-items-center">
            {isCorrect === "YES" ?
              <h1 className="text-5xl pb-10 col-span-2">GOOD JOB!! YOU ARE CORRECT</h1>
              :
              <h1 className="text-5xl pb-10 col-span-2">NOT CORRECT!!</h1>
            }
            <Link
              href="/selection-menu"
              className="bg-blue-500 block text-center md:inline text-white p-2 px-5 mt-5 rounded-full shadow shadow-gray-500 hover:brightness-75 w-1/2">
              <button>
                Menu
              </button>
            </Link>
            {isCorrect === "YES" ?
              <button
                onClick={handleNextClick}
                className="bg-blue-500 text-white p-2 px-5 mt-5 rounded-full shadow shadow-gray-500 hover:brightness-75 w-1/2">
                Next Question
              </button>
              :
              <button
                onClick={() => (setIsCorrect("CLEAR"))}
                className="bg-blue-500 text-white p-2 px-5 mt-5 rounded-full shadow shadow-gray-500 hover:brightness-75 w-1/2">
                Try Again
              </button>
            }
          </div>
        </div>
      }
      <div className="m-5">
        <div className="rounded-xl overflow-hidden flex justify-center items-center">
          <video autoPlay controls width="100%">
            <source
              src={`/question_videos/sl${data.params.storyline}/${question.questionNumber}.mp4`}
              type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <h1 className="text-4xl mt-5">Question {question.questionNumber}:</h1>
        <p className="text-xl my-5">{question.questionStatement}</p>

        <div className="grid grid-cols-4 my-4 gap-4">
          <button
            className={`col-span-2 rounded-xl p-3 shadow shadow-gray-500 transition ease-in-out hover:opacity-90 active:brightness-150 ${selectedOption === 1 ? 'bg-green-500' : 'bg-kids'}`}
            onClick={() => handleOptionClick(1)}
          >
            {question.option1}
          </button>
          <button
            className={`col-span-2 rounded-xl p-3 shadow shadow-gray-500 transition ease-in-out hover:opacity-90 active:brightness-150 ${selectedOption === 2 ? 'bg-green-500' : 'bg-kids'}`}
            onClick={() => handleOptionClick(2)}
          >
            {question.option2}
          </button>
          <button
            className={`col-span-2 rounded-xl p-3 shadow shadow-gray-500 transition ease-in-out hover:opacity-90 active:brightness-150 ${selectedOption === 3 ? 'bg-green-500' : 'bg-kids'}`}
            onClick={() => handleOptionClick(3)}
          >
            {question.option3}
          </button>
          <button
            className={`col-span-2 rounded-xl p-3 shadow shadow-gray-500 transition ease-in-out hover:opacity-90 active:brightness-150 ${selectedOption === 4 ? 'bg-green-500' : 'bg-kids'}`}
            onClick={() => handleOptionClick(4)}
          >
            {question.option4}
          </button>
          {data.params.question != "1" &&
            <button
              className="rounded-xl bg-blue-600 p-3 px-6 mt-4 shadow shadow-gray-500 transition ease-in-out active:brightness-150"
              onClick={() => {
                router.push(`/quiz/${data.params.storyline}/${Number(data.params.question) + -1}`)
              }}>
              Go back
            </button>
          }
          <button className="col-start-4 rounded-xl bg-blue-600 p-3 px-6 mt-4 shadow shadow-gray-500 transition ease-in-out active:brightness-150" onClick={() => { handleClick() }}>Submit</button>
        </div>
      </div>
    </div>

  )
}
