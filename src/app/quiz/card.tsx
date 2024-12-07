import Image from "next/image";
import Link from "next/link";

// fix the image path
export default async function Card({
  storylineId,
  storylineNumber,
  description,
  title,
}: {
  storylineId: string;
  storylineNumber: number;
  description: string;
  title: string;
}) {
  return (
    <div
      className="container mx-auto my-14 flex flex-col-reverse sm:flex-row
     items-center sm:items-start justify-between rounded-lg border shadow-lg p-10"
    >
      <div className="sm:w-1/2 flex flex-col h-full">
        <h1 className="text-4xl font-extrabold text-body-emphasis">{title}</h1>
        <h1 className="text-2xl font-bold my-5 text-body-emphasis">
          Storyline {storylineNumber}
        </h1>
        <p className="text-xl ">{description}</p>
        <Link href={`/quiz/${storylineId}`}>
          <button
            className="bg-blue-500 text-white p-2 px-5 mt-5 rounded-full shadow
           shadow-gray-500 hover:brightness-75 w-1/2"
          >
            Go to
          </button>
        </Link>
      </div>
      <div className="h-20 sm:h-full overflow-hidden rounded-lg float-right mx-2">
        <Image
          src={`/path${storylineNumber}.jpg`}
          alt=""
          height="720"
          width="300"
        />
      </div>
    </div>
  );
}
