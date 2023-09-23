import Card from './card'
import { options } from '../../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { getStoryline } from '../../utility'

export default async function Page({ params }: { params: { storyline: string } }) {
  const data = await getServerSession(options)
  const storyline = await getStoryline(Number(params.storyline))
  return (
    <div>
      <Card
        storylineNumber={storyline.storyline_number}
        title={storyline.title}
        description={storyline.description}
        questions={storyline.questions}
        language={storyline.language}
        data={data}
      />
    </div>
  )

}
