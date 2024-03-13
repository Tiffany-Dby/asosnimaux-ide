import { createSlice } from "@reduxjs/toolkit";

const ANIMAL_STATE = {
  animals: {
    all: [],
    one: {
      id: "",
      entry_date: "",
      name: "",
      birthdate: "",
      age: "",
      birthday: "",
      sex: "",
      description: "",
      truncated_description: "",
      race: "",
      status: "",
      exit_date: "",
      species: "",
      picture_url: "",
      picture_caption: "",
      time_spent: ""
    },
    newAnimal: {
      name: "",
      birthdate: "",
      age: "",
      sex: "",
      description: "",
      status: "",
      race: "",
      species: "",
      picture_caption: ""
    },
    selectedAnimal: {
      id: "",
      birthdate: "",
      name: "",
      sex: "",
      description: "",
      race: "",
      status: "",
      species: "",
      exit_date: ""
    }
  },
  allAnimalsLoading: false,
  allAnimalsError: null,
  oneAnimalLoading: false,
  oneAnimalError: null,
  newAnimalLoading: false,
  newAnimalSuccess: null,
  newAnimalError: null,
  selectedAnimalLoading: false,
  selectedAnimalSuccess: false,
  selectedAnimalError: null,
  deleteAnimalLoading: false,
  deleteAnimalSuccess: null,
  deleteAnimalError: null
}

const animalSlice = createSlice({
  name: "animal",
  initialState: ANIMAL_STATE,
  reducers: {
    setOneAnimal: (state, action) => {
      const { id, entry_date, name, birthdate, age, birthday, sex, description, truncated_description, race, status, exit_date, species, picture_url, picture_caption, time_spent } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          one: {
            id,
            entry_date,
            name,
            birthdate,
            age,
            birthday,
            sex,
            description,
            truncated_description,
            race,
            status,
            exit_date,
            species,
            picture_url,
            picture_caption,
            time_spent
          }
        },
        oneAnimalError: null,
        oneAnimalLoading: false
      }
    },
    startOneAnimalLoading: (state, action) => {
      return {
        ...state,
        oneAnimalLoading: true
      }
    },
    stopOneAnimalLoading: (state, action) => {
      return {
        ...state,
        oneAnimalLoading: false
      }
    },
    setOneAnimalError: (state, action) => {
      return {
        ...state,
        oneAnimalError: action.payload.error,
        oneAnimalLoading: false
      }
    },
    setAllAnimals: (state, action) => {
      return {
        ...state,
        animals: {
          ...state.animals,
          all: action.payload.all
        },
        allAnimalsError: null,
        allAnimalsLoading: false
      }
    },
    startAllAnimalsLoading: (state, action) => {
      return {
        ...state,
        allAnimalsLoading: true
      }
    },
    stopAllAnimalsLoading: (state, action) => {
      return {
        ...state,
        allAnimalsLoading: false
      }
    },
    setAllAnimalsError: (state, action) => {
      return {
        ...state,
        allAnimalsError: action.payload.error,
        allAnimalsLoading: false
      }
    },
    updateFormNewAnimal: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          newAnimal: {
            ...state.animals.newAnimal,
            [input]: value
          }
        }
      }
    },
    resetFormNewAnimal: (state, action) => {
      return {
        ...state,
        animals: {
          ...state.animals,
          newAnimal: {
            name: "",
            birthdate: "",
            sex: "",
            description: "",
            status: "",
            race: "",
            species: "",
            picture_caption: ""
          }
        }
      }
    },
    setNewAnimal: (state, action) => {
      const { animal } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          all: [{ ...animal }, ...state.animals.all]
        },
        newAnimalError: null,
        newAnimalLoading: false,
        newAnimalSuccess: "Animal ajouté !"
      }
    },
    startNewAnimalLoading: (state, action) => {
      return {
        ...state,
        newAnimalLoading: true
      }
    },
    stopNewAnimalLoading: (state, action) => {
      return {
        ...state,
        newAnimalLoading: false
      }
    },
    setNewAnimalError: (state, action) => {
      return {
        ...state,
        newAnimalError: action.payload.error,
        newAnimalLoading: false
      }
    },
    resetAnimalsSuccess: (state, action) => {
      return {
        ...state,
        newAnimalSuccess: null,
        selectedAnimalSuccess: null,
        deleteAnimalSuccess: null
      }
    },
    setSelectedAnimal: (state, action) => {
      const { id, birthdate, name, sex, description, race, status, species, exit_date } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          selectedAnimal: {
            id,
            birthdate,
            name,
            sex,
            description,
            race,
            status,
            species,
            exit_date
          }
        }
      }
    },
    updateFormSelectedAnimal: (state, action) => {
      const { input, value } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          selectedAnimal: {
            ...state.animals.selectedAnimal,
            [input]: value
          }
        }
      }
    },
    setUpdateSelectedAnimal: (state, action) => {
      const { animal } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          all: state.animals.all.map((a) => a.id === animal.id ? { ...animal } : { ...a })
        },
        selectedAnimalError: null,
        selectedAnimalLoading: false,
        selectedAnimalSuccess: `${animal.name} mis à jour !`
      }
    },
    startSelectedAnimalLoading: (state, action) => {
      return {
        ...state,
        selectedAnimalLoading: true
      }
    },
    stopSelectedAnimalLoading: (state, action) => {
      return {
        ...state,
        selectedAnimalLoading: false
      }
    },
    setSelectedwAnimalError: (state, action) => {
      return {
        ...state,
        selectedAnimalError: action.payload.error,
        selectedAnimalLoading: false
      }
    },
    setUpdateExitDate: (state, action) => {
      const { animal } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          all: state.animals.all.map((a) => a.id === animal.id ? { ...a, exit_date: animal.exit_date } : { ...a })
        },
        selectedAnimalError: null,
        selectedAnimalLoading: false,
        selectedAnimalSuccess: `${animal.name} mis à jour !`
      }
    },
    setDeleteAnimal: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        animals: {
          ...state.animals,
          all: state.animals.all.filter(animal => animal.id !== id)
        },
        deleteAnimalError: null,
        deleteAnimalLoading: false,
        deleteAnimalSuccess: "Animal supprimé !"
      }
    },
    startDeleteAnimalLoading: (state, action) => {
      return {
        ...state,
        deleteAnimalLoading: true
      }
    },
    stopDeleteAnimalLoading: (state, action) => {
      return {
        ...state,
        deleteAnimalLoading: false
      }
    },
    setDeleteAnimalError: (state, action) => {
      return {
        ...state,
        deleteAnimalError: action.payload.error,
        deleteAnimalLoading: false
      }
    }
  }
});

export const { setOneAnimal, startOneAnimalLoading, stopOneAnimalLoading, setOneAnimalError, setAllAnimals, startAllAnimalsLoading, stopAllAnimalsLoading, setAllAnimalsError, updateFormNewAnimal, resetFormNewAnimal, setNewAnimal, startNewAnimalLoading, stopNewAnimalLoading, setNewAnimalError, resetAnimalsSuccess, setSelectedAnimal, updateFormSelectedAnimal, setUpdateSelectedAnimal, startSelectedAnimalLoading, stopSelectedAnimalLoading, setSelectedwAnimalError, setUpdateExitDate, setDeleteAnimal, startDeleteAnimalLoading, stopDeleteAnimalLoading, setDeleteAnimalError } = animalSlice.actions;
export default animalSlice.reducer;