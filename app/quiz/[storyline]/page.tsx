import QuizLogic from "./quizLogic";
import { getUserById } from "@/server-actions/serveractions";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Session, getServerSession } from "next-auth";
import { SimpleUser } from "@/models/user";

export default async function Quiz({
  params,
}: {
  params: { storyline: string };
}) {
  const storylineNumber = Number(params.storyline);

  const data: Session | null = await getServerSession(options);
  if (data?.user?.userId) {
    const user: SimpleUser | null = await getUserById(data.user.userId);
    if (user) {
      return (
        <div className="container my-10">
          <QuizLogic storylineNumber={storylineNumber} user={user} />
        </div>
      );
    }
  } else {
    return <div>Login In</div>;
  }
}
