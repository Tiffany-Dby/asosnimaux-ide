import { createSlice } from "@reduxjs/toolkit";

const ARTICLE_STATE = {
  articles: {
    overview: [],
    all: [],
    one: {
      id: "",
      name: "",
      date: "",
      location: "",
      description: "",
      picture_url: "",
      picture_caption: ""
    },
    newArticle: {
      name: "",
      location: "",
      picture_caption: "",
      description: ""
    },
    selectedArticle: {
      articleID: "",
      date: "",
      name: "",
      location: "",
      description: ""
    },
  },
  overviewLoading: false,
  overviewError: null,
  newArticleLoading: false,
  newArticleSuccess: null,
  newArticleError: null,
  allLoading: false,
  allError: null,
  oneLoading: false,
  oneError: null,
  deleteLoading: false,
  deleteSuccess: null,
  deleteError: null,
  selectedLoading: false,
  selectedSuccess: null,
  selectedError: null
}

const articleSlice = createSlice({
  name: "article",
  initialState: ARTICLE_STATE,
  reducers: {
    setOverview: (state, action) => {
      return {
        ...state,
        articles: {
          ...state.articles,
          overview: action.payload.overview
        },
        overviewError: null,
        overviewLoading: false
      }
    },
    startOverviewLoading: (state, action) => {
      return {
        ...state,
        overviewLoading: true,
      }
    },
    stopOverviewLoading: (state, action) => {
      return {
        ...state,
        overviewLoading: false,
      }
    },
    setOverviewError: (state, action) => {
      return {
        ...state,
        overviewError: action.payload.error,
        overviewLoading: false,
      }
    },
    setNewArticle: (state, action) => {
      const { id, name, date, location, description, picture_url, picture_caption } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          all: [
            {
              id,
              name,
              date,
              location,
              description,
              picture_url,
              picture_caption
            },
            ...state.articles.all
          ]
        },
        newArticleError: null,
        newArticleLoading: false,
        newArticleSuccess: "Article créé !"
      }
    },
    startNewArticleLoading: (state, action) => {
      return {
        ...state,
        newArticleLoading: true
      }
    },
    stopNewArticleLoading: (state, action) => {
      return {
        ...state,
        newArticleLoading: false
      }
    },
    setNewArticleError: (state, action) => {
      return {
        ...state,
        newArticleError: action.payload.error,
        newArticleLoading: false
      }
    },
    updateFormNewArticle: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          newArticle: {
            ...state.articles.newArticle,
            [input]: value
          }
        }
      }
    },
    resetFormNewArticle: (state, action) => {
      return {
        ...state,
        articles: {
          ...state.articles,
          newArticle: {
            name: "",
            location: "",
            picture_caption: "",
            description: ""
          }
        }
      }
    },
    setAll: (state, action) => {
      return {
        ...state,
        articles: {
          ...state.articles,
          all: action.payload.all
        },
        allError: null,
        allLoading: false
      }
    },
    startAllLoading: (state, action) => {
      return {
        ...state,
        allLoading: true
      }
    },
    stopAllLoading: (state, action) => {
      return {
        ...state,
        allLoading: false
      }
    },
    setAllError: (state, action) => {
      return {
        ...state,
        allError: action.payload.error,
        allLoading: false
      }
    },
    setDelete: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          all: state.articles.all.filter(article => article.id !== id)
        },
        deleteError: null,
        deleteLoading: false,
        deleteSuccess: "Article supprimé !",
      }
    },
    setStartDeleteLoading: (state, action) => {
      return {
        ...state,
        deleteLoading: true,
      }
    },
    setStopDeleteLoading: (state, action) => {
      return {
        ...state,
        deleteLoading: false,
      }
    },
    setDeleteError: (state, action) => {
      return {
        ...state,
        deleteError: action.payload.error,
        deleteLoading: false
      }
    },
    setSelectedArticle: (state, action) => {
      const { id, name, location, description } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          selectedArticle: {
            id,
            name,
            location,
            description
          }
        }
      }
    },
    updateFormSelectedArticle: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          selectedArticle: {
            ...state.articles.selectedArticle,
            [input]: value
          }
        }
      }
    },
    setUpdateSelected: (state, action) => {
      const { article } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          all: state.articles.all.map((a) => a.id === article.id ? { ...article } : { ...a })
        },
        selectedError: null,
        selectedLoading: false,
        selectedSuccess: "Article mis à jour !"
      }
    },
    startSelectedLoading: (state, action) => {
      return {
        ...state,
        selectedLoading: true
      }
    },
    stopSelectedLoading: (state, action) => {
      return {
        ...state,
        selectedLoading: false
      }
    },
    setSelectedError: (state, action) => {
      return {
        ...state,
        selectedError: action.payload.error,
        selectedLoading: false
      }
    },
    resetArticleSuccess: (state, action) => {
      return {
        ...state,
        newArticleSuccess: null,
        deleteSuccess: null,
        selectedSuccess: null,
      }
    },
    setOne: (state, action) => {
      const { id, name, date, location, description, picture_url, picture_caption } = action.payload;
      return {
        ...state,
        articles: {
          ...state.articles,
          one: {
            id,
            name,
            date,
            location,
            description,
            picture_url,
            picture_caption
          }
        },
        oneError: null,
        oneLoading: false
      }
    }
    ,
    startOneLoading: (state, action) => {
      return {
        ...state,
        oneLoading: true
      }
    },
    stopOneLoading: (state, action) => {
      return {
        ...state,
        oneLoading: false
      }
    },
    setOneError: (state, action) => {
      return {
        ...state,
        oneError: action.payload.error,
        oneLoading: false
      }
    }
  }
});

export const { setOverview, startOverviewLoading, stopOverviewLoading, setOverviewError, setNewArticle, startNewArticleLoading, stopNewArticleLoading, setNewArticleError, updateFormNewArticle, resetFormNewArticle, setAll, startAllLoading, stopAllLoading, setAllError, setDelete, setStartDeleteLoading, setStopDeleteLoading, setDeleteError, setSelectedArticle, updateFormSelectedArticle, startSelectedLoading, stopSelectedLoading, setSelectedError, setUpdateSelected, resetArticleSuccess, setOne, startOneLoading, stopOneLoading, setOneError } = articleSlice.actions;
export default articleSlice.reducer;