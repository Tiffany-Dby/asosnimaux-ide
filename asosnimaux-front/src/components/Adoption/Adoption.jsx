// Styles
import "./adoption.scss";
// Components
import AnimalCard from "../AnimalCard/AnimalCard";
import Dialog from "../Dialog/Dialog";
import Button from "../Button/Button";
import Filters from "../Filters/Filters";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Loading from "../Loading/Loading";
import { FaAngleRight, FaSliders } from "react-icons/fa6";
// React
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Thunks
import { getAllAnimalsThunk, getOneAnimalThunk } from "../../api/animal.api";
import { getUsersFollowIDsThunk, postUserFollowThunk, unfollowThunk } from "../../api/user.api";
// Reducers
import { setFollowIDsNotAuth, setFollowedAnimalsNotAuth, setSelectedAnimalFollow, setUnfollow } from "../../redux/reducers/user.reducer";
import { updateScroll } from "../../redux/reducers/window.reducer";
import { closeDialog, setIsFilters } from "../../redux/reducers/dialog.reducer";
// Constants
import { APP_ROUTES } from "../../constants/route.const";
// Utils
import { getAge } from "../../utils/animals.utils";
import { setToStorage } from "../../utils/storage.utils";

const Adoption = () => {
  const dispatch = useDispatch();

  // Window Reducer
  const { scrollY } = useSelector(state => state.windowReducer);

  // Animal Reducer
  const { animals, allAnimalsLoading, allAnimalsError } = useSelector(state => state.animalReducer);
  const { all } = animals;

  // User Reducer
  const { isAuth, followIDs, selectedAnimalFollow } = useSelector(state => state.userReducer);

  // *************** Filters State ***************
  const initialFiltersState = {
    species: ["chat", "chien", "autres"],
    sex: ["femelle", "mâle"],
    age: ["senior", "adulte", "junior"]
  }
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({ ...initialFiltersState });
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  // *************** End Filters State ***************

  // Update scrollY for the Filters button
  const handleScroll = () => dispatch(updateScroll({ scrollY: window.scrollY }));

  // Fetching -> Animals IDs followed by user if authenticated
  useEffect(() => {
    if (isAuth) dispatch(getUsersFollowIDsThunk());
  }, [isAuth]);

  // Fetching -> All animals & add/removeEventlistener on "scroll"
  useEffect(() => {
    dispatch(getAllAnimalsThunk());

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Set filters when component loads
  useEffect(() => {
    setFilteredAnimals([...all]);
  }, [all]);

  // *************** Toggle follow/unfollow animals *************** 
  // Set the Animal for the Toggle
  const handleFollowClick = (animal) => {
    dispatch(setSelectedAnimalFollow(animal.id));
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

  // Gets animal to redirect -> animal page
  const handleOneAnimalClick = (animal) => {
    dispatch(getOneAnimalThunk(animal.id))
  }

  // *************** Filters ***************
  // Open
  const handleOpenFilters = () => {
    dispatch(setIsFilters());
  }

  // Close
  const handleCloseFilters = () => {
    dispatch(closeDialog());
  }

  // Search onChange (by animal name)
  useEffect(() => {
    const filtered = all.filter(animal => {
      const searchFilters = animal.name.toLowerCase().startsWith(searchInput.toLowerCase());
      return searchFilters;
    });

    setFilteredAnimals(filtered);
  }, [searchInput]);

  // Checkbox onChange
  const handleApplyFilters = (newFilters) => {
    const filtered = all.filter(animal => {
      const speciesFilters = newFilters.species.includes(animal.species);
      const sexFilters = newFilters.sex.includes(animal.sex);
      const ageFilters = (newFilters.age.includes(getAge(animal.age)));

      return speciesFilters && sexFilters && ageFilters;
    });

    setFilters(newFilters);
    setFilteredAnimals(filtered);
  }

  // Reset
  const handleResetFilters = () => {
    setFilters(initialFiltersState);
    setFilteredAnimals([...all]);
  }
  // *************** End Filters ***************

  return (
    <div className="animals__page">
      <div className="title-wrapper">
        <h1>Adoption</h1>
      </div>
      <Breadcrumbs>
        <li className="breadcrumbs__link">
          <Link to={APP_ROUTES.HOME} >
            Accueil
          </Link>
          <FaAngleRight className="breadcrumbs__icon" />
        </li>
        <li className="breadcrumbs__link">
          <p>Adoption</p>
        </li>
      </Breadcrumbs>
      <section className="animals">
        <div className="animals__header">
          <h2>Les animaux du refuge</h2>
          <p>Vous trouverez ici tous les animaux en attente d'une famille pour les accueillir ! Ils n'attendent que vous pour aimer et être aimé.</p>
        </div>
        <Button
          text={
            <React.Fragment>
              <FaSliders className="manage-icons" />
              {scrollY < 230 ? "Filtres" : ""}
            </React.Fragment>}
          btnClick={handleOpenFilters} />
        {allAnimalsError &&
          <p className="text-error">{allAnimalsError}</p>
        }
        {allAnimalsLoading ?
          <Loading text={"Chargement"} loadingStyle={"paws"} />
          :
          <div className="animals__wrapper">
            {filteredAnimals.map(animal => (
              <AnimalCard
                key={animal.id}
                animalName={animal.name}
                imgUrl={`${APP_ROUTES.API_URL}${animal.picture_url}`}
                imgAlt={animal.picture_caption}
                animalSex={animal.sex}
                status={animal.status}
                color={followIDs.includes(animal.id) && "var(--light-red)"}
                followClick={() => handleFollowClick(animal)}
                linkRedirect={`${APP_ROUTES.ADOPTION}/${animal.id}`}
                linkClick={() => handleOneAnimalClick(animal)} />
            ))
            }
          </div>
        }
        {filteredAnimals.length === 0 &&
          <p>Aucun animal ne correspond à vos filtres actuels.</p>
        }
      </section>
      <Dialog>
        <Filters
          onClick={handleCloseFilters}
          initialFilters={filters}
          searchValue={searchInput}
          onSearchChange={(value) => setSearchInput(value)}
          resetFilters={initialFiltersState}
          onFiltersChange={handleApplyFilters}
          resetClick={() => handleResetFilters()} />
      </Dialog>
    </div>
  )
}

export default Adoption;