// Styles
import "./user.scss";
// Components
import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import Input from "../Input/Input";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Loading from "../Loading/Loading";
import { FaAngleRight, FaPencil, FaTrashCan } from "react-icons/fa6";
// React
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Thunks
import { deleteUserThunk, updateAvatarThunk, updatePasswordThunk, updateUsernameThunk } from "../../api/user.api";
import { deleteTestimonyThunk, getOneUserTestimoniesThunk, updateTestimonyThunk } from "../../api/testimony.api";
// Reducers
import { resetDialogForm, setDialogError, setSelectedUser, setUpdatedAvatar, updateDialogForm } from "../../redux/reducers/user.reducer";
import { closeDialog, setInputFields, setIsDeleteAccountForm, setIsDeleteTestimony, setIsUpdateAccountAvatar, setIsUpdateAccountForm, setIsUpdateTestimony } from "../../redux/reducers/dialog.reducer";
import { setSelectedTestimony, updateFormSelectedTestimony } from "../../redux/reducers/testimony.reducer";
// Constants
import { AVATAR } from "../../constants/avatar.const";
import { APP_ROUTES } from "../../constants/route.const";
import { DUPLICATES } from "../../constants/errors.const";
// Utils
import { setToLocalDate } from "../../utils/date.utils";
import { hasLowercase, hasMinLength, hasNumber, hasSymbol, hasUppercase, isEmailValid, isUsernameValid } from "../../utils/input.utils";
import { getDuplicateErrorMessage } from "../../utils/error.utils";

