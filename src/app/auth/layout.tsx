import { auth } from "@/auth";
import Loading from "@/components/loading";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function Auth({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <>{children}</>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      <Auth>{children}</Auth>
    </Suspense>
  );
}
