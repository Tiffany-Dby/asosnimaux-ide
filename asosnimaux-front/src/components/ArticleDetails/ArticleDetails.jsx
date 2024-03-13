// Styles
import "./articleDetails.scss";
// Components
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Loading from "../Loading/Loading";
import { FaAngleRight } from "react-icons/fa6";
//React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
// Thunks
import { getOneArticleThunk } from "../../api/article.api";
//  Constants
import { APP_ROUTES } from "../../constants/route.const";
// Utils
import { setToLocalDateLong } from "../../utils/date.utils";
import { formatDescription } from "../../utils/description.utils";

const ArticleDetails = () => {
  const dispatch = useDispatch();

  // Get id from params -> case of reload from user
  const { id } = useParams();

  // Article Reducer
  const { articles, oneLoading, oneError } = useSelector(state => state.articleReducer);
  const { one } = articles;

  // Fetching -> One animal using id from params
  useEffect(() => {
    if (id) {
      dispatch(getOneArticleThunk(id));
    }
  }, []);

  // Utils -> description.utils.js -> returns an array of strings
  const paragraphs = formatDescription(one.description);

  return (
    <div className="article-page">
      <div className="title-wrapper">
        <h1>Article</h1>
      </div>
      <Breadcrumbs>
        <li className="breadcrumbs__link">
          <Link to={APP_ROUTES.HOME} >
            Accueil
          </Link>
          <FaAngleRight className="breadcrumbs__icon" />
        </li>
        <li className="breadcrumbs__link">
          <Link to={APP_ROUTES.ARTICLES} >
            Actualités
          </Link>
          <FaAngleRight className="breadcrumbs__icon" />
        </li>
        <li className="breadcrumbs__link">
          <p>Article : {one.name}</p>
        </li>
      </Breadcrumbs>
      <div className="article-page__wrapper">
        {oneError &&
          <p className="text-error">{oneError}</p>
        }
        {oneLoading ?
          <Loading text={"Chargement"} loadingStyle={"paws"} />
          :
          <article>
            <div className="article-page__title__wrapper">
              <h2 className="article-page__title">{one.name}</h2>
            </div>
            <div className="article-page__img">
              <img crossOrigin="anonymous" loading="lazy" src={one.picture_url} alt={one.picture_caption} />
            </div>
            <div className="article-page__content">
              <p className="article-page__date">{setToLocalDateLong(one.date)}, {one.location}</p>
              <div className="article-page__text">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        }
      </div>
    </div>
  );
}

export default ArticleDetails;