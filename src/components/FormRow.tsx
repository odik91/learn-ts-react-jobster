import { ChangeEvent } from "react";

interface FormRowProps {
  type: "text" | "email" | "number" | "password";
  name: string;
  value: string | number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  labelText?: string;
}

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
}: FormRowProps) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
