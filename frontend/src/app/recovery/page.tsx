"use client";
import { useRouter } from "next/navigation";
import { encrypt } from "@/functions/encrypt_decrypt";
import {RecoveryForm, Inputs} from "@/components/RevoveryForm";

const axios = require("axios").default;

export default function Page(): JSX.Element {
  const router = useRouter();

  const passSubmit = (data: Inputs) => {
    const res = encrypt(data);

    window.localStorage.setItem("Chat_secret_key", res["encryptedSecKey"]);
    window.sessionStorage.setItem("Chat_secret_key", res["secKey"]);
    console.log(data.display_name)
    axios
      .post("http://localhost:8000/account/create", {
        address: "0x" + res["address"],
        display_name: data.display_name,
        signature: res["signature"],
      })
      .then(() => {
        window.localStorage.setItem("Chat_secret_key", res["encryptedSecKey"]);
        window.sessionStorage.setItem("Chat_secret_key", res["secKey"]);
        window.localStorage.setItem("User", data.display_name);
        window.localStorage.setItem("Address", res['address']);
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
