import React, { useEffect, useState } from "react";
import { delete_message } from "@/functions/delete";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "@/components/RenameForm";
import { useRouter } from "next/navigation";
import { getSignature } from "@/functions/encrypt_decrypt";
import { default as axios } from "axios";

export type Comm = {
  comment: {
    message_id: string;
    from_address: string;
    message: string;
    signature: string;
  };
};

export type Input = {
  message: string;
};

export function Comment(comment: Comm): JSX.Element {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (message: Input) => {
    const secKey = window.sessionStorage.getItem("Chat_secret_key");
    const address = window.localStorage.getItem("Address");
    if (secKey) {
      const signature = getSignature(message.message, secKey);
      const mess = {
        message_id: comment.comment.message_id,
        from_address: "0x" + address,
        message: message.message,
        signature: signature,
      };
      console.log(mess);
      axios
        .put("http://localhost:8000/message/update", mess)
        .then(() => {
          router.push("/");
        })
        .catch(function (error: any) {
          console.log(error);
        });
    }
  };
  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="neutral filled odd:bg-opacity-25 py-1">
        <div className="block text-gray-700 text-sm font-bold mb-2">
          {comment.comment.from_address}
        </div>
        <div className="block text-gray-700 text-sm font-bold mb-2">
          {comment.comment.message}
        </div>
        <input type="text" {...register("message", { required: true })} />
        {errors.message && (
          <span className="text-red-500 text-xs italic">
            This field is required
          </span>
        )}
      </div>
      <div className="block text-gray-700 text-sm font-bold mb-2"></div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => delete_message(comment.comment)}
      >
        Удалить
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        изменить
      </button>
    </form>
  );
}
