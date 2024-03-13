// Styles
import "./socialMediaLinks.scss";
// Components
import { FaLinkedin, FaSquareFacebook, FaSquareInstagram, FaSquareXTwitter, FaSquareYoutube } from "react-icons/fa6";

const SocialMediaLink = () => {
  return (
    <ul className="socialmedia-list">
      <li><a href="https://www.facebook.com/" aria-label="Lien vers la page Facebook de l'association" target="_blank"><FaSquareFacebook className="icon" /></a></li>
      <li><a href="https://twitter.com/" aria-label="Lien vers la page Twitter de l'association" target="_blank"><FaSquareXTwitter className="icon" /></a></li>
      <li><a href="https://www.instagram.com/" aria-label="Lien vers la page Instagram de l'association" target="_blank"><FaSquareInstagram className="icon" /></a></li>
      <li><a href="https://www.youtube.com/" aria-label="Lien vers la page Youtube de l'association" target="_blank"><FaSquareYoutube className="icon" /></a></li>
      <li><a href="https://www.linkedin.com/" aria-label="Lien vers la page Linkedin de l'association" target="_blank"><FaLinkedin className="icon" /></a></li>
    </ul>
  )
}

export default SocialMediaLink;