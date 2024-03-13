// Styles
import "./admin.scss";
// Components
import Button from "../Button/Button";
import Input from "../Input/Input";
import InputFile from "../InputFile/InputFile";
import Dialog from "../Dialog/Dialog";
import InputSelect from "../InputSelect/InputSelect.jsx";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs.jsx";
import { FaAngleRight } from "react-icons/fa6";
// React
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
// Thunks
import { deleteArticleThunk, getAllArticlesThunk, postArticleThunk, updateArticleThunk } from "../../api/article.api";
import { deleteAnimalThunk, getAllAnimalsThunk, postNewAnimalThunk, updateAnimalExitDateThunk, updateAnimalThunk } from "../../api/animal.api.js";
import { deleteUserThunk, getAllUsersThunk, updateUserRoleThunk } from "../../api/user.api.js";
import { deleteTestimonyThunk, getAllTestimoniesThunk } from "../../api/testimony.api.js";
// Reducers
import { setNewArticleError, setSelectedArticle, updateFormNewArticle, updateFormSelectedArticle } from "../../redux/reducers/article.reducer";
import { closeDialog } from "../../redux/reducers/dialog.reducer";
import { setNewAnimalError, setSelectedAnimal, updateFormNewAnimal, updateFormSelectedAnimal } from "../../redux/reducers/animal.reducer.js";
import { setSelectedUser, updateFormSelectedUser } from "../../redux/reducers/user.reducer.js";
import { setSelectedTestimony } from "../../redux/reducers/testimony.reducer.js";
// Constants
import { APP_ROUTES } from "../../constants/route.const";
// Utils
import { resetAdminForms, resetAdminSelects } from "../../utils/reset.utils.js";
import { setMinMaxDate } from "../../utils/date.utils.js";
import { getSizeInMb } from "../../utils/formidable.utils.js";

