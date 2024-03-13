// Styles
import "./contact.scss";

const Contact = () => {
  return (
    <article className="informations__article contact">
      <h3 className="informations__article__title">Contact</h3>

      <div className="informations__article__details">
        <div>
          <p>Téléphone</p>
          <a href="tel:+0143010203">01.43.01.02.03</a>
        </div>
        <div>
          <p>Email</p>
          <a href="mailto:asosnimaux@contact.fr">asosnimaux@contact.fr</a>
        </div>
      </div>
    </article>
  );
}

export default Contact;