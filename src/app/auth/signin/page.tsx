"use client";
import SignInCard from "../signincard";
import Form from "../form";
import { signIn } from "next-auth/react";
import { K } from "@/util/constants";

export default function Signin() {
  async function submit({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      await signIn("credentials", {
        redirect: true,
        email: username,
        password: password,
        callbackUrl: K.Links.Quiz,
      });
    } catch (error) {
      console.error("An error occurred", error);
    }
  }
  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-200 my-14 rounded-xl p-14">
      <h1 className="text-5xl">Sign In</h1>
      <Form submit={submit} />
      <SignInCard auth="Google" />
    </div>
  );
}