const User = () => {
  const dispatch = useDispatch();

  // User Reducer
  const { user, selectedUser, dialogForms, dialogError, updatedAvatar, updatedAvatarError } = useSelector(state => state.userReducer);

  // Testimonies Reducer
  const { testimonies, allByOneUserLoading, allByOneUserError, selectedTestimonyLoading, selectedTestimonyError, deleteTestimonyLoading, deleteTestimonyError } = useSelector(state => state.testimonyReducer);
  const { allByOneUser, selectedTestimony } = testimonies;

  // Dialog Reducer
  const { input, isDeleteAccountForm, isUpdateAccountForm, isUpdateAccountAvatar, isUpdateTestimony, isDeleteTestimony } = useSelector(state => state.dialogReducer);

  // Fetching -> user's testimonies
  useEffect(() => {
    dispatch(getOneUserTestimoniesThunk());
  }, []);

  // *************** Avatar ***************
  // Constants -> avatar.constant.js -> url = string stored in an array
  const [avatarIndex, setAvatarIndex] = useState(null);

  // Open Dialog
  const handleUpdateAvatarDialog = () => {
    dispatch(setIsUpdateAccountAvatar());
  }

  // Update avatar
  const handleUpdateAvatar = () => {
    dispatch(updateAvatarThunk(updatedAvatar));
    dispatch(setUpdatedAvatar(""));
    dispatch(closeDialog());
  }
  // *************** End Avatar ***************

  // *************** Dialog ***************
  // Open appropriate Update Dialog for users informations
  const handleDialog = (input, value) => {
    dispatch(resetDialogForm());
    dispatch(setInputFields({ label: input.label, id: input.id, type: input.type }));
    dispatch(updateDialogForm({ input, value }));
    dispatch(setIsUpdateAccountForm());
  }

  // ***** UX - Helps *****
  // Username
  const [usernameLengthSuccess, setUsernameLengthSuccess] = useState(false);
  const [usernameValidSuccess, setUsernameValidSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  useEffect(() => {
    dialogForms.username?.length >= 4 && dialogForms.username?.length <= 12 ? setUsernameLengthSuccess(true) : setUsernameLengthSuccess(false);

    const checkUsername = isUsernameValid(dialogForms.username);
    checkUsername ? setUsernameValidSuccess(true) : setUsernameValidSuccess(false);
  }, [dialogForms.username]);

  // Email
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const checkEmail = isEmailValid(dialogForms.email);
    checkEmail ? setEmailSuccess(true) : setEmailSuccess(false);
  }, [dialogForms.email]);

  // Password
  const [pwHasSymbol, setPwHasSymbol] = useState(false);
  const [pwHasUpper, setPwHasUpper] = useState(false);
  const [pwHasLower, setPwHasLower] = useState(false);
  const [pwHasNumber, setPwHasNumber] = useState(false);
  const [pwHasMinLength, setPwHasMinLength] = useState(false);
  const [pwError, setPwError] = useState(false);

  useEffect(() => {
    const checkSymbol = hasSymbol(dialogForms.newPassword);
    checkSymbol ? setPwHasSymbol(true) : setPwHasSymbol(false);

    const checkUpper = hasUppercase(dialogForms.newPassword);
    checkUpper ? setPwHasUpper(true) : setPwHasUpper(false);

    const checkLower = hasLowercase(dialogForms.newPassword);
    checkLower && dialogForms.newPassword !== undefined ? setPwHasLower(true) : setPwHasLower(false);

    const checkNumber = hasNumber(dialogForms.newPassword);
    checkNumber ? setPwHasNumber(true) : setPwHasNumber(false);

    const checkLength = hasMinLength(dialogForms.newPassword, 8);
    checkLength ? setPwHasMinLength(true) : setPwHasMinLength(false);
  }, [dialogForms.newPassword]);

  // Confirm password
  const [confirmPw, setConfirmPw] = useState("");
  const [arePwSame, setArePwSame] = useState(false);
  const [arePwSameError, setArePwSameError] = useState(false);

  useEffect(() => {
    if (!!dialogForms.newPassword?.length && !!confirmPw.length) {
      dialogForms.newPassword === confirmPw ? setArePwSame(true) : setArePwSame(false);
    }
  }, [confirmPw, dialogForms.newPassword]);

  // Reset update inputs errors
  const handleResetErrors = () => {
    setUsernameError(false);
    setEmailError(false);
    setPwError(false);
    setArePwSameError(false);
  }
  // Reset confirm password (passed to Dialog)
  const resetConfirmPw = () => {
    setConfirmPw("");
  }

  const helps = {
    newPassword: [
      { success: pwHasSymbol, fail: !pwHasSymbol, message: "Un symbole" },
      { success: pwHasNumber, fail: !pwHasNumber, message: "Un chiffre" },
      { success: pwHasUpper, fail: !pwHasUpper, message: "Une lettre majuscule" },
      { success: pwHasLower, fail: !pwHasLower, message: "Une lettre minuscule" },
      { success: pwHasMinLength, fail: !pwHasMinLength, message: "8 caractères minimum" },
    ],
    email: [
      { success: emailSuccess, fail: !emailSuccess, message: "Exemple : votre@email.com" },
    ],
    username: [
      { success: usernameLengthSuccess, fail: !usernameLengthSuccess, message: "Entre 4 et 12 caractères" },
      { success: usernameValidSuccess, fail: !usernameValidSuccess, message: "Lettres et/ou chiffres (' - ' autorisé)" },
    ]
  }
  // ***** End UX - Helps *****

  // Open Update Dialog for Testimony
  const handleTestimonyDialog = (testimony) => {
    dispatch(setIsUpdateTestimony());
    dispatch(setSelectedTestimony({ id: testimony.id, user_id: testimony.user_id, content: testimony.content }));
  }

  // Open Delete User Dialog
  const handleDeleteUser = () => {
    dispatch(setIsDeleteAccountForm());
    dispatch(setSelectedUser({ id: user.id }));
  }

  // Open Delete Testimony Dialog
  const handleDeleteTestimony = (testimony) => {
    dispatch(setIsDeleteTestimony());
    dispatch(setSelectedTestimony({ id: testimony.id, user_id: testimony.user_id }));
  }

  // *************** Inputs onChange ***************
  // Update Username - Password - Email
  const updateForm = (input, value) => dispatch(updateDialogForm({ input, value }));

  // Update Testimony
  const updateTestimonyForm = (input, value) => dispatch(updateFormSelectedTestimony({ input, value }));
  // *************** End Inputs onChange ***************

  // Close Dialog
  const handleCancel = () => {
    setAvatarIndex(null);
    dispatch(resetDialogForm());
    setConfirmPw("");
    setArePwSame(false);
    handleResetErrors();
    dispatch(setUpdatedAvatar(""));
    dispatch(setSelectedTestimony({ id: "", user_id: "", content: "" }));
    dispatch(closeDialog());
  }
  // *************** End Dialog ***************

  // *************** Submit ***************
  // Update User's infos
  const handleSubmit = e => {
    e.preventDefault();

    // Reset all visual errors on click
    handleResetErrors();
    dispatch(setDialogError({ error: null }))

    if (input.id === "username") {
      if (!usernameLengthSuccess || !usernameValidSuccess) {
        setUsernameError(true);
        return;
      }
      dispatch(updateUsernameThunk());
    }
    else if (input.id === "email") {
      if (!emailSuccess) {
        setEmailError(true);
        return;
      }
      dispatch(updateUsernameThunk());
    }
    else if (input.id === "newPassword") {
      if (!pwHasSymbol || !pwHasUpper || !pwHasLower || !pwHasNumber || !pwHasMinLength) {
        setPwError(true);
        return;
      }
      if (!arePwSame) {
        setArePwSameError(true);
        return;
      }
      dispatch(updatePasswordThunk());
      setConfirmPw("");
    }
    dispatch(closeDialog());
  }

  // Update Testimony
  const handleSubmitSelectedTestimony = e => {
    e.preventDefault();
    dispatch(updateTestimonyThunk());
    dispatch(setSelectedTestimony({ id: "", user_id: "", content: "" }));
    dispatch(closeDialog());
  }

  // Delete User
  const handleConfirmedUserDeletion = () => {
    dispatch(deleteUserThunk(selectedUser.id));
    dispatch(closeDialog());
  }

  // Delete Testimony
  const handleConfirmedTestimonyDeletion = () => {
    dispatch(deleteTestimonyThunk(selectedTestimony.id));
    dispatch(setSelectedTestimony({ id: "", user_id: "", content: "" }));
    dispatch(closeDialog());
  }

  // Delete confirmed
  const handleConfirmedDeleteClick = () => {
    // Dialog delete User
    if (isDeleteAccountForm) handleConfirmedUserDeletion();

    // Dialog delete Testimony
    if (isDeleteTestimony) handleConfirmedTestimonyDeletion();
  }
  // *************** End Submit ***************

  return (
    <div className="user">
      <div className="title-wrapper">
        <h1>Dashboard</h1>
      </div>
      <Breadcrumbs>
        <li className="breadcrumbs__link">
          <Link to={APP_ROUTES.HOME} >
            Accueil
          </Link>
          <FaAngleRight className="breadcrumbs__icon" />
        </li>
        <li className="breadcrumbs__link">
          <p>Dashboard</p>
        </li>
      </Breadcrumbs>
      <section>
        <div className="user__infos__title">
          <h2>Informations de compte</h2>
        </div>
        {dialogError &&
          <span className="text-error">{getDuplicateErrorMessage(dialogError, DUPLICATES)}</span>
        }
        {updatedAvatarError &&
          <span className="text-error">{updatedAvatarError}</span>
        }
        <div className="user__infos__wrapper">
          <article className="user__infos">
            <div className="infos__header">
              <h3>Avatar</h3>
              <FaPencil className="manage-icons" onClick={handleUpdateAvatarDialog} role="button" aria-label="Bouton de modification d'avatar" />
            </div>
            <div className="infos">
              <div className="infos__img">
                <img crossOrigin="anonymous" src={user.avatar} alt={"Un sticker animal"} />
              </div>
            </div>
          </article>
          <article className="user__infos">
            <div className="infos__header">
              <h3>Pseudo</h3>
              <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Pseudo", id: "username", type: "text" })} role="button" aria-label="Bouton de modification du Pseudo" />
            </div>
            <div className="infos">
              <p>{user.username}</p>
            </div>
          </article>
          <article className="user__infos">
            <div className="infos__header">
              <h3>Email</h3>
              <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Email", id: "email", type: "email" })} role="button" aria-label="Bouton de modification de l'email" />
            </div>
            <div className="infos">
              <p>{user.email}</p>
            </div>
          </article>
          <article className="user__infos">
            <div className="infos__header">
              <h3>Mot de passe</h3>
              <FaPencil className="manage-icons" onClick={() => handleDialog({ label: "Nouveau mot de passe", id: "newPassword", type: "password" })} role="button" aria-label="Bouton de modification du mot de passe" />
            </div>
            <div className="infos">
              <p className="infos__password"></p>
            </div>
          </article>
        </div>
        <Button text="Supprimer le compte" btnClick={handleDeleteUser} />
      </section>

      <section>
        <div className="user__infos__title">
          <h2>Témoignages ({allByOneUser.length})</h2>
        </div>
        {deleteTestimonyError &&
          <p className="text-error">{deleteTestimonyError}</p>
        }
        {allByOneUserError &&
          <p className="text-error">{allByOneUserError}</p>
        }
        {selectedTestimonyError &&
          <p className="text-error">{selectedTestimonyError}</p>
        }
        {allByOneUserLoading &&
          <Loading text={"Chargement"} loadingStyle={"paws"} />
        }
        <div className="user__testimonies__wrapper">
          {!allByOneUserLoading && allByOneUser.length < 1 &&
            <p>Vous n'avez aucun témoignage.</p>
          }
          {!allByOneUserLoading && allByOneUser.length > 0 &&
            <React.Fragment>
              {allByOneUser.map(testimony => (
                <article key={testimony.id} className="user__infos">
                  <div>
                    <div className="infos__header">
                      <h3>Témoignage du {setToLocalDate(testimony.date)}</h3>
                    </div>
                    <div className="infos">
                      <p>{testimony.content}</p>
                    </div>
                  </div>
                  {selectedTestimonyLoading || deleteTestimonyLoading ?
                    <Loading text={(selectedTestimonyLoading && "Mise à jour") || (deleteTestimonyLoading && "Suppression")} loadingStyle={"spin"} />
                    :
                    <div className="icons-wrapper">
                      <FaPencil className="manage-icons" onClick={() => handleTestimonyDialog(testimony)} role="button" aria-label="Bouton de modification du témoignage" />
                      <FaTrashCan className="manage-icons" onClick={() => handleDeleteTestimony(testimony)} color="var(--dark-red)" role="button" aria-label="Bouton de suppression du témoignage" />
                    </div>
                  }
                </article>
              ))}
            </React.Fragment>
          }
        </div>

      </section>

      <Dialog resetConfirmPw={resetConfirmPw}>
        {isUpdateAccountAvatar &&
          <div className="dialog-wrapper">
            <div className="title-wrapper">
              <h2>Choisir un Avatar</h2>
            </div>
            <section className="avatars">
              <div className="avatar__wrapper">
                {AVATAR.URL.map((u, index) => (
                  <div key={index} className={`avatar${avatarIndex === index ? ' selected' : ''}`}>
                    <img crossOrigin="anonymous" src={`${APP_ROUTES.API_URL}${u}`} alt={"Un sticker animal"} onClick={() => { dispatch(setUpdatedAvatar(u)); setAvatarIndex(avatarIndex === index ? null : index) }} />
                  </div>
                ))
                }
              </div>
              <div className="btns-wrapper">
                <Button text="Valider" btnClick={handleUpdateAvatar} />
                <Button text="Annuler" btnClick={handleCancel} />
              </div>
            </section>
          </div>
        }
        {isUpdateAccountForm &&
          <div className="dialog-wrapper">
            <div className="title-wrapper">
              <h2>Mettre à jour</h2>
            </div>
            <form className="user__update" onSubmit={handleSubmit}>
              {input.id === "newPassword" &&
                <Input
                  label={"Ancien mot de passe"}
                  id={"oldPassword"}
                  type={"password"}
                  required={true}
                  value={dialogForms.oldPassword}
                  onChange={(value) => updateForm("oldPassword", value)} />
              }
              <Input
                label={input.label}
                id={input.id}
                type={input.type}
                required={true}
                inputStyle={usernameError || emailError || pwError ? " input--error" : ""}
                helps={helps[input.id]}
                value={dialogForms[input.id]}
                onChange={(value) => updateForm(input.id, value)} />
              {input.id === "newPassword" &&
                <React.Fragment>
                  <Input
                    label={"Confirmation du nouveau mot de passe"}
                    id={"confirm_pass"}
                    type={"password"}
                    required={true}
                    inputStyle={arePwSameError ? " input--error" : ""}
                    helps={[
                      {
                        success: arePwSame,
                        fail: !arePwSame,
                        message: "Mots de passe identiques"
                      }
                    ]}
                    value={confirmPw}
                    onChange={(value) => setConfirmPw(value)} />
                  <p className="text-error">Après modification, vous devrez vous reconnecter</p>
                </React.Fragment>
              }
              <div className="btns-wrapper">
                <Button text="Valider" type="submit" />
                <Button text="Annuler" btnClick={handleCancel} />
              </div>
            </form>
          </div>
        }
        {(isDeleteAccountForm || isDeleteTestimony) &&
          <div className="dialog-wrapper confirm-deletion">
            <div className="title-wrapper">
              <h2>Supprimer</h2>
            </div>
            <p>Êtes vous certain(e) de vouloir <strong>supprimer votre {isDeleteAccountForm && "compte"}{isDeleteTestimony && "témoignage"}</strong> ?</p>
            <p className="text-error">Attention : Cette action est irréversible !</p>
            <div className="btns-wrapper">
              <Button text="Confirmer" btnClick={handleConfirmedDeleteClick} />
              <Button text="Annuler" btnClick={handleCancel} />
            </div>
          </div>
        }
        {isUpdateTestimony &&
          <div className="dialog-wrapper">
            <div className="title-wrapper">
              <h2>Mettre à jour un témoignage</h2>
            </div>
            <form onSubmit={handleSubmitSelectedTestimony}>
              <div className="input__wrapper">
                <label className="input__label" htmlFor="content">Contenu</label>
                <textarea
                  className="input"
                  name="content"
                  id="content"
                  value={selectedTestimony.content || ""}
                  onChange={e => updateTestimonyForm("content", e.target.value)}></textarea>
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

export default User;