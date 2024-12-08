import Image from "next/image";
import Link from "next/link";
import Reset from "./reset";

/// FIXFIX SOTYRLINE NUMBER
export default async function Card({
  storylineId,
  description,
  title,
  progress,
  noOfQuestions,
  userId,
}: {
  storylineId: string;
  description: string;
  title: string;
  progress?: number;
  noOfQuestions?: number;
  userId?: string;
}) {
  return (
    <div
      className="container mx-auto my-14 flex flex-col-reverse sm:flex-row
     items-center sm:items-start justify-between rounded-lg border shadow-lg p-10"
    >
      <div className="sm:w-1/2 flex flex-col h-full">
        <h1 className="text-4xl font-extrabold text-body-emphasis my-5">
          {title}
        </h1>
        <p className="text-xl">{description}</p>
        {noOfQuestions && (
          <div className="w-full mt-5">
            <div className="flex justify-between mb-1">
              <span className="text-base font-medium text-blue-700">
                Progress
              </span>
              <span className="text-sm font-medium text-blue-700">
                {progress || 0}/{noOfQuestions}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${((progress || 0) / noOfQuestions) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        {progress === noOfQuestions && progress && noOfQuestions && userId ? (
          <Reset
            userId={userId.toString()}
            storylineId={storylineId.toString()}
          />
        ) : (
          <Link href={`/quiz/${storylineId}`}>
            <button
              className="bg-blue-500 text-white p-2 px-5 mt-5 rounded-full shadow
           shadow-gray-500 hover:brightness-75 w-1/2"
            >
              Go to
            </button>
          </Link>
        )}
      </div>
      <div className="h-20 sm:h-full overflow-hidden rounded-lg float-right mx-2">
        <Image
          src={`/storyline_card/${storylineId}.jpg`}
          alt="Storyline card"
          height="720"
          width="300"
        />
      </div>
    </div>
  );
}
