// Styles
import "./testimonyCard.scss";
// Components
import Button from "../Button/Button";
// Utils
import { formatDescription } from "../../utils/description.utils";

const TestimonyCard = ({ imgUrl, date, content, author, btnText, btnClick, display = true }) => {
  // Utils -> description.utils.js -> returns an array of strings
  const paragraphs = formatDescription(content);

  return (
    <blockquote className="testimony">
      <div className="testimony__text">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {display &&
        <Button text={btnText} btnClick={btnClick} />
      }
      <cite className="testimony__cite">
        <div className="testimony__img">
          <img crossOrigin="anonymous" src={imgUrl} alt={`Avatar utilisateur : un sticker animal`} />
        </div>
        <p><span>{author}</span> {date}</p>
      </cite>
    </blockquote>
  );
}

export default TestimonyCard;