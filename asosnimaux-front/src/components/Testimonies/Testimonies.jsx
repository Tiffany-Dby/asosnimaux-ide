// Styles
import "./testimonies.scss";
// Components
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import TestimonyCard from "../TestimonyCard/TestimonyCard";
import Dialog from "../Dialog/Dialog";
import NotAuth from "../NotAuth/NotAuth";
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import { FaAngleRight } from "react-icons/fa6";
// React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Thunks
import { getAllTestimoniesThunk, postTestimonyThunk } from "../../api/testimony.api";
// Reducers
import { resetFormNewTestimony, updateFormNewTestimony } from "../../redux/reducers/testimony.reducer";
import { closeDialog, setIsNewTestimonyForm } from "../../redux/reducers/dialog.reducer";
// Constants
import { APP_ROUTES } from "../../constants/route.const";
// Utils
import { setToLocalDate } from "../../utils/date.utils";

const Testimonies = () => {
  const dispatch = useDispatch();

  // Testimony Reducer
  const { testimonies, allTestimoniesLoading, allTestimoniesError, newTestimonyLoading, newTestimonyError } = useSelector(state => state.testimonyReducer);
  const { all, newTestimony } = testimonies;

  // Dialog Reducer
  const { isNewTestimonyForm } = useSelector(state => state.dialogReducer);

  // User Reducer
  const { isAuth } = useSelector(state => state.userReducer);

  // Fetching -> all testimonies
  useEffect(() => {
    dispatch(getAllTestimoniesThunk());
  }, []);

  // *************** Dialog ***************
  // User authenticated -> Open new testimony form
  // User not authenticated -> Open not auth message
  const handleNewTestimonyForm = () => {
    dispatch(setIsNewTestimonyForm());
  }

  // Input onChange
  const updateNewTestimonyFrom = (input, value) => dispatch(updateFormNewTestimony({ input, value }));

  // Submit new Testimony
  const handleSubmitNewTestimony = e => {
    e.preventDefault();
    dispatch(postTestimonyThunk());
    dispatch(closeDialog());
  }

  // Close dialog
  const handleCancel = () => {
    dispatch(resetFormNewTestimony());
    dispatch(closeDialog());
  }
  // *************** End Dialog ***************

  return (
    <div className="testimonies__page">
      <div className="title-wrapper">
        <h1>Témoignages</h1>
      </div>
      <Breadcrumbs>
        <li className="breadcrumbs__link">
          <Link to={APP_ROUTES.HOME} >
            Accueil
          </Link>
          <FaAngleRight className="breadcrumbs__icon" />
        </li>
        <li className="breadcrumbs__link">
          <p>Témoignages</p>
        </li>
      </Breadcrumbs>
      <section className="testimonies">
        <div className="testimonies__header">
          <h2>L'intégralité des témoignages</h2>
          <p>Volontaires, familles d'accueil et visiteurs du site ont créé un compte pour partager leurs expériences avec l'association. Nous vous invitons à découvrir leurs témoignages. Bonne lecture !</p>
        </div>
        {allTestimoniesError &&
          <p className="text-error">{allTestimoniesError}</p>
        }
        {newTestimonyError &&
          <p className="text-error">{newTestimonyError}</p>
        }
        {newTestimonyLoading ?
          <Loading text={"Envoi du témoignage"} loadingStyle={"spin"} />
          :
          <Button btnStyle={" btn--post-testimonies"} text="Poster un témoignage" btnClick={handleNewTestimonyForm} />
        }
        {allTestimoniesLoading ?
          <Loading text={"Chargement"} loadingStyle={"paws"} />
          :
          <ul className="testimonies__wrapper">
            {all.map(testimony => (
              <li key={testimony.id}>
                <TestimonyCard content={testimony.content} imgUrl={`${APP_ROUTES.API_URL}${testimony.avatar_url}`} author={testimony.username} date={setToLocalDate(testimony.date)} display={false} />
              </li>
            ))}
          </ul>
        }
        <Dialog>
          {(isNewTestimonyForm && isAuth) &&
            <div className="dialog-wrapper testimonies__new-testimony">
              <div className="title-wrapper">
                <h3>Nouveau témoignage</h3>
              </div>
              <form onSubmit={handleSubmitNewTestimony}>
                <div className="input__wrapper">
                  <label htmlFor="content" className="input__label">Votre témoignage</label>
                  <textarea
                    className="input"
                    name="content"
                    id="content"
                    required={true}
                    value={newTestimony.content || ""}
                    onChange={e => updateNewTestimonyFrom("content", e.target.value)}></textarea>
                </div>
                <div className="btns-wrapper">
                  <Button text="Poster" type="submit" />
                  <Button text="Annuler" btnClick={handleCancel} />
                </div>
              </form>
            </div>
          }
          {(isNewTestimonyForm && !isAuth) &&
            <div className="dialog-wrapper not-auth">
              <NotAuth actionText="Poster un témoignage" />
            </div>
          }
        </Dialog>
      </section>
    </div>
  );
}

export default Testimonies;