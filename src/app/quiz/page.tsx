import Card from "./card";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { getStorylines } from "@/serverActions/storyline";

async function play() {
  const language = "English";

  const storylines = await getStorylines(language);

  if (storylines) {
    return (
      <div>
        {storylines.map(
          ({
            _id,
            storyline_number,
            description,
            title,
          }: {
            _id: string;
            storyline_number: number;
            description: string;
            title: string;
          }) => (
            <Card
              key={_id}
              storylineId={_id}
              storylineNumber={storyline_number}
              title={title}
              description={description}
            />
          )
        )}
      </div>
    );
  }
}

export default function Page() {
  return <Suspense fallback={<Loading />}>{play()}</Suspense>;
}
