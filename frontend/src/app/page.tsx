"use client";
import { useRouter } from "next/navigation";
import { SignIn } from "@/components/SignIn";
import React from "react";

export default function Page(): JSX.Element {
  const router = useRouter();
  if (
    window.sessionStorage.getItem("Chat_secret_key") &&
    window.localStorage.getItem("Chat_secret_key")
  ) {
    return (
      <div className="space-y-20">
        <div className="block text-gray-700 text-sm mb-2">Hello, user!</div>
        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={() => {
            window.localStorage.removeItem("Chat_secret_key");
            window.sessionStorage.removeItem("Chat_secret_key");
            location.reload();
          }}
        >
          Exit
        </button>
      </div>
    );
  }
  if (
    window.localStorage.getItem("Chat_secret_key") &&
    !window.sessionStorage.getItem("Chat_secret_key")
  ) {
    return <SignIn />;
  }

  return (
    <div className="space-y-20">
      <button
        className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
        onClick={() => router.push("/registration")}
      >
        Create a new account
      </button>
      <button
        className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
        onClick={() => router.push("/recovery")}
      >
        Recover old account
      </button>
    </div>
  );
}
