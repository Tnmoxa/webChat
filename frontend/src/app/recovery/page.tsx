"use client";
import { RecoveryForm, Inputs } from "@/components/RevoveryForm";
import { useRouter } from "next/navigation";
import { encrypt } from "@/functions/encrypt_decrypt";

const axios = require("axios").default;

export default function Registration(): JSX.Element {
  const router = useRouter();

  const passSubmit = (data: Inputs) => {
    const res = encrypt(data);

    window.localStorage.setItem("Chat_secret_key", res["encryptedHex"]);
    window.sessionStorage.setItem("Chat_secret_key", res["secKey"]);
    axios
      .post("http://localhost:8000/account/create", {
        address: "0x" + res["pubKey"],
        display_name: data.display_name,
        signature: res["signature"],
      })
      .then(() => {
        window.localStorage.setItem("Chat_secret_key", res["encryptedHex"]);
        window.sessionStorage.setItem("Chat_secret_key", res["secKey"]);
        router.push("/");
      })
      .catch(function (error: any) {
        console.log(error);
      });
    router.push("/");
  };

  return (
    <div>
      <RecoveryForm passSubmit={passSubmit} />
    </div>
  );
}
