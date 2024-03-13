// Styles
import "./adminArticles.scss";
// Components
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import { FaPencil, FaTrashCan } from "react-icons/fa6";
// React
import { useDispatch, useSelector } from "react-redux";
// Reducers
import { setIsDeleteArticleForm, setIsNewArticleForm, setIsUpdateArticleForm } from "../../redux/reducers/dialog.reducer";
import { setSelectedArticle } from "../../redux/reducers/article.reducer";
// Utils
import { setToLocalDate } from "../../utils/date.utils";

const AdminArticles = () => {
  const dispatch = useDispatch();

  // Article Reducer
  const { articles, allLoading, allError, newArticleLoading, newArticleError, selectedLoading, selectedError, deleteLoading, deleteError } = useSelector(state => state.articleReducer);
  const { all } = articles;

  // *************** Set Dialog Type -> Open ***************
  // New Article Dialog
  const handleNewForm = () => {
    dispatch(setIsNewArticleForm());
  }

  // Update Aritcle Dialog
  const handleUpdateForm = (article) => {
    dispatch(setIsUpdateArticleForm());
    dispatch(setSelectedArticle({ id: article.id, name: article.name, location: article.location, description: article.description }))
  }

  // Delete Article Dialog
  const handleDeleteForm = (article) => {
    dispatch(setIsDeleteArticleForm());
    dispatch(setSelectedArticle({ id: article.id }));
  }
  // *************** End Set Dialog Type -> Open ***************

  return (
    <section className="admin__wrapper">
      <div className="admin__all-articles">
        {selectedError &&
          <p className="text-error">{selectedError}</p>
        }
        {newArticleError &&
          <p className="text-error">{newArticleError}</p>
        }
        {deleteError &&
          <p className="text-error">{deleteError}</p>
        }
        {allError &&
          <p className="text-error">{allError}</p>
        }
        <div className="admin__header">
          <h2>Tous les articles ({all.length})</h2>
          {newArticleLoading || allLoading ?
            <Loading text={(newArticleLoading && "Création de l'article") || (allLoading && "Chargement des articles")} loadingStyle={"spin"} />
            :
            <Button text={"Ajouter un article"} btnClick={handleNewForm} />
          }
        </div>

        <div className="admin__all-articles__wrapper">
          {all.map((a) => (
            <article key={a.id} className="admin__article">
              <div className="admin__article__content">
                <h3 className="admin__article__title">{a.name}</h3>
                <span className="admin__article__date">
                  <p>{setToLocalDate(a.date)}</p>
                </span>
              </div>
              {selectedLoading || deleteLoading ?
                <Loading text={(selectedLoading && "Mise à jour de l'article") || (deleteLoading && "Suppression de l'article")} loadingStyle={"spin"} />
                :
                <div className="icons-wrapper">
                  <FaPencil className="manage-icons" onClick={() => handleUpdateForm(a)} role="button" aria-label="Bouton de modification de l'article" />
                  <FaTrashCan className="manage-icons" color="var(--dark-red)" onClick={() => handleDeleteForm(a)} role="button" aria-label="Bouton de suppression de l'article" />
                </div>
              }
            </article>
          ))}
        </div>
      </div >
    </section>
  );
}

export default AdminArticles;