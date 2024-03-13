// Styles
import "./banner.scss";
// React
import { Link } from "react-router-dom";
// Constants
import { APP_ROUTES } from "../../constants/route.const";

const Banner = () => {
  return (
    <section className="banner" role="banner">
      <div className="banner__header">
        <div className="banner__logo">
          <img src="/imgs/logo-lm.svg" alt="Logo ASOS'nimaux" />
        </div>
        <h1>Refuge pour animaux en Gironde</h1>
      </div>
      <div className="banner__text">
        <p>Donnons-leur autant qu'ils nous apportent !</p>
        <div className="banner__buttons">
          <div className="btn-wrapper">
            <Link className="btn" to={APP_ROUTES.DONATION}>Je donne</Link>
          </div>
          <div className="btn-wrapper">
            <Link className="btn" to={APP_ROUTES.ADOPTION}>J'adopte</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;