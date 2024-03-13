// Styles
import "./footer.scss";
// Components
import SocialMediaLink from "../SocialMediaLinks/SocialMediaLinks";
// React
import { useRef } from "react";
import { Link } from "react-router-dom";
// Constants
import { APP_ROUTES } from "../../constants/route.const";

const Footer = () => {
  // Anchor on Header
  const topPageRef = useRef();

  const handleScrollToTopPage = () => {
    if (topPageRef.current) topPageRef.current.scrollIntoView();
  }

  return (
    <footer className="footer">
      <div className="footer__img">
        <a href="#" onClick={handleScrollToTopPage}>
          <img src="/imgs/logo-dm.svg" alt="Logo ASOS'nimaux" />
        </a>
      </div>

      <nav>
        <ul className="footer__links">
          <li><Link to="#">Plan du site</Link></li>
          <li><Link to="#">Nous rejoindre</Link></li>
          <li><Link to="#">FAQ</Link></li>
          <li><Link to="#">Politique de confidentialité</Link></li>
          <li><Link to="#">Cookies</Link></li>
          <li><Link to="#">Mentions légales</Link></li>
          <li><Link to={APP_ROUTES.HOME}>Adresse</Link></li>
          <li><Link to={APP_ROUTES.HOME}>Horaires</Link></li>
          <li><Link to={APP_ROUTES.HOME}>Contact</Link></li>
          <li><p>Réseaux Sociaux :</p>
            <SocialMediaLink />
          </li>
        </ul>
      </nav>

      <div className="footer__copyright">
        <a href="https://github.com/Tiffany-Dby" target="_blank">Tiffany-Dby&copy;</a>
      </div>
    </footer>
  )
}

export default Footer;