// Styles
import "./dialog.scss";
// React
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
// Reducers
import { closeDialog } from "../../redux/reducers/dialog.reducer";
import { resetFormNewTestimony } from "../../redux/reducers/testimony.reducer";
import { setUpdatedAvatar } from "../../redux/reducers/user.reducer";
// Utils
import { resetAdminForms, resetAdminSelects } from "../../utils/reset.utils";

const Dialog = ({ children, resetConfirmPw = () => { } }) => {
  const dispatch = useDispatch();
  const dialogRef = useRef(null);

  // Dialog Reducer
  const { isOpen } = useSelector(state => state.dialogReducer);


  // *************** Close Dialog ***************
  // Espace key
  const handleEscapeKey = e => {
    if (e.key === "Escape") {
      dispatch(closeDialog());
      // Utils -> reset.utils.js -> reset forms : New article & New animal
      resetAdminForms(dispatch);
      dispatch(resetFormNewTestimony());
      // Utils -> reset.utils.js -> reset selected (update/delete) : Article, Animal, Testimony, User
      resetAdminSelects(dispatch);
      // User component
      dispatch(setUpdatedAvatar(""));
      resetConfirmPw();
    }
  }

  // Click outside Dialog
  const handleOutsideDialogClick = (e) => {
    const dialogDimensions = dialogRef.current.getBoundingClientRect();

    if (e.clientX < dialogDimensions.left || e.clientX > dialogDimensions.right || e.clientY < dialogDimensions.top || e.clientY > dialogDimensions.bottom) {
      dispatch(closeDialog());
      // Utils -> reset.utils.js -> reset forms : New article & New animal
      resetAdminForms(dispatch);
      dispatch(resetFormNewTestimony());
      // Utils -> reset.utils.js -> reset selected (update/delete) : Article, Animal, Testimony, User
      resetAdminSelects(dispatch);
      // User component
      dispatch(setUpdatedAvatar(""));
      resetConfirmPw();
    }
  }
  // *************** End Close Dialog ***************

  // *************** Toggle Dialog ***************
  // Can be closed -> cancel/close button, escape key or clicking outside of it
  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
        document.addEventListener("mousedown", handleOutsideDialogClick);
        document.addEventListener("keydown", handleEscapeKey);
      }
      else {
        dialogRef.current.close();
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideDialogClick);
      document.removeEventListener("keydown", handleEscapeKey);
    }
  }, [isOpen]);
  // *************** End Toggle Dialog ***************

  return (
    <React.Fragment>
      {isOpen && createPortal(
        <dialog id="dialog" ref={dialogRef}>
          {children}
        </dialog>
        , document.body)}
    </React.Fragment>
  )
}

export default Dialog;