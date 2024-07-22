"use client";
import { useRouter } from "next/navigation";
import {encrypt, getSignature} from "@/functions/encrypt_decrypt";
import {RenameForm, Inputs } from "@/components/RenameForm";
import {ed25519} from "@noble/curves/ed25519";

const axios = require("axios").default;

export default function Rename(): JSX.Element {
    const router = useRouter();

    const passSubmit = (data: Inputs) => {

        const secKey = window.sessionStorage.getItem("Chat_secret_key")
        const address = window.localStorage.getItem("Address")
        if (secKey ) {
            const signature = getSignature(data.display_name, secKey)
            axios
                .put("http://localhost:8000/account/update", {
                    address: "0x" + address,
                    display_name: data.display_name,
                    signature: signature,
                })
                .then(() => {
                    window.localStorage.setItem("User", data.display_name);
                    router.push("/");
                })
                .catch(function (error: any) {
                    console.log(error);
                });
        }
        router.push("/");
    };

    return (
        <div>
            <RenameForm passSubmit={passSubmit} />
    </div>
);
}
