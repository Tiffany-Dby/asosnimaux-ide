import { createSlice } from "@reduxjs/toolkit";

const USER_STATE = {
  user: {
    id: "",
    username: "",
    email: "",
    avatar: "",
    role: "",
  },
  followIDs: [],
  followedAnimals: [],
  selectedAnimalFollow: "",
  isAuth: false,
  allUsers: [],
  allUsersLoading: false,
  allUsersError: null,
  signInForm: {
    login: "",
    password: ""
  },
  signInLoading: false,
  signInSuccess: null,
  signInError: null,
  signUpForm: {
    username: "",
    email: "",
    password: ""
  },
  signUpLoading: false,
  signUpError: null,
  signUpSuccess: null,
  dialogForms: {
    username: "",
    email: "",
    oldPassword: "",
    newPassword: ""
  },
  selectedUser: {
    id: "",
    username: "",
    role: ""
  },
  getfollowLoading: false,
  getfollowError: null,
  postFollowLoading: false,
  postFollowError: null,
  unfollowLoading: false,
  unfollowError: null,
  followedAnimalsLoading: false,
  followedAnimalsError: null,
  selectedUserLoading: false,
  selectedUserSuccess: null,
  selectedUserError: null,
  updatePasswordSuccess: null,
  updateUsernameSuccess: null,
  updatedAvatar: "",
  updatedAvatarLoading: false,
  updateAvatarSuccess: null,
  updatedAvatarError: null,
  dialogLoading: false,
  dialogError: null,
  getUserLoading: false,
  getUserError: null,
  deleteUserLoading: false,
  deleteUserSuccess: null,
  deleteUserError: null
}

