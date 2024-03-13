// Styles
import "./inputCheckbox.scss";

const InputCheckbox = ({ id, label, checked, onChange }) => {
  return (
    <label className="switch__label" htmlFor={id}>
      <div className="switch__wrapper">
        <input
          className="switch"
          type="checkbox"
          name={id}
          id={id}
          checked={checked}
          onChange={onChange} />
        <span></span>
      </div>
      {label}
    </label>
  );
}

export default InputCheckbox;