export default function Page({ params }: { params: { question: string, storyline: string } }) {
  return <div>{params.question} {params.storyline}</div>
}

//api call to fetch the question
