import { resetProgress } from "@/serverActions/user";
import { K } from "@/util/constants";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function Reset({
  userId,
  storylineId,
}: {
  userId: string;
  storylineId: string;
}) {
  const handleSubmit = async () => {
    "use server";
    const result = await resetProgress(userId, storylineId);
    if (result?.status === 200) {
      revalidatePath(K.Links.Quiz);
      redirect(`${K.Links.Quiz}/${storylineId}`);
    }
  };
  return (
    <form action={handleSubmit}>
      <button
        className="bg-purple-700 text-white p-2 px-5 mt-5 rounded-full shadow
           shadow-gray-500 hover:brightness-75 w-1/2"
      >
        Reset And Play Again
      </button>
    </form>
  );
}
