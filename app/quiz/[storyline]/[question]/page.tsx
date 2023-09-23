import { options } from '../../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { getUser, getQues } from '../../../utility'
import Quiz from './quiz'

export default async function Page({ params }: { params: { question: string, storyline: string } }) {
  const data = await getServerSession(options)

  const question = await getQues(Number(params.storyline), Number(params.question), "English")
  const user = await getUser(data);


  if (user.progress.current_question[Number(params.storyline) - 1] < params.question) {
    return (
      <div className="bg-gray-300 container rounded-3xl p-3 my-28">
        <h1 className="text-5xl text-center">
           Question Not Unlocked Yet
        </h1>
      </div>
    )
  }


  if (!question) {
    return (
      <div className="bg-gray-300 container rounded-3xl p-3 my-28">
        <h1 className="text-5xl text-center">
          ERROR <br /> Question Not found
        </h1>
      </div>
    )
  }

  if (data && data.user && data.user.email) {
    return (
      <div>
        <div className="container mt-14">
          <Quiz question={question} username={data.user.email} params={params} />
        </div>
      </div>)

  }
}

//api call to fetch the question
