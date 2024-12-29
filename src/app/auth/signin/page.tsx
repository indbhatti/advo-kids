"use client";
import SignInCard from "../signincard";
import Form from "../form";
import { signIn } from "next-auth/react";
import { K } from "@/util/constants";
import { useState } from "react";

export default function Signin() {
  const [loading, setLoading] = useState(false);
  async function submit({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      setLoading(true);
      await signIn("credentials", {
        redirect: true,
        email: username,
        password: password,
        callbackUrl: K.Links.Quiz,
      });
      setLoading(false);
    } catch (error) {
      console.error("An error occurred", error);
    }
  }

  const handleClick = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: K.Links.Quiz });
  };
  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-200 my-14 rounded-xl p-14">
      <h1 className="text-5xl">Sign In</h1>
      <Form submit={submit} loading={loading} />
      <SignInCard handleClick={handleClick} loading={loading} />
    </div>
  );
}
