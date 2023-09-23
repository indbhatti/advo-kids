import Card from './card'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { getStorylines } from '../utility'

export default async function play() {
  const data = await getServerSession(options)
  let lan = 'English'
  const storylines = await getStorylines(lan)
  return (
    <div>
      {storylines.map(({ storyline_number, description, title, questions }: { storyline_number: number, description: string, title: string, questions: number }) => (
        <Card
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
