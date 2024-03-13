// Styles
import "./articles.scss";
// Components
import Article from "../Article/Article";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Loading from "../Loading/Loading";
import { FaAngleRight } from "react-icons/fa6";
// React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Thunks
import { getAllArticlesThunk, getOneArticleThunk } from "../../api/article.api";
// Constants
import { APP_ROUTES } from "../../constants/route.const";
// Utils
import { setToLocalDateLong } from "../../utils/date.utils";

const Articles = () => {
  const dispatch = useDispatch();

  // Article Reducer
  const { articles, allLoading, allError } = useSelector(state => state.articleReducer);
  const { all } = articles;

  // Gets article to redirect -> article page
  const handleOneArticleClick = (article) => {
    dispatch(getOneArticleThunk(article.id))
  }

  // Fetching -> All articles
  useEffect(() => {
    dispatch(getAllArticlesThunk());
  }, []);

  return (
    <div className="articles__page">
      <div className="title-wrapper">
        <h1>Actualités</h1>
      </div>
      <Breadcrumbs>
        <li className="breadcrumbs__link">
          <Link to={APP_ROUTES.HOME} >
            Accueil
          </Link>
          <FaAngleRight className="breadcrumbs__icon" />
        </li>
        <li className="breadcrumbs__link">
          <p>Actualités</p>
        </li>
      </Breadcrumbs>
      <section className="articles">
        <div className="articles__header">
          <h2>Les actualités de l'association</h2>
          <p>La liste de toutes les actualités qui ont été postées sur notre site, de la plus récente à la plus ancienne. Cliquez dessus pour plus de détails.</p>
        </div>
        {allError &&
          <p className="text-error">{allError}</p>
        }
        {allLoading ?
          <Loading text={"Chargement"} loadingStyle={"paws"} />
          :
          <div className="articles__wrapper">
            {all.map((article) => (
              <Link key={article.id} to={`${APP_ROUTES.ARTICLES}/${article.id}`} onClick={() => handleOneArticleClick(article)}>
                <Article artclStyle="" imgUrl={`${APP_ROUTES.API_URL}${article.picture_url}`} imgAlt={article.picture_caption} title={article.name} date={setToLocalDateLong(article.date)} text={article.truncated_description} />
              </Link>
            ))}
          </div>
        }
      </section>
    </div>
  );
}

export default Articles;