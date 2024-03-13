// Styles
import "./favorites.scss";
// Components
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import FavoriteCard from "../FavoriteCard/FavoriteCard";
import Loading from "../Loading/Loading";
import { FaAngleRight, FaCircleInfo } from "react-icons/fa6";
// React
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Thunks
import { getUsersFollowIDsThunk, getUsersFollowThunk, unfollowThunk } from "../../api/user.api";
import { getOneAnimalThunk } from "../../api/animal.api";
// Reducers
import { setFollowedAnimalsNotAuth, setSelectedAnimalFollow, setUnfollow } from "../../redux/reducers/user.reducer";
// Constants
import { APP_ROUTES } from "../../constants/route.const";
// Utils
import { setToStorage } from "../../utils/storage.utils";

const Favorites = () => {
  const dispatch = useDispatch();

  // User Reducer
  const { isAuth, followIDs, followedAnimals, followedAnimalsLoading, followedAnimalsError, selectedAnimalFollow } = useSelector(state => state.userReducer);

  // Animal Reducer
  const { animals } = useSelector(state => state.animalReducer);
  const { all } = animals;

  // Fetching -> Animals and their IDs followed by user if authenticated
  useEffect(() => {
    if (isAuth) {
      dispatch(getUsersFollowIDsThunk());
      dispatch(getUsersFollowThunk());
    }
  }, [isAuth]);

  // *************** Unfollow animal *************** 
  // Set the Animal to Unfollow
  const handleUnfollow = (animal) => {
    dispatch(setSelectedAnimalFollow(animal.id));
  }

  // Unfollow
  useEffect(() => {
    if (selectedAnimalFollow) {
      if (isAuth) {
        // Authenticated user -> delete thunk
        dispatch(unfollowThunk());
      }
      else {
        // Non-authenticated user -> remove from local storage
        dispatch(setUnfollow({ animalID: selectedAnimalFollow }));
      }
    }

    dispatch(setSelectedAnimalFollow(""));
  }, [selectedAnimalFollow]);

  useEffect(() => {
    if (!isAuth) {
      // Non-authenticated user -> followIDs updated in local storage
      setToStorage("followIDs", followIDs);
      dispatch(setFollowedAnimalsNotAuth({ animals: all }));
    }
  }, [followIDs]);
  // *************** End Unfollow animal ***************


  // Gets animal to redirect -> animal page
  const handleOneAnimalClick = (animal) => {
    dispatch(getOneAnimalThunk(animal.id));
  }

  return (
    <div className="favorites__page">
      <div className="title-wrapper">
        <h1>Favoris</h1>
      </div>
      <Breadcrumbs>
        <li className="breadcrumbs__link">
          <Link to={APP_ROUTES.HOME} >
            Accueil
          </Link>
          <FaAngleRight className="breadcrumbs__icon" />
        </li>
        <li className="breadcrumbs__link">
          <p>Favoris</p>
        </li>
      </Breadcrumbs>
      <section className="favorites">
        <div className="favorites__header">
          {!isAuth &&
            <div className="notAuth">
              <FaCircleInfo className="icon" color={"var(--dark-red)"} />
              <p>La liste actuelle est <strong>temporaire</strong>, si vous souhaitez la retrouver lors de votre prochaine visite, <Link to={APP_ROUTES.SIGN_IN}>connectez-vous</Link>.</p>
            </div>
          }
          <h2>Animaux coups coeur</h2>
          {followedAnimalsError &&
            <p className="text-error">{followedAnimalsError}</p>
          }
          {followedAnimalsLoading ?
            <Loading text={"Chargement"} loadingStyle={"paws"} />
            :
            (followedAnimals.length > 0 ?
              <p>Vous suivez actuellement {followedAnimals.length} {followedAnimals.length === 1 && "animal"}{followedAnimals.length > 1 && "animaux"} !</p>
              :
              <p>Vous n'avez aucun favoris.</p>
            )
          }
        </div>
        {!followedAnimalsLoading && followedAnimals.length > 0 &&
          <div className="favorites__wrapper">
            {followedAnimals.map(animal => (
              <FavoriteCard
                key={animal.id}
                animalName={animal.name}
                imgUrl={`${APP_ROUTES.API_URL}${animal.picture_url}`}
                imgAlt={animal.picture_caption}
                description={animal.truncated_description}
                status={animal.status}
                animalSex={animal.sex}
                btnClick={() => handleUnfollow(animal)}
                linkRedirect={`${APP_ROUTES.ADOPTION}/${animal.id}`}
                linkClick={() => handleOneAnimalClick(animal)}
              />
            ))}
          </div>
        }
      </section>
    </div>
  );
}

export default Favorites;