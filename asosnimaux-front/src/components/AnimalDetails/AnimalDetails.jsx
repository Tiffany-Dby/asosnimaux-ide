// Styles
import "./animalDetails.scss";
// Components
import Button from "../Button/Button";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Loading from "../Loading/Loading";
import { FaAngleRight, FaCakeCandles, FaHeart } from "react-icons/fa6";
// React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// Thunks
import { getOneAnimalThunk } from "../../api/animal.api";
import { getUsersFollowIDsThunk, postUserFollowThunk, unfollowThunk } from "../../api/user.api";
// Reducers
import { setFollowIDsNotAuth, setFollowedAnimalsNotAuth, setSelectedAnimalFollow, setUnfollow } from "../../redux/reducers/user.reducer";
// Constants
import { APP_ROUTES } from "../../constants/route.const";
// Utils
import { formatDescription } from "../../utils/description.utils";
import { setToStorage } from "../../utils/storage.utils";
import { setToLocalDate } from "../../utils/date.utils";

const AnimalDetails = () => {
  const dispatch = useDispatch();

  // Get id from params -> case of reload from user
  const { id } = useParams();

  // User Reducer
  const { isAuth, followIDs, selectedAnimalFollow } = useSelector(state => state.userReducer);

  // Animal Reducer
  const { animals, oneAnimalLoading } = useSelector(state => state.animalReducer);
  const { one, all } = animals;

  // Fetching -> One animal using id from params
  useEffect(() => {
    if (id) dispatch(getOneAnimalThunk(id));
  }, []);

  // Fetching -> Animals IDs followed by user if authenticated 
  useEffect(() => {
    if (isAuth) {
      dispatch(getUsersFollowIDsThunk());
    }
  }, [isAuth]);

  // *************** Toggle follow/unfollow animals *************** 
  // Set the Animal for the Toggle
  const handleFollowClick = () => {
    dispatch(setSelectedAnimalFollow(one.id));
  }

  useEffect(() => {
    if (selectedAnimalFollow) {
      // Unfollow
      if (followIDs.includes(selectedAnimalFollow)) {
        // Authenticated user -> delete thunk
        if (isAuth) {
          dispatch(unfollowThunk());
        }
        // Non-authenticated user -> remove from local storage
        else {
          dispatch(setUnfollow({ animalID: selectedAnimalFollow }));
        }
      }
      // Follow
      if (!followIDs.includes(selectedAnimalFollow)) {
        // Authenticated user -> post thunk
        if (isAuth) {
          dispatch(postUserFollowThunk());
        }
        // Non-authenticated user -> IDs in followIDs array
        else {
          dispatch(setFollowIDsNotAuth({ id: selectedAnimalFollow }));
        }
      }
    }

    dispatch(setSelectedAnimalFollow(""));
  }, [selectedAnimalFollow]);

  useEffect(() => {
    // Non-authenticated user -> followIDs updated in local storage
    if (!isAuth) {
      setToStorage("followIDs", followIDs);
      dispatch(setFollowedAnimalsNotAuth({ animals: all }));
    }
  }, [followIDs]);
  // *************** End Toggle follow/unfollow animals ***************

  // Utils -> description.utils.js -> returns an array of strings
  const paragraphs = formatDescription(one.description);

  return (
    <div className="animal-page">
      <div className="title-wrapper">
        <h1>Profil</h1>
      </div>
      <Breadcrumbs>
        <li className="breadcrumbs__link">
          <Link to={APP_ROUTES.HOME} >
            Accueil
          </Link>
          <FaAngleRight className="breadcrumbs__icon" />
        </li>
        <li className="breadcrumbs__link">
          <Link to={APP_ROUTES.ADOPTION} >
            Adoption
          </Link>
          <FaAngleRight className="breadcrumbs__icon" />
        </li>
        <li className="breadcrumbs__link">
          <p>Profil : {one.name}</p>
        </li>
      </Breadcrumbs>
      {oneAnimalLoading ?
        <Loading text={"Chargement"} loadingStyle={"paws"} />
        :
        <article className="animal-page__profile">
          <div className="animal-page__profile__wrapper">
            <div className="title-wrapper">
              <h2>Fiche de {one.name}</h2>
            </div>
            <div className="animal-page__profile__img">
              <img crossOrigin="anonymous" src={one.picture_url} alt={one.picture_caption} />
              <FaHeart className="icon heart animal__follow-icon" color={followIDs.includes(one.id) ? "var(--light-red" : "var(--dark-grey)"} onClick={handleFollowClick} role="button" aria-label="Bouton d'ajout/retrait des favoris" />
            </div>
            <div className="animal-page__profile__table">
              <table>
                <tbody>
                  <tr>
                    <th>Anniversaire <FaCakeCandles /></th>
                    <td>{setToLocalDate(one.birthday)}</td>
                  </tr>
                  <tr>
                    <th>Âge</th>
                    <td>{one.age} an{one.age > 1 ? "s" : ""}</td>
                  </tr>
                  <tr>
                    <th>Sexe</th>
                    <td>{one.sex}</td>
                  </tr>
                  <tr>
                    <th>Espèce</th>
                    <td>{one.species}</td>
                  </tr>
                  <tr>
                    <th>Race</th>
                    <td>{one.race}</td>
                  </tr>
                  <tr>
                    <th>Etat</th>
                    <td>{one.status}</td>
                  </tr>
                  <tr>
                    <th>Au refuge depuis</th>
                    <td>{one.time_spent} jour{one.time_spent > 1 ? "s" : ""}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <section className="animal-page__profile__description">
              <h3>Présentation</h3>
              <div className="animal-page__profile__description__text">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              {one.status === "adopté" || one.status === "réservé" ?
                <Button btnStyle={" available--not"} text="Indisponible" disabled={true} />
                :
                <Button btnStyle={" available"} text="Rencontrer" btnClick={() => { }} />
              }
            </section>
          </div>
        </article>
      }
    </div>
  );
}

export default AnimalDetails;