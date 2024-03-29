import React from "react";
import { Inputs } from "@/components/RevoveryForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { getSessionKey } from "@/functions/encrypt_decrypt";

export function SignIn(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: { password: string }) =>
    getSessionKey(data.password);

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="******************"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Recovery
        </button>
      </form>
    </div>
  );
}