const Admin = () => {
  const dispatch = useDispatch();

  // User Reducer
  const { user, selectedUser } = useSelector(state => state.userReducer);

  // Dialog Reducer
  const { isNewArticleForm, isDeleteArticleForm, isUpdateArticleForm, isNewAnimalForm, isUpdateAnimalForm, isUpdateExitAnimalForm, isDeleteAnimalForm, isDeleteUserBySuperAdminForm, isUpdateUserRoleBySuperAdminForm, isDeleteTestimonyByAdmin } = useSelector(state => state.dialogReducer);

  // Article Reducer
  const { articles, newArticleError } = useSelector(state => state.articleReducer);
  const { newArticle, selectedArticle } = articles;

  // Animal Reducer
  const { animals, newAnimalError, selectedAnimalError } = useSelector(state => state.animalReducer);

  // Testimony Reducer
  const { testimonies } = useSelector(state => state.testimonyReducer);

  // Files -> Articles and Animals
  const inputFileRef = useRef(null);
  const [file, setFile] = useState(null);

  // Input select -> Animals options
  const animalOptions = {
    sex: [
      { label: "Femelle", value: "femelle" },
      { label: "Mâle", value: "mâle" }
    ],
    status: [
      { label: "En attente", value: "en attente" },
      { label: "Adopté", value: "adopté" },
      { label: "Réservé", value: "réservé" },
    ],
    species: [
      { label: "Chien", value: "chien" },
      { label: "Chat", value: "chat" },
    ]
  }

  // Input select -> Users options
  const userOptions = [
    { label: "membre", value: "membre" },
    { label: "admin", value: "admin" },
    { label: "super_admin", value: "super_admin" }
  ]

  // Add class 'active' on the current Admin tab
  const checkActiveLink = ({ isActive }) => isActive ? 'active' : '';

  // Fetching all Aritcles, Animals, Testimonies and Users
  useEffect(() => {
    dispatch(getAllArticlesThunk());
    dispatch(getAllAnimalsThunk());
    dispatch(getAllTestimoniesThunk());
    dispatch(getAllUsersThunk());
  }, []);

  // *************** Submit ***************
  // ******* Article *******
  // New Article
  const handleSubmitNew = e => {
    e.preventDefault();

    // Check if file size is greater than 5Mb
    const fileSize = getSizeInMb(file);
    if (fileSize > 5) {
      dispatch(setNewArticleError({ error: "Le fichier est trop lourd, il doit être inférieur à 5Mb" }));
      return;
    }

    dispatch(postArticleThunk(file));
    setFile(null);
    if (inputFileRef.current) inputFileRef.current.value = null;
    dispatch(closeDialog());
  }

  // Update Article
  const handleSubmitSelected = e => {
    e.preventDefault();
    dispatch(updateArticleThunk());
    dispatch(setSelectedArticle({ id: "", name: "", location: "", description: "" }));
    dispatch(closeDialog());
  }

  // Delete Article
  const handleConfirmedArticleDeletion = () => {
    dispatch(deleteArticleThunk(selectedArticle.id));
    dispatch(setSelectedArticle({ id: "", name: "", location: "", description: "" }));
    dispatch(closeDialog());
  }
  // ******* End Article *******

  // ******* Animal *******
  // New Animal
  const handleSubmitNewAnimal = e => {
    e.preventDefault();

    // Check if options are filled
    if (!animals.newAnimal.sex || !animals.newAnimal.status || !animals.newAnimal.species) {
      dispatch(setNewAnimalError({ error: "Veuillez choisir toutes les options" }))
      return;
    }

    // Check if file size is greater than 5Mb
    const fileSize = getSizeInMb(file);
    if (fileSize > 5) {
      dispatch(setNewAnimalError({ error: "Le fichier est trop lourd, il doit être inférieur à 5Mb" }));
      return;
    }

    dispatch(postNewAnimalThunk(file));
    setFile(null);
    if (inputFileRef.current) inputFileRef.current.value = null;
    dispatch(closeDialog());
  }

  // Update Animal
  const handleSubmitSelectedAnimal = e => {
    e.preventDefault();

    // Check if options are filled
    if (!animals.selectedAnimal.sex || !animals.selectedAnimal.status || !animals.selectedAnimal.species) {
      dispatch(selectedAnimalError({ error: "Veuillez choisir toutes les options" }))
      return;
    }

    dispatch(updateAnimalThunk());
    dispatch(setSelectedAnimal({ id: "", birthdate: "", name: "", sex: "", description: "", race: "", status: "", species: "", exit_date: "" }));
    dispatch(closeDialog());
  }

  // Update Animal Exit date
  const handleSumbitExitAnimal = e => {
    e.preventDefault();
    dispatch(updateAnimalExitDateThunk());
    dispatch(setSelectedAnimal({ id: "", exit_date: "" }));
    dispatch(closeDialog());
  }

  // Delete Animal
  const handleConfirmedAnimalDeletion = () => {
    dispatch(deleteAnimalThunk(animals.selectedAnimal.id));
    dispatch(setSelectedAnimal({ id: "", birthdate: "", name: "", sex: "", description: "", race: "", status: "", species: "", exit_date: "" }));
    dispatch(closeDialog());
  }
  // ******* End Animal *******

  // ******* User *******
  // Update User Role
  const handleUpdateRoleSubmit = e => {
    e.preventDefault();
    dispatch(updateUserRoleThunk());
    dispatch(setSelectedUser({ id: "", username: "", role: "" }));
    dispatch(closeDialog());
  }

  // Delete User
  const handleConfirmedUserDeletion = () => {
    dispatch(deleteUserThunk(selectedUser.id));
    dispatch(setSelectedUser({ id: "", username: "", role: "" }));
    dispatch(closeDialog());
  }
  // ******* End User *******

  // ******* Testimony *******
  // Delete Testimony
  const handleConfirmedTestimonyDeletion = () => {
    dispatch(deleteTestimonyThunk(testimonies.selectedTestimony.id));
    dispatch(setSelectedTestimony({ id: "", user_id: "", content: "" }));
    dispatch(closeDialog());
  }
  // ******* End Testimony *******
  // *************** End Submit ***************

  // *************** Inputs onChange ***************
  // New Article
  const updateFormNew = (input, value) => dispatch(updateFormNewArticle({ input, value }));

  // Update Article
  const updateFormSelected = (input, value) => dispatch(updateFormSelectedArticle({ input, value }));

  // New Animal
  const updateNewAnimalFrom = (input, value) => dispatch(updateFormNewAnimal({ input, value }));

  // Update Animal
  const updateSelectedAnimalForm = (input, value) => dispatch(updateFormSelectedAnimal({ input, value }));

  // Update User Role
  const updateFormUserSelected = (input, value) => dispatch(updateFormSelectedUser({ input, value }));
  // *************** End Inputs onChange ***************

  // Delete accordingly -> set on click
  const handleConfirmedDeleteClick = () => {
    // Dialog delete Article
    if (isDeleteArticleForm) handleConfirmedArticleDeletion();

    // Dialog delete Animal
    if (isDeleteAnimalForm) handleConfirmedAnimalDeletion();

    // Dialog delete User
    if (isDeleteUserBySuperAdminForm) handleConfirmedUserDeletion();

    // Dialog delete Testimony
    if (isDeleteTestimonyByAdmin) handleConfirmedTestimonyDeletion();
  }

  // Cancel
  const handleCancel = () => {
    dispatch(setNewAnimalError({ error: null }));
    dispatch(setNewArticleError({ error: null }));
    // Utils -> reset.utils.js -> reset forms : New article & New animal
    resetAdminForms(dispatch);
    // Utils -> reset.utils.js -> reset selected (update/delete) : Article, Animal, Testimony, User
    resetAdminSelects(dispatch);
    dispatch(closeDialog());
  }

  return (
    <div className="admin">
      <div className="title-wrapper">
        <h1>Administrateur</h1>
      </div>
      <Breadcrumbs>
        <li className="breadcrumbs__link">
          <Link to={APP_ROUTES.HOME} >
            Accueil
          </Link>
          <FaAngleRight className="breadcrumbs__icon" />
        </li>
        <li className="breadcrumbs__link">
          <p>Administrateur</p>
        </li>
      </Breadcrumbs>
      <nav className="admin__nav">
        <ul className="admin__nav__links">
          <li className="admin__nav__link">
            <NavLink className={checkActiveLink} to={`${APP_ROUTES.ADMIN}/articles`}>Articles</NavLink>
          </li>
          <li className="admin__nav__link">
            <NavLink className={checkActiveLink} to={`${APP_ROUTES.ADMIN}/animals`}>Animaux</NavLink>
          </li>
          <li className="admin__nav__link">
            <NavLink className={checkActiveLink} to={`${APP_ROUTES.ADMIN}/testimonies`}>Témoignages</NavLink>
          </li>
          {user.role === 'super_admin' &&
            <li className="admin__nav__link">
              <NavLink className={checkActiveLink} to={`${APP_ROUTES.ADMIN}/users`}>Utilisateurs</NavLink>
            </li>
          }
        </ul>
      </nav>
      <Outlet />
      <Dialog>
        {isUpdateUserRoleBySuperAdminForm &&
          <div className="dialog-wrapper user__update">
            <div className="title-wrapper">
              <h2>Mettre à jour le rôle</h2>
            </div>
            <form onSubmit={handleUpdateRoleSubmit}>
              <InputSelect
                id="role"
                label="Choisissez un nouveau rôle"
                options={userOptions}
                value={selectedUser.role}
                onChange={(value) => updateFormUserSelected("role", value)} />
              <div className="btns-wrapper">
                <Button text="Confirmer" type="submit" />
                <Button text="Annuler" btnClick={handleCancel} />
              </div>
            </form>
          </div>
        }
        {isNewAnimalForm &&
          <div className="dialog-wrapper admin__new-animal">
            <div className="title-wrapper">
              <h2>Ajouter un animal</h2>
            </div>
            {newAnimalError &&
              <p className="text-error">{newAnimalError}</p>
            }
            <form onSubmit={handleSubmitNewAnimal}>
              <Input
                label="Nom"
                id="name"
                required={true}
                value={animals.newAnimal.name}
                onChange={value => updateNewAnimalFrom("name", value)} />
              <Input
                label="Date de naissance"
                type="date"
                id="birthdate"
                required={true}
                value={animals.newAnimal.birthdate}
                onChange={value => updateNewAnimalFrom("birthdate", value)} />
              <InputSelect
                id="sex"
                label="Sexe de l'animal"
                inputStyle={newAnimalError && !animals.newAnimal.sex ? " input--error" : ""}
                options={animalOptions.sex}
                value={animals.newAnimal.sex}
                onChange={(value) => updateNewAnimalFrom("sex", value)} />
              <InputSelect
                id="status"
                label="Etat de l'adoption"
                inputStyle={newAnimalError && !animals.newAnimal.status ? " input--error" : ""}
                options={animalOptions.status}
                value={animals.newAnimal.status}
                onChange={(value) => updateNewAnimalFrom("status", value)} />
              <InputSelect
                id="species"
                label="Espèce"
                inputStyle={newAnimalError && !animals.newAnimal.species ? " input--error" : ""}
                options={animalOptions.species}
                value={animals.newAnimal.species}
                onChange={(value) => updateNewAnimalFrom("species", value)} />
              <Input
                label="Race"
                id="race"
                required={true}
                value={animals.newAnimal.race}
                onChange={value => updateNewAnimalFrom("race", value)} />
              <InputFile
                label="Choisir une image"
                id="picture_url"
                required={true}
                value={animals.newAnimal.picture_url}
                onChange={file => setFile(file)}
                inputStyle={newAnimalError && (file && getSizeInMb(file) > 5) ? " input--error" : ""}
                inputFileRef={inputFileRef} />
              <Input
                label="Description de l'image"
                id="picture_caption"
                required={true}
                value={animals.newAnimal.picture_caption}
                onChange={value => updateNewAnimalFrom("picture_caption", value)} />
              <div className="input__wrapper">
                <label className="input__label" htmlFor="description">Présentation</label>
                <textarea
                  className="input"
                  name="description"
                  id="description"
                  required={true}
                  value={animals.newAnimal.description || ""}
                  onChange={e => updateNewAnimalFrom("description", e.target.value)}></textarea>
              </div>
              <div className="btns-wrapper">
                <Button text="Valider" type="submit" />
                <Button text="Annuler" btnClick={handleCancel} />
              </div>
            </form>
          </div>
        }
        {isUpdateAnimalForm &&
          <div className="dialog-wrapper admin__update-animal">
            <div className="title-wrapper">
              <h2>Mettre à jour un animal</h2>
            </div>
            <form onSubmit={handleSubmitSelectedAnimal}>
              <Input
                label="Nom"
                id="name"
                required={true}
                value={animals.selectedAnimal.name}
                onChange={value => updateSelectedAnimalForm("name", value)} />
              <Input
                label="Date de naissance"
                type="date"
                id="birthdate"
                required={true}
                value={animals.selectedAnimal.birthdate}
                onChange={value => updateSelectedAnimalForm("birthdate", value)} />
              {selectedAnimalError &&
                <p className="text-error">{selectedAnimalError}</p>
              }
              <InputSelect
                id="sex"
                label="Sexe de l'animal"
                inputStyle={selectedAnimalError && !animals.selectedAnimal.sex ? " input--error" : ""}
                options={animalOptions.sex}
                value={animals.selectedAnimal.sex}
                onChange={(value) => updateSelectedAnimalForm("sex", value)} />
              <InputSelect
                id="status"
                label="Etat de l'adoption"
                inputStyle={selectedAnimalError && !animals.selectedAnimal.status ? " input--error" : ""}
                options={animalOptions.status}
                value={animals.selectedAnimal.status}
                onChange={(value) => updateSelectedAnimalForm("status", value)} />
              <InputSelect
                id="species"
                label="Espèce"
                inputStyle={selectedAnimalError && !animals.selectedAnimal.species ? " input--error" : ""}
                options={animalOptions.species}
                value={animals.selectedAnimal.species}
                onChange={(value) => updateSelectedAnimalForm("species", value)} />
              <Input
                label="Race"
                id="race"
                required={true}
                value={animals.selectedAnimal.race}
                onChange={value => updateSelectedAnimalForm("race", value)} />
              <div className="input__wrapper">
                <label className="input__label" htmlFor="description">Présentation</label>
                <textarea
                  className="input"
                  name="description"
                  id="description"
                  required={true}
                  value={animals.selectedAnimal.description || ""}
                  onChange={e => updateSelectedAnimalForm("description", e.target.value)}></textarea>
              </div>
              <div className="btns-wrapper">
                <Button text="Valider" type="submit" />
                <Button text="Annuler" btnClick={handleCancel} />
              </div>
            </form>
          </div>
        }
        {isUpdateExitAnimalForm &&
          <div className="dialog-wrapper admin__update-animal">
            <div className="title-wrapper">
              <h2>Mettre à jour un animal</h2>
            </div>
            <form onSubmit={handleSumbitExitAnimal}>
              <Input
                label="Date de sortie"
                id="exit_date"
                type="date"
                min={setMinMaxDate("-", 7)}
                max={setMinMaxDate("+", 365)}
                required={true}
                value={animals.selectedAnimal.exit_date}
                onChange={value => updateSelectedAnimalForm("exit_date", value)} />
              <div className="btns-wrapper">
                <Button text="Valider" type="submit" />
                <Button text="Annuler" btnClick={handleCancel} />
              </div>
            </form>
          </div>
        }
        {isNewArticleForm &&
          <div className="dialog-wrapper admin__new-article">
            <div className="title-wrapper">
              <h2>Nouvel article</h2>
            </div>
            {newArticleError &&
              <p className="text-error">{newArticleError}</p>
            }
            <form onSubmit={handleSubmitNew}>
              <Input
                label="Titre"
                id="name"
                required={true}
                value={newArticle.name}
                onChange={value => updateFormNew("name", value)} />
              <Input
                label="Localisation"
                id="location"
                required={true}
                value={newArticle.location}
                onChange={value => updateFormNew("location", value)} />
              <InputFile
                label="Choisir une image"
                id="picture_url"
                required={true}
                value={newArticle.picture_url}
                onChange={file => setFile(file)}
                inputStyle={newArticleError && (file && getSizeInMb(file) > 5) ? " input--error" : ""}
                inputFileRef={inputFileRef} />
              <Input
                label="Description de l'image"
                id="picture_caption"
                required={true}
                value={newArticle.picture_caption}
                onChange={value => updateFormNew("picture_caption", value)} />
              <div className="input__wrapper">
                <label className="input__label" htmlFor="description">Contenu</label>
                <textarea
                  className="input"
                  name="description"
                  id="description"
                  required={true}
                  value={newArticle.description || ""}
                  onChange={e => updateFormNew("description", e.target.value)}></textarea>
              </div>
              <div className="btns-wrapper">
                <Button text="Valider" type="submit" />
                <Button text="Annuler" btnClick={handleCancel} />
              </div>
            </form>
          </div>
        }
        {(isDeleteArticleForm || isDeleteAnimalForm || isDeleteUserBySuperAdminForm || isDeleteTestimonyByAdmin) &&
          <div className="dialog-wrapper confirm-deletion">
            <div className="title-wrapper">
              <h2>Supprimer</h2>
            </div>
            <p>Supprimer {isDeleteArticleForm && "l'article"}{isDeleteAnimalForm && "l'animal"}{isDeleteUserBySuperAdminForm && "l'utilisateur"}{isDeleteTestimonyByAdmin && "le témoignage"} ?</p>
            <div className="btns-wrapper">
              <Button text="Confirmer" btnClick={handleConfirmedDeleteClick} />
              <Button text="Annuler" btnClick={handleCancel} />
            </div>
          </div>
        }
        {isUpdateArticleForm &&
          <div className="dialog-wrapper admin__update-article">
            <div className="title-wrapper">
              <h2>Mettre à jour un article</h2>
            </div>
            <form onSubmit={handleSubmitSelected}>
              <Input
                label="Titre"
                id="name"
                required={true}
                value={selectedArticle.name}
                onChange={value => updateFormSelected("name", value)} />
              <Input
                label="Localisation"
                id="location"
                value={selectedArticle.location}
                onChange={value => updateFormSelected("location", value)} />
              <div className="input__wrapper">
                <label className="input__label" htmlFor="description">Contenu</label>
                <textarea
                  className="input"
                  name="description"
                  id="description"
                  value={selectedArticle.description || ""}
                  onChange={e => updateFormSelected("description", e.target.value)}></textarea>
              </div>
              <div className="btns-wrapper">
                <Button text="Valider" type="submit" />
                <Button text="Annuler" btnClick={handleCancel} />
              </div>
            </form>
          </div>
        }
      </Dialog>
    </div>
  );
}

export default Admin;