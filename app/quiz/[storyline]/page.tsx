import Card from './card'

export default async function Page({ params }: { params: { storyline: string } }) {
  const sln = Number(params.storyline)
  const title = "saf";
  const description = "saf";
  return (
    <div>
        <Card
          storylineNumber={sln}
          title={title}
          description={description}
        />
    </div>
  )
}

// api call to fetch the storyline
