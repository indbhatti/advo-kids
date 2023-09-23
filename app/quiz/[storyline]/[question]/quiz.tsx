'use client'
import { useState } from 'react'
import { QuestionSchema } from '../../../../models/questions'
import { useRouter } from 'next/navigation'

export default function Options(data: { question: QuestionSchema, username: string, params: { question: string, storyline: string }}, ) {

  const [selectedOption, setSelectedOption] = useState(0);
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

        if (!response.ok) {
          throw new Error('Failed to Post');
        }
        if (question.questionNumber === 7) {
          router.push(`/selection-menu/`)
        } else {
          router.push(`/quiz/${data.params.storyline}/${Number(data.params.question) + 1}`)
        }
      }
      catch (error) {
        console.error('Error Posting:', error);
      }
    } else {
      alert("WRONG")
    }
  }
  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
    console.log(selectedOption);
  };

  return (
    <div className="container bg-opacity-30 bg-gray-300 p-1 rounded-3xl">
      <div className="m-5">
        <div className="rounded-xl overflow-hidden">
          <video autoPlay controls width="100%">
            <source src={`/question_videos/sl1/${question.questionNumber}.mp4`} type="video/mp4" />
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
          <button className="col-span-2 col-start-2 rounded-xl bg-blue-600 p-3 px-6 mt-4 shadow shadow-gray-500 transition ease-in-out active:brightness-150" onClick={() => { handleClick() }}>Submit</button>
        </div>
      </div>
    </div>

  )
}
