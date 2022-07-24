import React from "react";
import { useFormContext } from "react-hook-form";

const InputField = () => {
  const { register } = useFormContext();
  return (
    <input
      placeholder="Title"
      {...register("title")}
      className="border-2 rounded border-blue-300 p-1"
    />
  );
};

export default InputField;
