"use client";
import Image from "next/image";

interface CardProps {
  auth?: string;
  loading: boolean;
  handleClick: () => void;
}

export default function Card({
  auth = "Google",
  loading,
  handleClick,
}: CardProps) {
  return (
    <button
      className={`${
        loading ? "bg-gray-500" : "bg-yellow-400 hover:bg-yellow-500"
      } pr-4 rounded-lg shadow p-2 shadow-gray-500 text-white`}
      onClick={handleClick}
      disabled={loading}
      role="button"
    >
      <Image
        src={`/${auth.toLowerCase()}.svg`}
        height="40"
        width="40"
        alt="Google"
        className="inline mr-2"
      />
      Sign In with {auth}
    </button>
  );
}
