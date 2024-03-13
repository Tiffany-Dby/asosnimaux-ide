// Styles
import "./notAuth.scss";
// Components
import { FaCircleInfo, FaXmark } from "react-icons/fa6";
// React
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// Reducers
import { closeDialog } from "../../redux/reducers/dialog.reducer";
// Constants
import { APP_ROUTES } from "../../constants/route.const";

const NotAuth = ({ actionText }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeDialog());
  }

  return (
    <article className="not-auth">
      <div className="not-auth__header">
        <div className="not-auth__title">
          <h3>Connexion requise</h3>
          <FaCircleInfo className="icon" color={"var(--dark-red)"} />
        </div>
        <FaXmark className="manage-icons" onClick={handleClose} role="button" aria-label="Fermer le message de connexion requise" />
      </div>
      <div className="not-auth__text">
        <p><strong>{actionText}</strong> nécessite d'être un <strong>Ami'nimaux connecté.</strong></p>
        <p>Vous pouvez <Link to={APP_ROUTES.SIGN_IN} onClick={handleClose}>être redirigé vers la page de connexion</Link> ou <Link to={APP_ROUTES.SIGN_UP} onClick={handleClose}>être redirigé vers la page de création de compte</Link>.</p>
      </div>
    </article>
  );
}

export default NotAuth;