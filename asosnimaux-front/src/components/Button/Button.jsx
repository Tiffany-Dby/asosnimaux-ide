// Styles
import "./button.scss";

const Button = ({ type, disabled, btnStyle, btnClick, text }) => {

  return (
    <div className="btn-wrapper">
      <button
        type={type || "button"}
        disabled={disabled}
        className={`btn${btnStyle || ""}`}
        onClick={btnClick}
      >{text}</button>
    </div>
  );
}

export default Button;