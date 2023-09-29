import Image from 'next/image'
import Link from 'next/link'
import { SessionType } from '../utility'
import { UserType } from '@/models/user'

export default async function Card(
  { storylineNumber, description, title, questions, data, user }:
    { storylineNumber: number, description: string, title: string, questions: number, data: SessionType | null, user : UserType }) {
  if (!data) {
    return (<div></div>)
  }

  return (
    <div className="container mx-auto my-14 w-2/3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pb-0 rounded-lg border shadow-lg">
        <div className="p-3 md:p-5 md:pt-3">
          <h1 className="text-4xl font-bold text-body-emphasis">
            {title}
          </h1>
          <h1 className="text-2xl font-bold my-5 text-body-emphasis">
            Storyline {storylineNumber}
          </h1>
          <p className="text-xl">
            {description}
          </p>
          <a href={`/quiz/${storylineNumber}`}>
            <button className="bg-blue-500 text-white p-2 px-5 mt-5 rounded-full shadow shadow-gray-500 hover:brightness-75 w-1/2">
              Go to
            </button>
          </a>
          <div className="bg-green-600 text-white p-2 px-5 my-5 rounded-full w-1/2 text-center">
            Progress {user.progress.completed_questions[storylineNumber - 1]}/{questions}
          </div>

          <div className="grid gap-2 md:flex md:justify-start mb-4 md:mb-3">
          </div>
        </div>
        <div className="hidden md:block pb-4">
          <Image
            className="rounded-lg object-cover float-right"
            src={`/path${storylineNumber}.jpg`}
            alt=""
            height="720"
            width="300" />
        </div>
      </div>
    </div>
  )
}
// <a href={`/play/storyline1/${questionsl1.questionNumber}`} className="bg-primary text-white text-lg px-4 py-2 md:mr-2 font-bold rounded-lg">Storyline 1</a>
// <button type="button" className="bg-transparent border border-primary text-primary text-lg px-4 py-2 gap-3">{`${user.progress.storyline1}/7`}</button>

