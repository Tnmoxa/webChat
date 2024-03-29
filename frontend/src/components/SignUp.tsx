import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";

export type Inputs = {
  display_name: string;
  password: string;
};

export function SignUp({
  passSubmit,
}: {
  passSubmit: (data: Inputs) => void;
}): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    passSubmit(data);
  };
  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Display name
          </label>
          <input
            type="text"
            placeholder="Username"
            {...register("display_name", { required: true })}
          />
          {errors.display_name && (
            <span className="text-red-500 text-xs italic">
              This field is required
            </span>
          )}
        </div>
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
          Sign Up
        </button>
      </form>
    </div>
  );
}
