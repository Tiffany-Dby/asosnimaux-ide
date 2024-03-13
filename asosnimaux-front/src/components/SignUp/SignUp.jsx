// Styles
import "./signUp.scss";
// Components
import Button from "../Button/Button";
import Input from "../Input/Input";
import Loading from "../Loading/Loading.jsx";
// React
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// Thunks
import { signUpThunk } from "../../api/user.api";
// Reducers
import { setSignUpError, updateSignUpForm } from "../../redux/reducers/user.reducer";
// Constants
import { APP_ROUTES } from "../../constants/route.const.js";
import { DUPLICATES } from "../../constants/errors.const.js";
// Utils
import { hasLowercase, hasMinLength, hasNumber, hasSymbol, hasUppercase, isEmailValid, isUsernameValid } from "../../utils/input.utils.js";
import { getDuplicateErrorMessage } from "../../utils/error.utils.js";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // User Reducer
  const { signUpForm, signUpLoading, signUpError, signUpSuccess } = useSelector(state => state.userReducer);

  // *************** UX - Helps ***************
  // Username
  const [usernameLengthSuccess, setUsernameLengthSuccess] = useState(false);
  const [usernameValidSuccess, setUsernameValidSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  useEffect(() => {
    signUpForm.username.length >= 4 && signUpForm.username.length <= 12 ? setUsernameLengthSuccess(true) : setUsernameLengthSuccess(false);

    const checkUsername = isUsernameValid(signUpForm.username);
    checkUsername ? setUsernameValidSuccess(true) : setUsernameValidSuccess(false);
  }, [signUpForm.username]);

  // Email
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const checkEmail = isEmailValid(signUpForm.email);
    checkEmail ? setEmailSuccess(true) : setEmailSuccess(false);
  }, [signUpForm.email]);

  // Password
  const [pwHasSymbol, setPwHasSymbol] = useState(false);
  const [pwHasUpper, setPwHasUpper] = useState(false);
  const [pwHasLower, setPwHasLower] = useState(false);
  const [pwHasNumber, setPwHasNumber] = useState(false);
  const [pwHasMinLength, setPwHasMinLength] = useState(false);
  const [pwError, setPwError] = useState(false);

  useEffect(() => {
    const checkSymbol = hasSymbol(signUpForm.password);
    checkSymbol ? setPwHasSymbol(true) : setPwHasSymbol(false);

    const checkUpper = hasUppercase(signUpForm.password);
    checkUpper ? setPwHasUpper(true) : setPwHasUpper(false);

    const checkLower = hasLowercase(signUpForm.password);
    checkLower ? setPwHasLower(true) : setPwHasLower(false);

    const checkNumber = hasNumber(signUpForm.password);
    checkNumber ? setPwHasNumber(true) : setPwHasNumber(false);

    const checkLength = hasMinLength(signUpForm.password, 8);
    checkLength ? setPwHasMinLength(true) : setPwHasMinLength(false);
  }, [signUpForm.password]);

  // Confirm Password
  const [confirmPw, setConfirmPw] = useState("");
  const [arePwSame, setArePwSame] = useState(false);
  const [arePwSameError, setArePwSameError] = useState(false)

  useEffect(() => {
    if (!!signUpForm.password.length && !!confirmPw.length) {
      signUpForm.password === confirmPw ? setArePwSame(true) : setArePwSame(false);
    }
  }, [confirmPw, signUpForm.password]);

  // Reset Sign up inputs errors
  const handleResetErrors = () => {
    setUsernameError(false);
    setEmailError(false);
    setPwError(false);
    setArePwSameError(false);
  }
  // *************** End UX - Helps ***************

  // Sumbit Sign Up Form
  const handleSubmit = e => {
    e.preventDefault();

    // Reset all visual errors on click
    handleResetErrors();

    // Check inputs validations -> set errors (to display) if required and cancel submission
    if (!usernameLengthSuccess || !usernameValidSuccess || !emailSuccess || !pwHasSymbol || !pwHasUpper || !pwHasLower || !pwHasNumber || !pwHasMinLength || !arePwSame) {
      // Error message
      dispatch(setSignUpError({ error: "Miaoups, il semblerait que tout ne soit pas en règle, veuillez revérifier." }));

      // ***** Set error *****
      // Username
      if (!usernameLengthSuccess || !usernameValidSuccess) setUsernameError(true);

      // Email
      if (!emailSuccess) setEmailError(true);

      // Password
      if (!pwHasSymbol || !pwHasUpper || !pwHasLower || !pwHasNumber || !pwHasMinLength) setPwError(true);

      // Confirm password
      if (!arePwSame) setArePwSameError(true);
      // ***** End Set error *****

      return;
    }

    dispatch(signUpThunk());
  }

  // Inputs onChange
  const updateForm = (input, value) => dispatch(updateSignUpForm({ input, value }));

  // Redirect after Sign up -> Sign In
  useEffect(() => {
    if (signUpSuccess) navigate(APP_ROUTES.SIGN_IN, { replace: true });
  }, [signUpSuccess]);

  return (
    <section className="sign">
      <div className='title-wrapper'>
        <h1>S'inscrire</h1>
      </div>
      {signUpError &&
        <span className="text-error">{getDuplicateErrorMessage(signUpError, DUPLICATES)}</span>
      }
      <form onSubmit={handleSubmit}>
        {signUpLoading ?
          <Loading text={"Chargement"} loadingStyle={"paws"} />
          :
          <React.Fragment>
            <Input
              label="Pseudo"
              id="username"
              required={true}
              inputStyle={signUpError?.includes("username") || usernameError ? " input--error" : ""}
              helps={[
                {
                  success: usernameLengthSuccess,
                  fail: !usernameLengthSuccess,
                  message: "Entre 4 et 12 caractères"
                },
                {
                  success: usernameValidSuccess,
                  fail: !usernameValidSuccess,
                  message: "Lettres et/ou chiffres (' - ' autorisé)"
                }
              ]}
              value={signUpForm.username}
              onChange={value => updateForm("username", value)} />
            <Input
              label="Email"
              id="email"
              type="email"
              required={true}
              inputStyle={signUpError?.includes("email") || emailError ? " input--error" : ""}
              helps={[
                {
                  success: emailSuccess,
                  fail: !emailSuccess,
                  message: "Exemple : votre@email.com"
                }
              ]}
              value={signUpForm.email}
              onChange={value => updateForm("email", value)} />
            <Input
              label="Mot de passe"
              id="password"
              type="password"
              required={true}
              inputStyle={signUpError?.includes("password") || pwError ? " input--error" : ""}
              helps={[
                {
                  success: pwHasSymbol,
                  fail: !pwHasSymbol,
                  message: "Un symbole"
                },
                {
                  success: pwHasNumber,
                  fail: !pwHasNumber,
                  message: "Un chiffre"
                },
                {
                  success: pwHasUpper,
                  fail: !pwHasUpper,
                  message: "Une lettre majuscule"
                },
                {
                  success: pwHasLower,
                  fail: !pwHasLower,
                  message: "Une lettre minuscule"
                },
                {
                  success: pwHasMinLength,
                  fail: !pwHasMinLength,
                  message: "8 caractères minimum"
                },
              ]}
              value={signUpForm.password}
              onChange={value => updateForm("password", value)} />
            <Input
              label="Confirmation du mot de passe"
              id="confirm_pass"
              type="password"
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
              onChange={value => setConfirmPw(value)} />
            <Button text="Inscription" type="submit" />
          </React.Fragment>
        }
      </form>

      <div className="redirect">
        <p>Déjà un(e) Ami'nimaux ?</p>
        <Link to={APP_ROUTES.SIGN_IN}>Se connecter</Link>
      </div>
    </section>
  );
}

export default SignUp;