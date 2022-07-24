import { Data } from "../types";
interface TextAreaFieldProps {
  setFormData: (formData: Data) => void;
  formData: Data;
}

const TextAreaField = ({ setFormData, formData }: TextAreaFieldProps) => {
  return (
    <textarea
      placeholder="Content"
      className="border-2 rounded border-blue-300 p-1"
      name="content"
      value={formData.content}
      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
    />
  );
};

export default TextAreaField;
