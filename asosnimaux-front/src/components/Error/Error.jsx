// Styles
import "./error.scss";
// React
import { Link } from "react-router-dom";
// Constants
import { APP_ROUTES } from "../../constants/route.const";

const Error = () => {
  return (
    <section className="error">
      <div className="title-wrapper">
        <h1>Miaoups</h1>
      </div>
      <div className="error__wrapper">
        <div className="error__text">
          <p className="text-error"><strong>Erreur 404</strong></p>
          <p>Il semblerait que cette page n'existe pas..</p>
          <p>Revenez parmis nous !</p>
          <nav>
            <ul>
              <li>
                <div className="btn-wrapper">
                  <Link to={APP_ROUTES.HOME} className="btn">Accueil</Link>
                </div>
              </li>
              <li>
                <div className="btn-wrapper">
                  <Link to={APP_ROUTES.ACCOUNT} className="btn">Compte</Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <img src="./src/assets/imgs/cat-boat.png" alt="Sticker d'un chat, les yeux équarquillés, dans un bateau qui avance vite" />
      </div>
    </section>
  )
}

export default Error;