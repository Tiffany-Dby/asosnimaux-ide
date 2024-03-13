import { createSlice } from "@reduxjs/toolkit";

const TESTIMONY_STATE = {
  testimonies: {
    one: {
      id: "",
      user_id: "",
      username: "",
      avatar_url: "",
      content: "",
      date: ""
    },
    newTestimony: {
      content: ""
    },
    selectedTestimony: {
      id: "",
      user_id: "",
      content: ""
    },
    all: [],
    overview: [],
    allByOneUser: []
  },
  oneTestimonyLoading: false,
  oneTestimonyError: null,
  newTestimonyLoading: false,
  newTestimonySuccess: null,
  newTestimonyError: null,
  selectedTestimonyLoading: false,
  selectedTestimonySuccess: null,
  selectedTestimonyError: null,
  allTestimoniesLoading: false,
  allTestimoniesError: null,
  overviewTestimonyLoading: false,
  overviewTestimonyError: null,
  allByOneUserLoading: false,
  allByOneUserError: null,
  deleteTestimonyLoading: false,
  deleteTestimonySuccess: null,
  deleteTestimonyError: null
}

const testimonySlice = createSlice({
  name: "testimony",
  initialState: TESTIMONY_STATE,
  reducers: {
    setTestimonyOverview: (state, action) => {
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          overview: action.payload.overview
        },
        overviewTestimonyError: null,
        overviewTestimonyLoading: false
      }
    },
    startOverviewTestimonyLoading: (state, action) => {
      return {
        ...state,
        overviewTestimonyLoading: true
      }
    },
    stopOverviewTestimonyLoading: (state, action) => {
      return {
        ...state,
        overviewTestimonyLoading: false
      }
    },
    setOverviewTestimonyError: (state, action) => {
      return {
        ...state,
        overviewTestimonyError: action.payload.error,
        overviewTestimonyLoading: false
      }
    },
    setOneTestimony: (state, action) => {
      const { id, user_id, username, avatar_url, content, date } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          one: {
            id,
            user_id,
            username,
            avatar_url,
            content,
            date
          }
        },
        oneTestimonyError: null,
        oneTestimonyLoading: false
      }
    },
    startOneTestimonyLoading: (state, action) => {
      return {
        ...state,
        oneTestimonyLoading: true
      }
    },
    stopOneTestimonyLoading: (state, action) => {
      return {
        ...state,
        oneTestimonyLoading: false
      }
    },
    setOneTestimonyError: (state, action) => {
      return {
        ...state,
        oneTestimonyError: action.payload.error,
        oneTestimonyLoading: false
      }
    },
    resetOneTestimony: (state, action) => {
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          one: {
            id: "",
            userID: "",
            username: "",
            avatar_url: "",
            content: "",
            date: ""
          }
        }
      }
    },
    updateFormNewTestimony: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          newTestimony: {
            ...state.testimonies.newTestimony,
            [input]: value
          }
        }
      }
    },
    resetFormNewTestimony: (state, action) => {
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          newTestimony: {
            content: ""
          }
        }
      }
    },
    setNewTestimony: (state, action) => {
      const { testimony } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          all: [{ ...testimony }, ...state.testimonies.all],
          overview: [{ ...testimony }, ...state.testimonies.overview.slice(0, -1)]
        },
        newTestimonyError: null,
        newTestimonyLoading: false,
        newTestimonySuccess: "Témoignage posté !"
      }
    },
    startNewTestimonyLoading: (state, action) => {
      return {
        ...state,
        newTestimonyLoading: true
      }
    },
    stopNewTestimonyLoading: (state, action) => {
      return {
        ...state,
        newTestimonyLoading: false
      }
    },
    setNewTestimonyError: (state, action) => {
      return {
        ...state,
        newTestimonyError: action.payload.error,
        newTestimonyLoading: false
      }
    },
    resetTestimoniesSuccess: (state, action) => {
      return {
        ...state,
        newTestimonySuccess: null,
        selectedTestimonySuccess: null
      }
    },
    setSelectedTestimony: (state, action) => {
      const { id, user_id, content } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          selectedTestimony: {
            id,
            user_id,
            content
          }
        }
      }
    },
    updateFormSelectedTestimony: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          selectedTestimony: {
            ...state.testimonies.selectedTestimony,
            [input]: value
          }
        }
      }
    },
    setUpdateSelectedTestimony: (state, action) => {
      const { testimony } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          allByOneUser: state.testimonies.allByOneUser.map((t) => t.id === testimony.id ? { ...testimony } : { ...t })
        }
        ,
        selectedTestimonyError: null,
        selectedTestimonyLoading: false,
        selectedTestimonySuccess: "Témoignage mis à jour !"
      }
    },
    startSelectedTestimonyLoading: (state, action) => {
      return {
        ...state,
        selectedTestimonyLoading: true
      }
    },
    stopSelectedTestimonyLoading: (state, action) => {
      return {
        ...state,
        selectedTestimonyLoading: false
      }
    },
    setSelectedTestimonyError: (state, action) => {
      return {
        ...state,
        selectedTestimonyError: action.payload.error,
        selectedTestimonyLoading: false
      }
    },
    setAllByOneUser: (state, action) => {
      const { testimonies } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          allByOneUser: [...testimonies]
        },
        allByOneUserError: null,
        allByOneUserLoading: false
      }
    },
    startAllByOneUserLoading: (state, action) => {
      return {
        ...state,
        allByOneUserLoading: true
      }
    },
    stopAllByOneUserLoading: (state, action) => {
      return {
        ...state,
        allByOneUserLoading: false
      }
    },
    setAllByOneUserError: (state, action) => {
      return {
        ...state,
        allByOneUserError: action.payload.error,
        allByOneUserLoading: false
      }
    },
    setDeleteTestimony: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          allByOneUser: state.testimonies.allByOneUser.filter(testimony => testimony.id !== id)
        },
        deleteTestimonyError: null,
        deleteTestimonyLoading: false,
        deleteTestimonySuccess: "Témoignage supprimé !"
      }
    },
    setDeleteTestimonyByAdmin: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          all: state.testimonies.all.filter(testimony => testimony.id !== id)
        },
        deleteTestimonyError: null,
        deleteTestimonyLoading: false,
        deleteTestimonySuccess: "Témoignage supprimé !"
      }
    },
    startDeleteTestimonyLoading: (state, action) => {
      return {
        ...state,
        deleteTestimonyLoading: true
      }
    },
    stopDeleteTestimonyLoading: (state, action) => {
      return {
        ...state,
        deleteTestimonyLoading: false
      }
    },
    setDeleteTestimonyError: (state, action) => {
      return {
        ...state,
        deleteTestimonyError: action.payload.error,
        deleteTestimonyLoading: false
      }
    },
    setAllTestimonies: (state, action) => {
      const { testimonies } = action.payload;
      return {
        ...state,
        testimonies: {
          ...state.testimonies,
          all: [...testimonies]
        },
        allTestimoniesError: null,
        allTestimoniesLoading: false
      }
    },
    startAllTestimoniesLoading: (state, action) => {
      return {
        ...state,
        allTestimoniesLoading: true
      }
    },
    stopAllTestimoniesLoading: (state, action) => {
      return {
        ...state,
        allTestimoniesLoading: false
      }
    },
    setAllTestimoniesError: (state, action) => {
      return {
        ...state,
        allTestimoniesError: action.payload.error,
        allTestimoniesLoading: false
      }
    }
  }
});

export const { setTestimonyOverview, startOverviewTestimonyLoading, stopOverviewTestimonyLoading, setOverviewTestimonyError, setOneTestimony, startOneTestimonyLoading, stopOneTestimonyLoading, setOneTestimonyError, resetOneTestimony, updateFormNewTestimony, resetFormNewTestimony, setNewTestimony, startNewTestimonyLoading, stopNewTestimonyLoading, setNewTestimonyError, resetTestimoniesSuccess, setSelectedTestimony, updateFormSelectedTestimony, setUpdateSelectedTestimony, startSelectedTestimonyLoading, stopSelectedTestimonyLoading, setSelectedTestimonyError, setAllByOneUser, startAllByOneUserLoading, stopAllByOneUserLoading, setAllByOneUserError, setDeleteTestimony, setDeleteTestimonyByAdmin, startDeleteTestimonyLoading, stopDeleteTestimonyLoading, setDeleteTestimonyError, setAllTestimonies, startAllTestimoniesLoading, stopAllTestimoniesLoading, setAllTestimoniesError } = testimonySlice.actions;
export default testimonySlice.reducer;