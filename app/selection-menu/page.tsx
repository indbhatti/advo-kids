import Card from './card'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { getStorylines, getUser } from '../utility'
import { StorylineSchema } from "../../models/storylines"
import { SessionType } from '../utility'
import { UserType } from '@/models/user'

export default async function play() {
  const data: SessionType | null = await getServerSession(options)
  let user: UserType | null = null
  if (data) {
    user = await getUser(data.user.userId)
  }
  if (!data || !user) {
    return (<div>ERROR</div>)
  }

  if (user) {
    const storylines: Array<StorylineSchema> = await getStorylines(user.language)
    return (
      <div>
        {storylines.map(({ storyline_number, description, title, questions }: { storyline_number: number, description: string, title: string, questions: number }) => (
          <Card
            key={storyline_number}
            storylineNumber={storyline_number}
            title={title}
            description={description}
            questions={questions}
            data={data}
            user={user}
          />
        ))}
      </div>
    )
  }
}
