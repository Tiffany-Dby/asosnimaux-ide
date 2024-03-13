// Styles
import "./socialMedia.scss";
// Components
import SocialMediaLink from "../SocialMediaLinks/SocialMediaLinks";

const SocialMedia = () => {
  return (
    <article className="informations__article socialmedia">
      <h3 className="informations__article__title">Réseaux Sociaux</h3>

      <div className="informations__article__details">
        <p>N'hésitez pas à nous suivre !</p>
        <SocialMediaLink socialMediaStyle={"socialmedia__list"} />
      </div>
    </article>
  );
}

export default SocialMedia;