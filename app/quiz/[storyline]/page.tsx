import Link from 'next/link'
import { StorylineSchema } from '../../../models/storylines'
import { UserType } from '../../../models/user'
import { QuestionSchema } from '../../../models/questions'
import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { getStoryline, getUser, getQuestionSet } from '../../utility'

export default async function Page({ params }: { params: { storyline: string } }) {
  const data = await getServerSession(options)
  const user: UserType = await getUser(data.user.userId);
  const storyline: StorylineSchema = await getStoryline(user.language, params.storyline)
  const questions: Array<QuestionSchema> = await getQuestionSet(user.language, params.storyline)
  return (
    <div className="container mx-auto my-14 w-2/3">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pb-0 rounded-lg border shadow-lg">
        <div className="p-3 md:p-5 md:pt-3">
          <h1 className="text-4xl font-extrabold text-body-emphasis font-sans ">
            {storyline.title}
          </h1>
          <h1 className="text-2xl font-bold my-5 text-body-emphasis font-sans ">
            Storyline {storyline.storyline_number}
          </h1>
          <p className="text-xl font-sans ">
            {storyline.description}
          </p>

          <Link href={`/quiz/${storyline.storyline_number}/${user.progress.current_question[storyline.storyline_number - 1]}`}>
            <button className="bg-blue-500 text-white p-2 px-5 mt-5 rounded-lg font-sans shadow shadow-gray-500 hover:brightness-75 w-1/2">
              Play
            </button>
          </Link>
          <div className="bg-green-600 text-white font-bold p-2 px-5 my-5 mb-10 rounded-lg w-1/2 text-center font-sans ">
            Progress {user.progress.completed_questions[storyline.storyline_number - 1]}/{storyline.questions}
          </div>
          {questions.map((question: QuestionSchema) => (
            <div
              key={question.questionNumber}
              className={`p-2 px-5 my-5 rounded-lg font-sans  text-white
                  ${user.progress.completed_questions[storyline.storyline_number - 1] < question.questionNumber ? ("bg-red-500") : ("bg-green-500")}`}
            >
              <div className="flex justify-between items-center font-sans ">
                <div>
                  Question {question.questionNumber}
                </div>
                {user.progress.completed_questions[storyline.storyline_number - 1] + 1 < question.questionNumber ?
                  <div></div>
                  :
                  <Link
                    href={`/quiz/${storyline.storyline_number}/${question.questionNumber}`}
                    className="bg-darkkids px-2 rounded-lg font-sans ">
                    Go to
                  </Link>
                }
              </div>
            </div>
          ))}

          <div className="grid gap-2 md:flex md:justify-start mb-4 md:mb-3">
          </div>
        </div>
        <div className="hidden md:block pb-4">
          <img
            className="rounded-lg object-cover float-right"
            src={`/path${storyline.storyline_number}.jpg`}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
