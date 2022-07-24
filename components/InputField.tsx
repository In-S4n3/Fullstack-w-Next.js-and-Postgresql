import { Data } from "../types";
interface InputFieldProps {
  setFormData: (formData: Data) => void;
  formData: Data;
}

const InputField = ({ setFormData, formData }: InputFieldProps) => {
  return (
    <input
      placeholder="Title"
      value={formData.title}
      className="border-2 rounded border-blue-300 p-1"
      name="title"
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    />
  );
};

export default InputField;
