// Styles
import "./animalCard.scss";
// Components
import { FaHeart, FaMars, FaVenus } from "react-icons/fa6";
// React
import { Link } from "react-router-dom";

const AnimalCard = ({ imgUrl, imgAlt, animalName, status, animalSex, color, followClick, linkRedirect, linkClick }) => {
  return (
    <article className="animal">

      {(status === "réservé" || status === "adopté") &&
        <span className={`animal__status ${status === "réservé" ? "status--reserved" : ""}${status === "adopté" ? "status--adopted" : ""}`}>{status === "réservé" && "Réservé"}{status === "adopté" && "Adopté"}</span>
      }
      <FaHeart className="icon heart animal__follow-icon" color={color || "var(--dark-grey)"} onClick={followClick} role="button" aria-label="Bouton d'ajout/retrait des favoris" />
      <Link to={linkRedirect} className="animal__redirect" onClick={linkClick}>
        <div className="animal__img">
          <img loading="lazy" crossOrigin="anonymous" src={imgUrl} alt={imgAlt} />
        </div>
        <div className="animal__infos">
          <h3 className="animal__name">{animalName}</h3>
          {animalSex === "mâle" &&
            <FaMars size={22} className="animal__sex male" />
          }
          {animalSex === "femelle" &&
            <FaVenus size={22} className="animal__sex female" />
          }
        </div>
      </Link>
    </article>
  )
}

export default AnimalCard;