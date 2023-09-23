import Card from './card'
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'




export default async function play() {
  const data = await getServerSession(options)
  const storylines = [{ storylineNumber: 1, title: "Journey to the school", description: "Journey to the school and the problems that come with that" }, { storylineNumber: 2, title: "School Hustle", description: "hustle" }]
  const items: number[] = [1, 2, 3]
  return (
    <div>
      {storylines.map(({ storylineNumber, description, title }: { storylineNumber: number, description: string, title: string }) => (
        <Card
          storylineNumber={storylineNumber}
          title={title}
          description={description}
        />
      ))}
    </div>
  )
}


// Make a api call to storylines to get array of storyline
