import Card from "./card";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { getStorylines } from "@/serverActions/storyline";
import { auth } from "@/auth";
import { K } from "@/util/constants";
import { redirect } from "next/navigation";
import { getUserById } from "@/serverActions/user";
import { SimpleStoryline } from "@/models/storylines";

async function play() {
  const language = "English";
  const session = await auth();
  const storylines = await getStorylines(language);

  if (!storylines) {
    console.error("Stoyrline not found");
    redirect(K.Links.Home);
  }

  if (session && session.user && session.user.id) {
    const user = await getUserById(session.user.id);
    if (user) {
      return (
        <div>
          {storylines.map(
            ({ _id, description, title, questions }: SimpleStoryline) => (
              <Card
                key={_id}
                storylineId={_id}
                title={title}
                description={description}
                progress={user.progress[_id]}
                noOfQuestions={questions}
                userId={user._id}
              />
            )
          )}
        </div>
      );
    }
  }

  return (
    <div>
      {storylines.map(
        ({
          _id,
          description,
          title,
        }: {
          _id: string;
          description: string;
          title: string;
        }) => (
          <Card
            key={_id}
            storylineId={_id}
            title={title}
            description={description}
          />
        )
      )}
    </div>
  );
}

export default function Page() {
  return <Suspense fallback={<Loading />}>{play()}</Suspense>;
}
