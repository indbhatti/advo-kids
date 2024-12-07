import QuizLogic from "./quizLogic";
import { SimpleUser } from "@/models/user";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { auth } from "@/auth";
import { getUserById } from "@/serverActions/user";
import { K } from "@/util/constants";
import { redirect } from "next/navigation";

async function Quiz({ params }: { params: Promise<{ storyline: string }> }) {
  const storylineId = (await params).storyline;

  const session = await auth();

  if (session?.user?.id) {
    const user: SimpleUser | null = await getUserById(session.user.id);
    if (user) {
      return (
        <div className="container my-10 mx-auto">
          <QuizLogic storylineId={storylineId} user={user} />
        </div>
      );
    }
  } else {
    redirect(K.Links.SignIn);
  }
}

export default function Page({
  params,
}: {
  params: Promise<{ storyline: string }>;
}) {
  return <Suspense fallback={<Loading />}>{Quiz({ params })}</Suspense>;
}
