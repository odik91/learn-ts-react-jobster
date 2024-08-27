const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
}: {
  labelText?: string;
  name: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  list: string[];
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        className="form-select"
        onChange={handleChange}
      >
        {list.map((itemValue, index) => {
          return (
            <option value={itemValue} key={index}>
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
