"use client";
import React, { useState, useEffect } from "react";
import { SignUp, Inputs } from "../../components/SignUp";
import { ed25519 } from "@noble/curves/ed25519";
import { useRouter } from "next/navigation";
import { encrypt } from "@/functions/encrypt_decrypt";

const bip39 = require("bip39");
const axios = require("axios").default;
export default function Page(): JSX.Element {
  const router = useRouter();
  const [mnemonic, setMnemonic] = useState("");
  const [mnemoSubmited, setMnemoSubmited] = useState(false);

  const passSubmit = (data: Inputs) => {
    const res = encrypt({
      mnemonic: mnemonic,
      display_name: data.display_name,
      password: data.password,
    });


    console.log({
      address: "0x" + res["address"],
      display_name: data.display_name,
      signature: res['signature'],
    })
    axios
      .post("http://localhost:8000/account/create", {
        address: "0x" + res["address"],
        display_name: data.display_name,
        signature: res['signature'],
      })
      .then(() => {
        window.localStorage.setItem("Chat_secret_key", res["encryptedSecKey"]);
        window.sessionStorage.setItem("Chat_secret_key", res["secKey"]);
        window.localStorage.setItem("User", data.display_name);
        window.localStorage.setItem("Address", res["address"]);
        router.push("/");
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  useEffect(() => {
    setMnemonic(bip39.generateMnemonic());
  }, []);
  return (
    <div>
      {mnemoSubmited ? (
        <SignUp passSubmit={passSubmit} />
      ) : (
        <div className="w-full max-w-4xl">
          <label className="block text-gray-700 text-sm mb-2">
            Write down the following words in order and keep them in a safe
            place. Anyone who has access to it will also have access to your
            account!
          </label>
          <div className="block text-gray-700 text-xl font-bold mb-2">
            {mnemonic}
          </div>
          <button
            className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
            onClick={() => setMnemoSubmited(true)}
          >
            OK!
          </button>
        </div>
      )}
    </div>
  );
}
