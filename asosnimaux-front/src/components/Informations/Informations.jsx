// Styles
import "./informations.scss";
// Components
import Map from "../Map/Map";
import Address from "../Address/Address";
import Contact from "../Contact/Contact";
import Schedules from "../Schedules/Schedules";
import SocialMedia from "../SocialMedia/SocialMedia";
// React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Reducers
import { updateWindowSize } from "../../redux/reducers/window.reducer";

const Informations = () => {
  const dispatch = useDispatch();

  // Window Reducer
  const { width } = useSelector(state => state.windowReducer);

  // Update window's size -> width
  useEffect(() => {
    const handleResize = () => dispatch(updateWindowSize({ width: window.innerWidth }));

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <section className="informations">
      <div className="title-wrapper">
        <h2>Informations</h2>
      </div>
      <div className="informations__wrapper">
        <Map />
        <Address />
        <Contact />
        <Schedules />
        <SocialMedia />
        {width > 1024 &&
          <div className="informations__img">
            <img loading="lazy" src="./src/assets/imgs/jamie.webp" alt="Jamie, un chien marron qui sourrit la langue pendante" />
          </div>
        }
      </div>
    </section>
  )
}

export default Informations;