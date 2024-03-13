// Styles
import "./inputSelect.scss";
// React
import { useSelector } from "react-redux";

const InputSelect = ({ id, label, inputStyle, options, value, onChange }) => {
  // Dialog Reducer
  const { isUpdateUserRoleBySuperAdminForm } = useSelector(state => state.dialogReducer);

  const handleChange = (value) => {
    onChange(value);
  }

  return (
    <div className="input__wrapper">
      <label className="input__label" htmlFor={id} >{label}</label>
      <select className={`input${inputStyle || ""}`} name={id} id={id} value={value || ""} onChange={e => handleChange(e.target.value)}>
        {!isUpdateUserRoleBySuperAdminForm &&
          <option value="">Choisir une option</option>
        }
        {options.map((option, index) => (
          <option key={index} value={option.value} >{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default InputSelect;