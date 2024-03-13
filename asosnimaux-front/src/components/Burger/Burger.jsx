// Styles
import "./burger.scss";

const Burger = ({ toggleClass, handleBurger }) => {
  return (
    <div className={`burger${toggleClass}`} onClick={handleBurger} role="button" aria-label="Bouton menu-burger">
      <span></span>
    </div>
  );
}

export default Burger;