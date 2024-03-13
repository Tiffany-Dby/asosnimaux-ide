// Styles
import "./toast.scss";
// Components
import { FaCircleCheck } from "react-icons/fa6";
// React
import { useSelector } from "react-redux";

const Toast = ({ message }) => {
  // Toast Reducer
  const { isToastOpen } = useSelector(state => state.toastReducer);

  return (
    <div className={`toast ${isToastOpen ? 'toast-open' : ''}`} role="alert">
      <div className="toast__content">
        <FaCircleCheck className="toast__icon" />
        <p className="toast__message">{message}</p>
      </div>
    </div>
  );
}

export default Toast;