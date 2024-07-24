import { default as axios } from "axios";
import { getSignature } from "@/functions/encrypt_decrypt";

export function delete_account() {
  const secKey = window.sessionStorage.getItem("Chat_secret_key");
  const address = window.localStorage.getItem("Address");
  const display_name = window.localStorage.getItem("User");
  if (display_name && secKey) {
    const signature = getSignature(display_name, secKey);
    axios
      .delete("http://localhost:8000/account/delete", {
        params: {
          address: "0x" + address,
          // display_name: display_name,
          // signature: signature,
        },
      })
      .then(() => {
        window.localStorage.removeItem("Chat_secret_key");
        window.sessionStorage.removeItem("Chat_secret_key");
        window.localStorage.removeItem("User");
        window.localStorage.removeItem("Address");
        location.reload();
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }
}

type Message = {
  message_id: string;
  from_address: string;
  message: string;
  signature: string;
};

export function delete_message(message: Message) {
  const secKey = window.sessionStorage.getItem("Chat_secret_key");
  const address = window.localStorage.getItem("Address");
  if (secKey) {
    const signature = getSignature(message.message, secKey);
    axios
      .delete("http://localhost:8000/message/delete", {
        params: {
          message_id: message.message_id,
        },
      })
      .then(() => {
      location.reload();
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }
}
