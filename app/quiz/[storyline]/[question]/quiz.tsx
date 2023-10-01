'use client'
import { useState } from 'react'
import { QuestionSchema } from '../../../../models/questions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import hindi from '../../../../hindi'

export default function Options({ question, username, params, language }:
  { question: QuestionSchema, username: string, params: { question: string, storyline: string }, language: string },) {

  const [selectedOption, setSelectedOption] = useState(0);
  const [isCorrect, setIsCorrect] = useState("CLEAR");
  const router = useRouter();

  const handleClick = async () => {
    if (selectedOption === question.answer) {
      const dataToPost = { username: username, number: question.questionNumber, storylineNumber: question.storylineNumber }
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
    router.push(`/quiz/${params.storyline}/${Number(params.question) + 1}`)
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
          <div className="container bg-kids z-20 fixed rounded-3xl p-8 h-xxl md:grid flex flex-col grid-cols-3 place-items-center font-sans font-extrabold">
            {isCorrect === "YES" ?
              // <h1 className="text-5xl pb-10 col-span-2 font-sans">GOOD JOB!! YOU ARE CORRECT</h1>
              <div className="row-span-2"><img src={`/correct.png`} alt="Correct" />
                <h1 className='text-center font-sans font-extrabold text-xl  bg-white'>
                  {language === "English" ? "C O R R E C T !" : hindi.right}
                </h1>
              </div>
              :
              <div>
                <img src={`/incorrect.png`} alt="Incorrect" />
                <h1 className='text-center font-sans font-extrabold text-xl  bg-white'>
                  {language === "English" ? "I N C O R R E C T" : hindi.wrong}
                </h1>
              </div>
            }
            <Link
              href="/selection-menu"
              className="bg-bluekid block text-center md:inline  text-white p-8 px-12 mt-5 text-4xl rounded-half shadow shadow-gray-500 hover:brightness-75 w-xl font-sans">
              <button>
                {language === "English" ? "Menu" : hindi.menu}
              </button>
            </Link>
            {isCorrect === "YES" ?
              <button
                onClick={handleNextClick}
                className="bg-green-500 block text-center md:inline text-white p-8 px-12 mt-5 text-4xl rounded-half shadow shadow-gray-500 hover:brightness-75 w-xl font-sans">
                {language === "English" ? "Next Question" : hindi.nextQustion}
              </button>
              :
              <button
                onClick={() => (setIsCorrect("CLEAR"))}
                className="bg-red-500 text-center md:inline text-white p-8 px-12 mt-5 text-4xl rounded-half shadow shadow-gray-500 hover:brightness-75 w-xl font-sans">
                {language === "English" ? "Try Again" : hindi.tryAgain}
              </button>
            }
            {isCorrect === "YES" &&
              <h1
                className="col-start-2 col-span-2 text-4xl">
                {language === "English" ? "YOU WIN 300 COINS" : hindi.win}
              </h1>
            }
          </div>
        </div>
      }

      <div className="m-5">
        {/* <img
            className="rounded-lg object-cover float-right"
            src={`/background.png`}
            alt=""
          /> */}
        <div className="rounded-xl overflow-hidden flex justify-center items-center font-sans ">
          <video autoPlay controls width="100%">
            <source
              src={`/question_videos/${language}/sl${params.storyline}/${question.questionNumber}.mp4`}
              type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <h1 className="text-5xl mt-5 font-sans font-extrabold">{language === "English" ? "Question" : hindi.quesiton} {question.questionNumber}:</h1>
        <p className="text-xl my-5 font-sans font-bold">{question.questionStatement}</p>

        <div className="grid grid-cols-4 my-4 gap-4">
          <button
            className={`text-white col-span-2 rounded-xl p-3 shadow shadow-gray-500 transition text-xl font-bold font-sans ease-in-out hover:opacity-90 active:brightness-150 ${selectedOption === 1 ? 'bg-green-500' : 'bg-darkkids'}`}
            onClick={() => handleOptionClick(1)}
          >
            <span className="text-black">A.</span> {question.option1}
          </button>
          <button
            className={`col-span-2  text-white rounded-xl p-3 shadow shadow-gray-500 transition text-xl font-bold font-sans ease-in-out hover:opacity-90 active:brightness-150 ${selectedOption === 2 ? 'bg-green-500' : 'bg-darkkids'}`}
            onClick={() => handleOptionClick(2)}
          >
            <span className="text-black">B.</span> {question.option2}
          </button>
          <button
            className={`col-span-2 rounded-xl text-white p-3 shadow shadow-gray-500 text-xl font-bold transition font-sans ease-in-out hover:opacity-90 active:brightness-150 ${selectedOption === 3 ? 'bg-green-500' : 'bg-darkkids'}`}
            onClick={() => handleOptionClick(3)}
          >
            <span className="text-black">C.</span> {question.option3}
          </button>
          <button
            className={`col-span-2 rounded-xl p-3 shadow text-white shadow-gray-500 text-xl font-bold font-sans transition ease-in-out hover:opacity-90 active:brightness-150 ${selectedOption === 4 ? 'bg-green-500' : 'bg-darkkids'}`}
            onClick={() => handleOptionClick(4)}
          >
            <span className="text-black">D.</span> {question.option4}
          </button>
          {params.question != "1" &&
            <button
              className="rounded-xl bg-kid p-3 px-6 mt-4 text-white font-sans shadow font-bold text-xl shadow-gray-500 transition ease-in-out active:brightness-150"
              onClick={() => {
                router.push(`/quiz/${params.storyline}/${Number(params.question) + -1}`)
              }}>
              {language === "English" ? "Go back" : hindi.goBack}
            </button>
          }
          <button
            className="col-start-4 rounded-xl bg-bluekid p-3 px-6 mt-4 text-white font-bold text-xl shadow shadow-gray-500 transition ease-in-out active:brightness-150"
            onClick={() => { handleClick() }}>
            {language === "English" ? "Submit" : hindi.submit}
          </button>
        </div>
      </div>
    </div>

  )
}
