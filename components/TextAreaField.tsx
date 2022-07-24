import React from "react";
import { useFormContext } from "react-hook-form";

const TextAreaField = () => {
  const { register } = useFormContext();
  return (
    <textarea
      placeholder="Content"
      {...register("content")}
      className="border-2 rounded border-blue-300 p-1"
    />
  );
};

export default TextAreaField;
