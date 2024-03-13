// Styles
import "./inputHelp.scss";
// Components
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
// React
import React from "react";

const InputHelp = ({ success, fail, text }) => {
  return (
    <span className="input__help">
      {success &&
        <React.Fragment>
          <FaCircleCheck color={`var(--success)`} /> {text}
        </React.Fragment>
      }
      {fail &&
        <React.Fragment>
          <FaCircleXmark color={`var(--dark-red)`} /> {text}
        </React.Fragment>
      }
    </span>
  );
}

export default InputHelp;