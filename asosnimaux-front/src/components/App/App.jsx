// Styles
import './App.scss';
// Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Toast from '../Toast/Toast.jsx';
import Home from '../Home/Home.jsx';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import Testimonies from '../Testimonies/Testimonies.jsx';
import User from '../User/User';
import Articles from '../Articles/Articles.jsx';
import ArticleDetails from '../ArticleDetails/ArticleDetails.jsx';
import Adoption from '../Adoption/Adoption';
import Favorites from '../Favorites/Favorites.jsx';
import AnimalDetails from '../AnimalDetails/AnimalDetails.jsx';
import Admin from '../Admin/Admin';
import AdminArticles from '../AdminArticles/AdminArticles.jsx';
import AdminAnimals from '../AdminAnimals/AdminAnimals.jsx';
import AdminUsers from '../AdminUsers/AdminUsers.jsx';
import AdminTestimonies from '../AdminTestimonies/AdminTestimonies.jsx';
import Association from '../Association/Association.jsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.jsx';
import Error from '../Error/Error.jsx';
// React
import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Thunks
import { getOneUserThunk } from '../../api/user.api.js';
// Constants
import { APP_ROUTES } from "../../constants/route.const.js"
// Utils
import { getFromStorage } from '../../utils/storage.utils.js';

const App = () => {
  const dispatch = useDispatch();

  // Toast Reducer
  const { isToastOpen } = useSelector(state => state.toastReducer);

  // User Reducer
  const { user, isAuth, signUpSuccess, signInSuccess, selectedUserSuccess, updatePasswordSuccess, updateAvatarSuccess, updateUsernameSuccess, deleteUserSuccess } = useSelector(state => state.userReducer);

  // Article Reducer
  const { newArticleSuccess, selectedSuccess, deleteSuccess } = useSelector(state => state.articleReducer);

  // Animal Reducer
  const { newAnimalSuccess, selectedAnimalSuccess, deleteAnimalSuccess } = useSelector(state => state.animalReducer);

  // Testimony Reducer
  const { newTestimonySuccess, selectedTestimonySuccess, deleteTestimonySuccess } = useSelector(state => state.testimonyReducer);

  // Fetching User infos if Local storage has a token set (in case user reloads)
  useEffect(() => {
    const token = getFromStorage("token");
    if (token) dispatch(getOneUserThunk());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main>
        {isToastOpen &&
          <Toast message={newArticleSuccess || selectedSuccess || deleteSuccess || newAnimalSuccess || selectedAnimalSuccess || deleteAnimalSuccess || signUpSuccess || signInSuccess || selectedUserSuccess || deleteUserSuccess || newTestimonySuccess || selectedTestimonySuccess || updatePasswordSuccess || updateAvatarSuccess || updateUsernameSuccess || deleteTestimonySuccess} />
        }
        <Routes>
          <Route path={APP_ROUTES.HOME} element={<Home />} />
          <Route path={APP_ROUTES.SIGN_UP} element={<SignUp />} />
          <Route path={APP_ROUTES.SIGN_IN} element={<SignIn />} />
          <Route
            path={APP_ROUTES.ACCOUNT}
            element={
              <PrivateRoute hasAccess={isAuth}>
                <User />
              </PrivateRoute>
            }
          />
          <Route path={APP_ROUTES.ADMIN}
            element={
              <PrivateRoute hasAccess={isAuth && (user.role === 'admin' || user.role === 'super_admin')}>
                <Admin />
              </PrivateRoute>
            }
          >
            <Route index path={APP_ROUTES.ADMIN} element={<Navigate replace to={APP_ROUTES.ADMIN_ARTICLES} />} />
            <Route path={APP_ROUTES.ADMIN_ARTICLES} element={<AdminArticles />} />
            <Route path={APP_ROUTES.ADMIN_ANIMALS} element={<AdminAnimals />} />
            <Route path={APP_ROUTES.ADMIN_TESTIMONIES} element={<AdminTestimonies />} />
            <Route
              path="users"
              element={
                <PrivateRoute hasAccess={isAuth && user.role === 'super_admin'}>
                  <AdminUsers />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={APP_ROUTES.ASSOCIATION} element={<Association />} />
          <Route path={APP_ROUTES.ADOPTION} element={<Adoption />} />
          <Route path={APP_ROUTES.FAVORITES} element={<Favorites />} />
          <Route path={APP_ROUTES.ANIMAL} element={<AnimalDetails />} />
          <Route path={APP_ROUTES.ARTICLES} element={<Articles />} />
          <Route path={APP_ROUTES.ARTICLE} element={<ArticleDetails />} />
          <Route path={APP_ROUTES.TESTIMONIES} element={<Testimonies />} />
          <Route path={"*"} element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
