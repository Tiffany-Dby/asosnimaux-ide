import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user.reducer";
import headerReducer from "./reducers/header.reducer";
import windowReducer from "./reducers/window.reducer";
import articleReducer from "./reducers/article.reducer";
import dialogReducer from "./reducers/dialog.reducer";
import toastReducer from "./reducers/toast.reducer";
import animalReducer from "./reducers/animal.reducer";
import testimonyReducer from "./reducers/testimony.reducer";

const store = configureStore({
  reducer: {
    userReducer,
    headerReducer,
    windowReducer,
    articleReducer,
    dialogReducer,
    toastReducer,
    animalReducer,
    testimonyReducer
  },
});

export default store;
