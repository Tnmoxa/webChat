"use client";
import { useRouter } from "next/navigation";
import { encrypt, getSignature } from "@/functions/encrypt_decrypt";
import { MessageForm, Inputs } from "@/components/MessageForm";
import { MessageFrame } from "@/components/MessageFrame";

const axios = require("axios").default;

export default function Page(): JSX.Element {
  const router = useRouter();

  const passSubmit = (data: Inputs) => {
    const secKey = window.sessionStorage.getItem("Chat_secret_key");
    const address = window.localStorage.getItem("Address");
    if (secKey) {
      const signature = getSignature(data.message, secKey);
      console.log({
        from_address: "0x" + address,
        signature: signature,
        message: data.message,
      });
      axios
        .post("http://localhost:8000/message/create", {
          from_address: "0x" + address,
          signature: signature,
          message: data.message,
        })
        .then(() => {
          router.push("/");
        })
        .catch(function (error: any) {
          console.log(error);
        });
    }
    router.push("/");
  };

  return (
    <>
      <div>
        <MessageForm passSubmit={passSubmit} />
      </div>
      <div>
        <MessageFrame />
      </div>
    </>
  );
}
