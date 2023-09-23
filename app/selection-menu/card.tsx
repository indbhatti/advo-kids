import Image from 'next/image'
export default function Card(
  { storylineNumber, description, title }:
    { storylineNumber: number, description: string, title: string }) {
  return (
    <div className="container mx-auto my-14 w-2/3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 pb-0 rounded-lg border shadow-lg">
        <div className="p-3 md:p-5 md:pt-3">
          <h1 className="text-4xl font-bold text-body-emphasis">
            {title}
          </h1>
          <h1 className="text-2xl font-bold my-5 text-body-emphasis">
            Storyline {storylineNumber}
          </h1>
          <p className="text-xl">
            {description}
          </p>
          <div className="grid gap-2 md:flex md:justify-start mb-4 md:mb-3">
          </div>
        </div>
        <div className="hidden md:block pb-4">
          <Image
            className="rounded-lg object-cover float-right"
            src={`/path${storylineNumber}.jpg`}
            alt=""
            height="720"
            width="300" />
        </div>
      </div>
    </div>
  )
}
// <a href={`/play/storyline1/${questionsl1.questionNumber}`} className="bg-primary text-white text-lg px-4 py-2 md:mr-2 font-bold rounded-lg">Storyline 1</a>
// <button type="button" className="bg-transparent border border-primary text-primary text-lg px-4 py-2 gap-3">{`${user.progress.storyline1}/7`}</button>

