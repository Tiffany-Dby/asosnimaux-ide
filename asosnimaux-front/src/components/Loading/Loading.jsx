// Styles
import "./loading.scss";

const Loading = ({ text, loadingStyle }) => {
  return (
    <div className="loading">
      <p className="loading__text">{text} en cours...</p>
      <span className={`loading__${loadingStyle}`}></span>
    </div>
  );
}

export default Loading;