const userSlice = createSlice({
  name: "user",
  initialState: USER_STATE,
  reducers: {
    setUser: (state, action) => {
      const { id, username, email, avatar, role, updateUsernameSuccess, updateAvatarSuccess } = action.payload;
      return {
        ...state,
        signUpLoading: false,
        signInLoading: false,
        signInError: null,
        dialogLoading: false,
        getUserLoading: false,
        deleteUserLoading: false,
        updatedAvatarLoading: false,
        user: {
          ...state.user,
          id,
          username,
          email,
          avatar,
          role
        },
        isAuth: true,
        updateUsernameSuccess,
        updateAvatarSuccess,
      }
    },
    setAllUsers: (state, action) => {
      return {
        ...state,
        allUsers: action.payload.allUsers,
        allUsersError: null,
        allUsersLoading: false
      }
    },
    startAllUsersLoading: (state, action) => {
      return {
        ...state,
        allUsersLoading: true
      }
    },
    stopAllUsersLoading: (state, action) => {
      return {
        ...state,
        allUsersLoading: false
      }
    },
    setAllUsersError: (state, action) => {
      return {
        ...state,
        allUsersError: action.payload.error,
        allUsersLoading: false
      }
    },
    updateSignInForm: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        signInForm: {
          ...state.signInForm,
          [input]: value
        }
      }
    },
    resetSignInForm: (state, action) => {
      return {
        ...state,
        signInForm: {
          login: "",
          password: ""
        }
      }
    },
    startSignInLoading: (state, action) => {
      return {
        ...state,
        signInLoading: true
      }
    },
    stopSignInLoading: (state, action) => {
      return {
        ...state,
        signInLoading: false
      }
    },
    setSignInSuccess: (state, action) => {
      const { username } = action.payload;
      return {
        ...state,
        signInSuccess: `Bonjour ${username} !`
      }
    },
    setSignInError: (state, action) => {
      return {
        ...state,
        signInError: action.payload.error,
        signInLoading: false,
      }
    },
    updateSignUpForm: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        signUpForm: {
          ...state.signUpForm,
          [input]: value
        }
      }
    },
    resetSignUpForm: (state, action) => {
      return {
        ...state,
        signUpForm: {
          username: "",
          email: "",
          password: ""
        }
      }
    },
    startSignUpLoading: (state, action) => {
      return { ...state, signUpLoading: true }
    },
    stopSignUpLoading: (state, action) => {
      return { ...state, signUpLoading: false }
    },
    setSignUpError: (state, action) => {
      return {
        ...state,
        signUpError: action.payload.error,
        signUpLoading: false
      }
    },
    setSignUpSuccess: (state, action) => {
      return {
        ...state,
        signUpSuccess: "Ami'nimaux créé !"
      }
    },
    setisAuth: (state, action) => {
      return {
        ...state,
        isAuth: action.payload
      }
    },
    updateDialogForm: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        dialogForms: {
          ...state.dialogForms,
          [input]: value
        }
      }
    },
    resetDialogForm: (state, action) => {
      return {
        ...state,
        dialogForms: {
          username: "",
          email: "",
          password: ""
        }
      }
    },
    startDialogLoading: (state, action) => {
      return {
        ...state,
        dialogLoading: true
      }
    },
    stopDialogLoading: (state, action) => {
      return {
        ...state,
        dialogLoading: false
      }
    },
    setDialogError: (state, action) => {
      return {
        ...state,
        dialogError: action.payload.error,
        dialogLoading: false
      }
    },
    setUpdatedAvatar: (state, action) => {
      return {
        ...state,
        updatedAvatar: action.payload,
      }
    },
    startUpdatedAvatarLoading: (state, action) => {
      return {
        ...state,
        updatedAvatarLoading: true
      }
    },
    stopUpdatedAvatarLoading: (state, action) => {
      return {
        ...state,
        updatedAvatarLoading: false
      }
    },
    setUpdatedAvatarError: (state, action) => {
      return {
        ...state,
        updatedAvatarError: action.payload.error,
        updatedAvatarLoading: false
      }
    },
    startGetUserLoading: (state, action) => {
      return {
        ...state,
        getUserLoading: true
      }
    },
    stopGetUserLoading: (state, action) => {
      return {
        ...state,
        getUserLoading: false
      }
    },
    setGetUserError: (state, action) => {
      return {
        ...state,
        getUserError: action.payload.error,
        getUserLoading: false
      }
    },
    setDeleteUser: (state, action) => {
      return {
        ...state,
        deleteUserError: null,
        deleteUserLoading: false,
        deleteUserSuccess: "Compte correctement supprimé"
      }
    },
    startDeleteUserLoading: (state, action) => {
      return {
        ...state,
        deleteUserLoading: true
      }
    },
    stopDeleteUserLoading: (state, action) => {
      return {
        ...state,
        deleteUserLoading: false
      }
    },
    setDeleteUserError: (state, action) => {
      return {
        ...state,
        deleteUserError: action.payload.error,
        deleteUserLoading: false
      }
    },
    setDeleteBySuperAdmin: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        allUsers: state.allUsers.filter(user => user.id !== id),
        deleteUserError: null,
        deleteLoading: false,
        deleteUserSuccess: "Utilisateur supprimé !"
      }
    },
    setUpdatePasswordSuccess: (state, action) => {
      return {
        ...state,
        updatePasswordSuccess: "Mot de passe mis à jour !"
      }
    },
    resetUserSuccess: (state, action) => {
      return {
        ...state,
        updateAvatarSuccess: null,
        updatePasswordSuccess: null,
        updateUsernameSuccess: null,
        selectedUserSuccess: null,
        signInSuccess: null,
        signUpSuccess: null,
        deleteUserSuccess: null
      }
    },
    setSelectedUser: (state, action) => {
      const { id, username, role } = action.payload;
      return {
        ...state,
        selectedUser: {
          id,
          username,
          role
        }
      }
    },
    updateFormSelectedUser: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        selectedUser: {
          ...state.selectedUser,
          [input]: value
        }
      }
    },
    setUpdateSelectedUser: (state, action) => {
      const { user } = action.payload;
      return {
        ...state,
        allUsers: state.allUsers.map((u) => u.id === user.id ? { ...user } : { ...u }),
        selectedUser: { ...user },
        selectedUserError: null,
        selectedUserLoading: false,
        selectedUserSuccess: "Rôle mis à jour !"
      }
    },
    startSelectedUserLoading: (state, action) => {
      return {
        ...state,
        selectedUserLoading: true
      }
    },
    stopSelectedUserLoading: (state, action) => {
      return {
        ...state,
        selectedUserLoading: false
      }
    },
    setSelectedUserError: (state, action) => {
      return {
        ...state,
        selectedUserError: action.payload.error,
        selectedUserLoading: false
      }
    },
    setFollowIDsNotAuth: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        followIDs: [...state.followIDs, id]
      }
    },
    setFollowIDs: (state, action) => {
      const { animals } = action.payload;
      return {
        ...state,
        followIDs: animals.map(animal => animal.id),
        getfollowError: null,
        getfollowLoading: false,
      }
    },
    resetFollowIDs: (state, action) => {
      return {
        ...state,
        followIDs: [],
      }
    },
    setFollowedAnimalsNotAuth: (state, action) => {
      const { animals } = action.payload;
      return {
        ...state,
        followedAnimals: animals?.filter(animal => state.followIDs.includes(animal.id))
      }
    },
    setFollowedAnimals: (state, action) => {
      const { animals } = action.payload;
      return {
        ...state,
        followedAnimals: animals?.map((animal) => ({ id: animal.animal_id, entry_date: animal.entry_date, name: animal.name, age: animal.age, sex: animal.sex, truncated_description: animal.truncated_description, race: animal.race, status: animal.status, exit_date: animal.exit_date, species: animal.species, picture_url: animal.picture_url, picture_caption: animal.picture_caption })),
        followedAnimalsError: null,
        followedAnimalsLoading: false,
      }
    },
    startFollowedAnimalsLoading: (state, action) => {
      return {
        ...state,
        followedAnimalsLoading: true
      }
    },
    stopFollowedAnimalsLoading: (state, action) => {
      return {
        ...state,
        followedAnimalsLoading: false
      }
    },
    setFollowedAnimalsError: (state, action) => {
      return {
        ...state,
        followedAnimalsError: action.payload.error,
        followedAnimalsLoading: false
      }
    },
    resetFollowedAnimals: (state, action) => {
      state.followedAnimals = [];
    },
    setSelectedAnimalFollow: (state, action) => {
      return {
        ...state,
        selectedAnimalFollow: action.payload
      }
    },
    startGetFollowLoading: (state, action) => {
      return {
        ...state,
        getfollowLoading: true
      }
    },
    stopGetFollowLoading: (state, action) => {
      return {
        ...state,
        getfollowLoading: false
      }
    },
    setGetFollowError: (state, action) => {
      return {
        ...state,
        getfollowError: action.payload.error,
        getfollowLoading: false
      }
    },
    setPostFollow: (state, action) => {
      const { animalID } = action.payload;
      return {
        ...state,
        followIDs: [...state.followIDs, animalID],
        postFollowError: null,
        postFollowLoading: false
      }
    },
    startPostFollowLoading: (state, action) => {
      return {
        ...state,
        postfollowLoading: true
      }
    },
    stopPostFollowLoading: (state, action) => {
      return {
        ...state,
        postfollowLoading: false
      }
    },
    setPostFollowError: (state, action) => {
      return {
        ...state,
        postfollowError: action.payload.error,
        postfollowLoading: false
      }
    },
    setUnfollow: (state, action) => {
      const { animalID } = action.payload;
      return {
        ...state,
        followIDs: state.followIDs.filter(id => id !== animalID),
        followedAnimals: state.followedAnimals.filter(animal => animal.id !== animalID),
        unfollowError: null,
        unfollowLoading: false
      }
    },
    startUnfollowLoading: (state, action) => {
      return {
        ...state,
        unfollowLoading: true
      }
    },
    stopUnfollowLoading: (state, action) => {
      return {
        ...state,
        unfollowLoading: false
      }
    },
    setUnfollowError: (state, action) => {
      return {
        ...state,
        unfollowError: action.payload.error,
        unfollowLoading: false
      }
    },
  }
});

