"use client";
import { useRouter } from "next/navigation";
import { SignIn } from "@/components/SignIn";
import React from "react";
import {delete_account} from "@/functions/delete";

export default function Page(): JSX.Element {
  const router = useRouter();
  if (
    window.sessionStorage.getItem("Chat_secret_key") &&
    window.localStorage.getItem("Chat_secret_key") &&
    window.localStorage.getItem("User") &&
    window.localStorage.getItem("Address")
  ) {
    return (
      <div className="space-y-20">
        <div className="block text-gray-700 text-sm mb-2">Hello, {window.localStorage.getItem("User")}!</div>
        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={() => router.push("/rename")}
        >
          Change name
        </button>
        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={() => delete_account()}
        >
        Delete account
        </button>
        <button
            className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
            onClick={() => router.push("/message")}
        >
            Send message
        </button>
        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={() => {
            window.localStorage.removeItem("Chat_secret_key");
            window.sessionStorage.removeItem("Chat_secret_key");
            window.localStorage.removeItem("User");
            window.localStorage.removeItem("Address");
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
    window.localStorage.getItem("User") &&
    window.localStorage.getItem("Address") &&
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
