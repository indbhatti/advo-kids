import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { SimpleStoryline, StorylineSchema } from "../../models/storylines";
import { SimpleUser } from "../../models/user";
import { getStorylines, getUserById } from "@/server-actions/serveractions";
import { Session } from "next-auth";

export default async function Profile() {
  const data: Session | null = await getServerSession(options);
  if (data) {
    const user: SimpleUser | null = await getUserById(data.user.userId);
    if (user) {
      const storylines: Array<SimpleStoryline> | null = await getStorylines(
        user.language,
      );
      return (
        <div className="bg-gray-300 container rounded-3xl p-3 my-28">
          <h1 className="text-5xl text-center">Profile</h1>
          <img
            src={JSON.stringify(user.image).slice(1, -1)}
            alt="mdo"
            width="100"
            height="100"
            className="rounded-circle"
          />
          <h1 className="mt-3 mb-5"> Hello {user.nickname}</h1>
          {storylines &&
            storylines.map((storyline: SimpleStoryline) => (
              <div key={storyline.storyline_number}>
                <h1>Storyline 1 Progress</h1>
                <p>
                  {
                    user.progress.completed_questions[
                      storyline.storyline_number - 1
                    ]
                  }{" "}
                  out of {storyline.questions} questions
                </p>
              </div>
            ))}
        </div>
      );
    }
  } else {
    return <div>ERROR</div>;
  }
}
