import { createSlice } from "@reduxjs/toolkit";

const DIALOG_STATE = {
  isOpen: false,
  isNewArticleForm: false,
  isDeleteArticleForm: false,
  isUpdateArticleForm: false,
  isDeleteAccountForm: false,
  isUpdateAccountForm: false,
  isUpdateAccountAvatar: false,
  isDeleteUserBySuperAdminForm: false,
  isUpdateUserRoleBySuperAdminForm: false,
  isNewAnimalForm: false,
  isUpdateAnimalForm: false,
  isUpdateExitAnimalForm: false,
  isDeleteAnimalForm: false,
  isFilters: false,
  isReadMoreTestimoniesOverview: false,
  isNewTestimonyForm: false,
  isUpdateTestimony: false,
  isDeleteTestimony: false,
  isDeleteTestimonyByAdmin: false,
  input: {
    label: "",
    id: "",
    type: ""
  }
}

const dialogSlice = createSlice({
  name: "dialog",
  initialState: DIALOG_STATE,
  reducers: {
    toggleDialog: (state, action) => {
      state.isOpen = !state.isOpen;
    },
    closeDialog: (state, action) => {
      state.isOpen = false;
      state.isNewArticleForm = false;
      state.isDeleteArticleForm = false;
      state.isUpdateArticleForm = false;
      state.isDeleteAccountForm = false;
      state.isUpdateAccountForm = false;
      state.isUpdateAccountAvatar = false;
      state.isDeleteUserBySuperAdminForm = false;
      state.isUpdateUserRoleBySuperAdminForm = false;
      state.isNewAnimalForm = false;
      state.isUpdateAnimalForm = false;
      state.isUpdateExitAnimalForm = false;
      state.isDeleteAnimalForm = false;
      state.isFilters = false;
      state.isReadMoreTestimoniesOverview = false;
      state.isNewTestimonyForm = false;
      state.isUpdateTestimony = false;
      state.isDeleteTestimony = false;
      state.isDeleteTestimonyByAdmin = false;
    },
    setInputFields: (state, action) => {
      const { label, id, type } = action.payload;
      return {
        ...state,
        input: {
          ...state.input,
          label,
          id,
          type
        }
      }
    },
    setIsNewArticleForm: (state, action) => {
      state.isOpen = true;
      state.isNewArticleForm = true;
    },
    setIsDeleteArticleForm: (state, action) => {
      state.isOpen = true;
      state.isDeleteArticleForm = true;
    },
    setIsUpdateArticleForm: (state, action) => {
      state.isOpen = true;
      state.isUpdateArticleForm = true;
    },
    setIsDeleteAccountForm: (state, action) => {
      state.isOpen = true;
      state.isDeleteAccountForm = true;
    },
    setIsUpdateAccountForm: (state, action) => {
      state.isOpen = true;
      state.isUpdateAccountForm = true;
    },
    setIsUpdateAccountAvatar: (state, action) => {
      state.isOpen = true;
      state.isUpdateAccountAvatar = true;
    },
    setIsDeleteUserBySuperAdminForm: (state, action) => {
      state.isOpen = true;
      state.isDeleteUserBySuperAdminForm = true;
    },
    setIsUpdateUserRoleBySuperAdminForm: (state, action) => {
      state.isOpen = true;
      state.isUpdateUserRoleBySuperAdminForm = true;
    },
    setIsNewAnimalForm: (state, action) => {
      state.isOpen = true;
      state.isNewAnimalForm = true;
    },
    setIsUpdateAnimalForm: (state, action) => {
      state.isOpen = true;
      state.isUpdateAnimalForm = true;
    },
    setIsUpdateExitAnimalForm: (state, action) => {
      state.isOpen = true;
      state.isUpdateExitAnimalForm = true;
    },
    setIsDeleteAnimalForm: (state, action) => {
      state.isOpen = true;
      state.isDeleteAnimalForm = true;
    },
    setIsFilters: (state, action) => {
      state.isOpen = true;
      state.isFilters = true;
    },
    setIsReadMoreTestimoniesOverview: (state, action) => {
      state.isOpen = true;
      state.isReadMoreTestimoniesOverview = true;
    },
    setIsNewTestimonyForm: (state, action) => {
      state.isOpen = true;
      state.isNewTestimonyForm = true;
    },
    setIsUpdateTestimony: (state, action) => {
      state.isOpen = true;
      state.isUpdateTestimony = true;
    },
    setIsDeleteTestimony: (state, action) => {
      state.isOpen = true;
      state.isDeleteTestimony = true;
    },
    setIsDeleteTestimonyByAdmin: (state, action) => {
      state.isOpen = true;
      state.isDeleteTestimonyByAdmin = true;
    }
  }
});

export const { toggleDialog, setInputFields, closeDialog, setIsNewArticleForm, setIsDeleteArticleForm, setIsUpdateArticleForm, setIsDeleteAccountForm, setIsUpdateAccountForm, setIsUpdateAccountAvatar, setIsDeleteUserBySuperAdminForm, setIsUpdateUserRoleBySuperAdminForm, setIsNewAnimalForm, setIsUpdateAnimalForm, setIsUpdateExitAnimalForm, setIsDeleteAnimalForm, setIsFilters, setIsReadMoreTestimoniesOverview, setIsNewTestimonyForm, setIsUpdateTestimony, setIsDeleteTestimony, setIsDeleteTestimonyByAdmin } = dialogSlice.actions;
export default dialogSlice.reducer;