export const { setUser, updateSignInForm, resetSignInForm, startSignInLoading, stopSignInLoading, setSignInSuccess, setSignInError, updateSignUpForm, resetSignUpForm, startSignUpLoading, stopSignUpLoading, setSignUpError, setSignUpSuccess, setisAuth, updateDialogForm, resetDialogForm, setUpdatedAvatar, startUpdatedAvatarLoading, stopUpdatedAvatarLoading, setUpdatedAvatarError, startDialogLoading, stopDialogLoading, setDialogError, startGetUserLoading, stopGetUserLoading, setGetUserError, startDeleteUserLoading, stopDeleteUserLoading, setDeleteUserError, setAllUsers, startAllUsersLoading, stopAllUsersLoading, setAllUsersError, setDeleteUser, setDeleteBySuperAdmin, setUpdatePasswordSuccess, resetUserSuccess, setSelectedUser, updateFormSelectedUser, setUpdateSelectedUser, startSelectedUserLoading, stopSelectedUserLoading, setSelectedUserError, setFollowIDs, resetFollowIDs, setFollowedAnimals, startFollowedAnimalsLoading, stopFollowedAnimalsLoading, setFollowedAnimalsError, resetFollowedAnimals, setSelectedAnimalFollow, startGetFollowLoading, stopGetFollowLoading, setGetFollowError, setPostFollow, startPostFollowLoading, stopPostFollowLoading, setPostFollowError, setUnfollow, startUnfollowLoading, stopUnfollowLoading, setUnfollowError, setFollowIDsNotAuth, setFollowedAnimalsNotAuth } = userSlice.actions;
export default userSlice.reducer;