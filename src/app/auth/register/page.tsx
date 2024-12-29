"use client";
import { register } from "@/serverActions/auth";
import SignInCard from "../signincard";
import Form from "./form";
import { signIn } from "next-auth/react";
import { K } from "@/util/constants";
import { useState } from "react";

export default function Register() {
  const [loading, setLoading] = useState(false);
  async function submit(user: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      setLoading(true);
      const response = await register({
        email: user.email,
        password: user.password,
        name: user.name,
      });
      if (response.status === 409) {
        alert("User already exists"); // better way to handle this?
        throw new Error("User already exists");
      } else if (response.status === 200) {
        await signIn("credentials", {
          redirect: true,
          email: user.email,
          password: user.password,
          callbackUrl: K.Links.Quiz,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  const handleClick = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: K.Links.Quiz });
  };

  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-200 my-14 rounded-xl p-14">
      <h1 className="text-5xl">Register</h1>
      <Form loading={loading} submit={submit} />
      <SignInCard loading={loading} handleClick={handleClick} />
    </div>
  );
}
