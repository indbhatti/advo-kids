import Card from './card'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { getStorylines } from '../utility'
import { StorylineSchema } from "../../models/storylines"
import { SessionType } from '../utility'

export default async function play() {
  const data: SessionType | null = await getServerSession(options)
  let lan = 'English'
  const storylines: Array<StorylineSchema> = await getStorylines(lan)
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
        />
      ))}
    </div>
  )
}
