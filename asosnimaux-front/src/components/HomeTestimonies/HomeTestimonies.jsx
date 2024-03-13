// Styles
import "./homeTestimonies.scss";
// Components
import TestimonyCard from "../TestimonyCard/TestimonyCard";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Dialog from "../Dialog/Dialog";
import Button from "../Button/Button";
import NotAuth from "../NotAuth/NotAuth";
import Loading from "../Loading/Loading";
import { FaXmark } from "react-icons/fa6";
// React
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Thunks
import { getTestimoniesOverviewThunk, postTestimonyThunk } from "../../api/testimony.api";
// Reducers
import { resetFormNewTestimony, resetOneTestimony, setOneTestimony, updateFormNewTestimony } from "../../redux/reducers/testimony.reducer";
import { closeDialog, setIsNewTestimonyForm, setIsReadMoreTestimoniesOverview } from "../../redux/reducers/dialog.reducer";
// Constants
import { APP_ROUTES } from "../../constants/route.const";
// Utils
import { setToLocalDate } from "../../utils/date.utils";

const HomeTestimonies = () => {
  const dispatch = useDispatch();
  const testimoniesRef = useRef(null);

  // Testimony Reducer
  const { testimonies, overviewTestimonyLoading, newTestimonyLoading, newTestimonyError } = useSelector(state => state.testimonyReducer);
  const { overview, one, newTestimony } = testimonies;

  // Dialog Reducer
  const { isReadMoreTestimoniesOverview, isNewTestimonyForm } = useSelector(state => state.dialogReducer);

  // User Reducer
  const { isAuth } = useSelector(state => state.userReducer);

  // Overview -> Index of current testimony displayed
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetching Testimonies overview
  useEffect(() => {
    dispatch(getTestimoniesOverviewThunk());
  }, []);

  // *************** Testimonies Overview Slider ***************
  // Get slide width
  const getSlideWidth = () => {
    const slideWidth = testimoniesRef.current.getBoundingClientRect().width;
    return slideWidth;
  }

  // Go to previous slide based on slide width
  const handlePrevious = e => {
    e.preventDefault();
    const slideWidth = getSlideWidth();

    // Check if it's the first slide
    if (testimoniesRef.current.scrollLeft === 0) {
      // Go to last slide and update currentIndex
      testimoniesRef.current.scrollLeft = slideWidth * (overview.length - 1);
      setCurrentIndex(overview.length - 1)
    } else {
      // Go to previous slide and update currentIndex
      testimoniesRef.current.scrollLeft += -slideWidth;
      setCurrentIndex(currentIndex - 1)
    }
  }

  // Go to next slide
  const handleNext = e => {
    e.preventDefault();
    const slideWidth = getSlideWidth();

    // Check if it's the last slide
    if (testimoniesRef.current.scrollLeft === slideWidth * (overview.length - 1)) {
      // Go to first slide and update currentIndex
      testimoniesRef.current.scrollLeft = 0;
      setCurrentIndex(0)
    } else {
      // Go to next slide and update currentIndex
      testimoniesRef.current.scrollLeft += slideWidth;
      setCurrentIndex(currentIndex + 1)
    }
  }

  // Breadcrumbs -> Slider navigation
  const handleNavigate = (e, index) => {
    e.preventDefault();

    // Get width of slide -> multiply slideWidth with index to set the value of scrollLeft and update currentIndex
    const slideWidth = getSlideWidth();
    testimoniesRef.current.scrollLeft = index * slideWidth;

    setCurrentIndex(index);
  }
  // *************** End Testimonies Overview Slider ***************

  // *************** Dialog ***************
  // Open one Testimony
  const handleReadMore = (testimony) => {
    dispatch(setIsReadMoreTestimoniesOverview());
    dispatch(setOneTestimony({ id: testimony.id, user_id: testimony.user_id, username: testimony.username, avatar_url: `${APP_ROUTES.API_URL}${testimony.avatar_url}`, content: testimony.content, date: testimony.date }));

  }

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
    dispatch(resetOneTestimony());
    dispatch(resetFormNewTestimony());
    dispatch(closeDialog());
  }

  return (
    <section className="testimonies-overview">
      <div className="title-wrapper">
        <h2>Témoignages</h2>
      </div>
      {newTestimonyError &&
        <p className="text-error">{newTestimonyError}</p>
      }
      <article className="testimonies-overview__wrapper">
        <div className="testimonies-overview__header">
          <h3>Les derniers témoignages</h3>
          {newTestimonyLoading ?
            <Loading text={"Envoi du témoignage"} loadingStyle={"spin"} />
            :
            <Button btnStyle={" btn--post-testimonies"} text="Poster un témoignage" btnClick={handleNewTestimonyForm} />
          }
        </div>
        {overviewTestimonyLoading ?
          <Loading text={"Chargement des témoignages"} loadingStyle={"spin"} />
          :
          <div className="testimonies-overview__slider">
            <ul className="testimonies-overview__slides" ref={testimoniesRef}>
              {overview.map((testimony, index) => (
                <li key={testimony.id} id={`testimonies-overview__slide--${index + 1}`} className="testimonies-overview__slide">
                  <TestimonyCard
                    author={testimony.username}
                    imgUrl={`${APP_ROUTES.API_URL}${testimony.avatar_url}`}
                    date={setToLocalDate(testimony.date)}
                    content={testimony.truncated_content}
                    btnText={'Lire la suite'}
                    btnClick={() => handleReadMore(testimony)}
                  />
                  <a
                    onClick={handlePrevious}
                    className="testimonies-overview__link testimonies-overview--previous"
                    href={index === 0 ? `#testimonies-overview__slide--${overview.length}` : `#testimonies-overview__slide--${index}`}
                    aria-label="Slide précédent"></a>
                  <a
                    onClick={handleNext}
                    className="testimonies-overview__link testimonies-overview--next"
                    href={overview.length === index + 1 ? `#testimonies-overview__slide--1` : `#testimonies-overview__slide--${index + 2}`}
                    aria-label="Slide suivant"></a>
                </li>
              ))}
            </ul>
            <Breadcrumbs>
              {overview.map((testimony, index) => (
                <li key={index}>
                  <a
                    onClick={(e) => handleNavigate(e, index)}
                    className={index === currentIndex ? "active" : ""}
                    href={`#testimonies-overview__slide--${index + 1}`}
                    aria-label={`Aller au slide ${index + 1}`}></a>
                </li>
              ))}
            </Breadcrumbs>
          </div>
        }
      </article>
      <div className="btn-wrapper">
        <Link className="btn btn--read-more-testimonies" to={APP_ROUTES.TESTIMONIES}>Voir plus de témoignages</Link>
      </div>
      <Dialog>
        {isReadMoreTestimoniesOverview &&
          <div className="dialog-wrapper dialog--read-one-testimony">
            <TestimonyCard
              author={one.username}
              imgUrl={one.avatar_url}
              date={setToLocalDate(one.date)}
              content={one.content}
              btnText={
                <FaXmark className="manage-icons" role="button" aria-label="Fermer le témoignage" />
              }
              btnClick={handleCancel}
            />
          </div>
        }
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
  );
}

export default HomeTestimonies;