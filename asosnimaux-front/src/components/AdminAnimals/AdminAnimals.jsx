// Styles
import "./adminAnimals.scss";
// Components
import Button from "../Button/Button";
import Loading from "../Loading/Loading";
import { FaMars, FaPencil, FaTrashCan, FaVenus } from "react-icons/fa6";
// React
import { useDispatch, useSelector } from "react-redux";
// Reducers
import { setIsDeleteAnimalForm, setIsNewAnimalForm, setIsUpdateAnimalForm, setIsUpdateExitAnimalForm } from "../../redux/reducers/dialog.reducer";
import { setSelectedAnimal } from "../../redux/reducers/animal.reducer";
// Utils
import { setToLocalDate, setToYYYYMMDD } from "../../utils/date.utils";

const AdminAnimals = () => {
  const dispatch = useDispatch();

  // Animal Reducer
  const { animals, allAnimalsLoading, allAnimalsError, newAnimalLoading, newAnimalError, selectedAnimalLoading, selectedAnimalError, deleteAnimalLoading, deleteAnimalError } = useSelector(state => state.animalReducer);

  // *************** Set Dialog Type -> Open ***************
  // New Animal Dialog
  const handleNewAnimalForm = () => {
    dispatch(setIsNewAnimalForm());
  }

  // Update Animal Dialog
  const handleUpdateAnimalForm = (animal) => {
    dispatch(setIsUpdateAnimalForm());
    dispatch(setSelectedAnimal({ id: animal.id, birthdate: setToYYYYMMDD(animal.birthdate), name: animal.name, sex: animal.sex, description: animal.description, race: animal.race, status: animal.status, species: animal.species, exit_date: animal.exit_date }));
  }

  // Update Animal Exit date Dialog
  const handleUpdateExitAnimalForm = (animal) => {
    dispatch(setIsUpdateExitAnimalForm());
    dispatch(setSelectedAnimal({ id: animal.id, exit_date: animal.exit_date }));
  }

  // Delete Animal Dialog
  const handleDeleteAnimalForm = (animal) => {
    dispatch(setIsDeleteAnimalForm());
    dispatch(setSelectedAnimal({ id: animal.id }));
  }
  // *************** End Set Dialog Type -> Open ***************

  return (
    <section className="admin__wrapper">
      <div className="admin__all-animals">
        {selectedAnimalError &&
          <p className="text-error">{selectedAnimalError}</p>
        }
        {newAnimalError &&
          <p className="text-error">{newAnimalError}</p>
        }
        {deleteAnimalError &&
          <p className="text-error">{deleteAnimalError}</p>
        }
        {allAnimalsError &&
          <p className="text-error">{allAnimalsError}</p>
        }
        <div className="admin__header">
          <h2>Tous les animaux ({animals.all.length})</h2>
          {newAnimalLoading || allAnimalsLoading ?
            <Loading text={(newAnimalLoading && "Ajout de l'animal") || (allAnimalsLoading && "Chargement des animaux")} loadingStyle={"spin"} />
            :
            <Button text={"Ajouter un animal"} btnClick={handleNewAnimalForm} />
          }
        </div>
        <div className="admin__all-animals__wrapper">
          {animals.all.map((animal) => (
            <article key={animal.id} className="admin__animal">
              <h3 className="admin__animal__title">{animal.name}, {(animal.age < 1) && "moins d'1 an"}{(animal.age >= 1 && animal.age < 2) && `${animal.age} an`}{animal.age >= 2 && `${animal.age} ans`}<span>{animal.sex === "mâle" && <FaMars className="manage-icons" />}{animal.sex === "femelle" && <FaVenus className="manage-icons" />}</span></h3>
              <div className="admin__animal__content">
                <div className="admin__animal__details">
                  <div className="admin__animal__details__entry">
                    <p>Entrée :<span>{setToLocalDate(animal.entry_date)}</span></p>

                  </div>
                  <div className="admin__animal__details__exit">
                    <p>Sortie :<span>{animal.exit_date ? setToLocalDate(animal.exit_date) : "Inconnue"}</span></p>
                    <FaPencil className="manage-icons" onClick={() => handleUpdateExitAnimalForm(animal)} role="button" aria-label="Bouton de modification de la date de sortie de l'animal" />
                  </div>
                </div>
                <div className="admin__animal__details">
                  <div className="admin__animal__details__species">
                    <p>Espèce : </p>
                    <p>{animal.species}</p>
                  </div>
                  <div className="admin__animal__details__status">
                    <p>Etat : </p>
                    <p>{animal.status}</p>
                  </div>
                </div>
              </div>
              {selectedAnimalLoading || deleteAnimalLoading ?
                <Loading text={(selectedAnimalLoading && "Mise à jour de l'animal") || (deleteAnimalLoading && "Suppression de l'animal")} loadingStyle={"spin"} />
                :
                <div className="icons-wrapper">
                  <FaPencil className="manage-icons" onClick={() => handleUpdateAnimalForm(animal)} role="button" aria-label="Bouton de modification de l'animal" />
                  <FaTrashCan className="manage-icons" color="var(--dark-red)" onClick={() => handleDeleteAnimalForm(animal)} role="button" aria-label="Bouton de suppression de l'animal" />
                </div>
              }
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AdminAnimals;