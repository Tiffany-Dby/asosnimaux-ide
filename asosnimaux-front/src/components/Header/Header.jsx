// Styles
import "./header.scss";
// Components
import Burger from "../Burger/Burger";
import HeaderNav from "../HeaderNav/HeaderNav";
import { FaCircleUser, FaHeart, FaPowerOff } from "react-icons/fa6";
// React
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Reducers
import { toggleMobileMenu } from "../../redux/reducers/header.reducer";
import { updateScroll, updateWindowSize } from "../../redux/reducers/window.reducer";
// Constants
import { APP_ROUTES } from "../../constants/route.const";
// Utils
import { signOut } from "../../utils/user.utils";

const Header = () => {
  const dispatch = useDispatch();

  // Anchor
  const headerRef = useRef(null);

  // Header Reducer
  const { isMobileMenuOpen } = useSelector(state => state.headerReducer);

  // Window Reducer
  const { width, scrollY } = useSelector(state => state.windowReducer);

  // User Reducer
  const { isAuth, user } = useSelector(state => state.userReducer);


  // *************** Resize & Scroll ***************
  // Update window's size -> width
  const handleResize = () => dispatch(updateWindowSize({ width: window.innerWidth }));

  // Update window's scroll -> Y
  const handleScroll = () => dispatch(updateScroll({ scrollY: window.scrollY }));

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  // *************** End Resize & Scroll ***************

  // *************** Toggle Header (mobile) ***************
  // Burger button
  const handleBurgerClick = () => {
    dispatch(toggleMobileMenu(!isMobileMenuOpen));
  }

  // Close header on mobile size -> click outside
  const handleOutsideHeaderClick = e => {
    if (isMobileMenuOpen) {
      if (headerRef.current && !headerRef.current.contains(e.target)) dispatch(toggleMobileMenu(false));
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideHeaderClick);

    return () => {
      document.removeEventListener('click', handleOutsideHeaderClick);
    }
  }, [isMobileMenuOpen]);
  // *************** End Toggle Header (mobile) ***************

  // Utils -> user.utils.js -> disconnect user
  const handleSignOut = () => {
    signOut(dispatch);
  }

  return (
    <header id="topPage" className="header" ref={headerRef}>
      <div className="header__wrapper">
        <div className="header__img">
          <Link to={APP_ROUTES.HOME}>
            <img src={width < 900 ? "/imgs/logo-lm-mobile.svg" : "/imgs/logo-lm.svg"} alt="Logo ASOS'nimaux" />
          </Link>
        </div>
        <div className="header__icons">
          <div className="icon__wrapper">
            <Link to={APP_ROUTES.FAVORITES} aria-label="Lien vers la page des favoris">
              <FaHeart className="icon heart" color="var(--secondary)" />
            </Link>
          </div>
          <div className="icon__wrapper">
            {isAuth ?
              <React.Fragment>
                <Link to={APP_ROUTES.ACCOUNT} aria-label="Lien vers la page du compte">
                  <div className="icon avatar">
                    <img crossOrigin="anonymous" src={user.avatar} alt={"Un sticker animal"} />
                  </div>
                </Link>
                <FaPowerOff className="icon" color="var(--primary)" onClick={handleSignOut} role="button" aria-label="Bouton de déconnexion" />
              </React.Fragment>
              :
              <Link to={APP_ROUTES.SIGN_IN} aria-label="Lien vers la page de connexion">
                <FaCircleUser className="icon" color="var(--primary)" />
              </Link>
            }
          </div>
          {width < 767 && <Burger toggleClass={isMobileMenuOpen ? " open" : ""} handleBurger={handleBurgerClick} />}
          <HeaderNav toggleClass={isMobileMenuOpen ? "nav--open" : ""} />
          <span className={`header__background${scrollY > 1 ? ' shadow' : ''}`}></span>
        </div>
      </div>
    </header>
  );
}

export default Header;