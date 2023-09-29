import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { getUser, getStorylines, SessionType } from '../utility'
import { StorylineSchema } from '../../models/storylines'
import { UserType } from '../../models/user'

export default async function Profile() {
  const data: SessionType | null = await getServerSession(options)
  if (data) {
    const user: UserType = await getUser(data.user.userId);
    const storylines: Array<StorylineSchema> = await getStorylines(user.language)
    console.log(user)

    return (
      <div className="bg-gray-300 container rounded-3xl p-3 my-28">
        <h1 className="text-5xl text-center font-sans">
          Profile
        </h1>
        <img src={JSON.stringify(user.image).slice(1, -1)} alt="mdo" width="100" height="100" className="rounded-circle" />
        <h1 className="mt-3 mb-5"> Hello {user.nickname}</h1>
        {storylines.map((storyline: StorylineSchema) => (
          <div key={storyline.storyline_number}>
            <h1>Storyline 1 Progress</h1>
            <p>{user.progress.completed_questions[storyline.storyline_number - 1]} out of {storyline.questions} questions</p>
          </div>
        ))}
      </div>
    )

  }
}
