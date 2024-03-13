// Styles
import "./homeArticles.scss";
// Components
import Article from "../Article/Article";
//React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Thunks
import { getOverviewThunk } from "../../api/article.api";
// Constants
import { APP_ROUTES } from "../../constants/route.const";
// Utils
import { setToLocalDateLong } from "../../utils/date.utils";

const HomeArticles = () => {
  const dispatch = useDispatch();

  // Article Reducer
  const { articles } = useSelector(state => state.articleReducer);
  const { overview } = articles;

  // Fetching -> Articles overview (4 articles)
  useEffect(() => {
    dispatch(getOverviewThunk());
  }, []);

  return (
    <section className="articles-overview">
      <div className="title-wrapper">
        <h2>Articles</h2>
      </div>
      <div className="articles__wrapper">
        {overview.map((article) => (
          <Link key={article.id} to={`${APP_ROUTES.ARTICLES}/${article.id}`}>
            <Article artclStyle="" imgUrl={article.picture_url} imgAlt={article.picture_caption} title={article.name} date={setToLocalDateLong(article.date)} text={article.truncated_description} />
          </Link>
        ))}
      </div>
      <div className="btn-wrapper">
        <Link className="btn" to={APP_ROUTES.ARTICLES}>Voir plus d'articles</Link>
      </div>
    </section>
  );
}

export default HomeArticles;