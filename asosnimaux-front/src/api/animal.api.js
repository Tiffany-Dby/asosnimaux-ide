// Api
import { deleteRequest, getRequest, postRequest, putRequest } from "./api";
// Reducers
import { resetFormNewAnimal, setAllAnimals, setAllAnimalsError, setDeleteAnimal, setDeleteAnimalError, setNewAnimal, setNewAnimalError, setOneAnimal, setOneAnimalError, setSelectedwAnimalError, setUpdateExitDate, setUpdateSelectedAnimal, startAllAnimalsLoading, startDeleteAnimalLoading, startNewAnimalLoading, startOneAnimalLoading, startSelectedAnimalLoading } from "../redux/reducers/animal.reducer";
// Constants
import { APP_ROUTES } from "../constants/route.const";
// Utils
import { setFormData } from "../utils/formidable.utils";
import { getFromStorage } from "../utils/storage.utils";
import { showToast } from "../utils/toast.utils";

// ******************** POST ********************
export const postNewAnimalThunk = (file) => async (dispatch, getState) => {
  const { animals, newAnimalLoading } = getState().animalReducer;
  const { newAnimal } = animals;
  // Utils -> storage.utils.js
  const token = getFromStorage("token");
  if (newAnimalLoading) return;

  // Utils -> formidable.utils.js
  const fd = setFormData({
    ...newAnimal,
    newAnimalImg: file
  });

  dispatch(startNewAnimalLoading());

  const { result, error, status } = await postRequest("animals", fd, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setNewAnimalError({ error: `Something went wrong : ${error}` }));

  dispatch(setNewAnimal({ animal: result.animal[0] }));
  showToast(dispatch);
  dispatch(resetFormNewAnimal());
}
// ******************** END POST ********************

// ******************** GET ********************
export const getAllAnimalsThunk = () => async (dispatch, getState) => {
  const { allAnimalsLoading } = getState().animalReducer;
  if (allAnimalsLoading) return;

  dispatch(startAllAnimalsLoading());

  const { result, error, status } = await getRequest("animals/all");
  if (!result?.message || status >= 400 || !!error) return dispatch(setAllAnimalsError({ error: `Something went wrong : ${error}` }));

  dispatch(setAllAnimals({ all: result.result }));
}

export const getOneAnimalThunk = (id) => async (dispatch, getState) => {
  const { oneAnimalLoading } = getState().animalReducer;
  if (oneAnimalLoading) return;

  dispatch(startOneAnimalLoading());

  const { result, error, status } = await getRequest(`animals/${id}`);
  if (!result?.message || status >= 400 || !!error) return dispatch(setOneAnimalError({ error: `Something went wrong : ${error}` }));

  dispatch(setOneAnimal({
    id: result.animal.id,
    entry_date: result.animal.entryDate,
    name: result.animal.name,
    birthdate: result.animal.birthdate,
    age: result.animal.age,
    birthday: result.animal.birthday,
    sex: result.animal.sex,
    description: result.animal.description,
    race: result.animal.race,
    status: result.animal.status,
    exit_date: result.animal.exitDate,
    species: result.animal.species,
    picture_url: `${APP_ROUTES.API_URL}${result.animal.pictureURL}`,
    picture_caption: result.animal.pictureCaption,
    time_spent: result.animal.timeSpent
  }));
}
// ******************** END GET ********************

// ******************** PUT ********************
export const updateAnimalThunk = () => async (dispatch, getState) => {
  const { animals, selectedAnimalLoading } = getState().animalReducer;
  const { selectedAnimal } = animals;
  // Utils -> storage.utils.js
  const token = getFromStorage("token");
  if (selectedAnimalLoading) return;

  dispatch(startSelectedAnimalLoading());

  const { result, error, status } = await putRequest("animals", selectedAnimal, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSelectedwAnimalError({ error: `Something went wrong : ${error}` }));

  dispatch(setUpdateSelectedAnimal({ animal: result.updatedAnimal[0] }));
  showToast(dispatch);
}

export const updateAnimalExitDateThunk = () => async (dispatch, getState) => {
  const { animals, selectedAnimalLoading } = getState().animalReducer;
  const { selectedAnimal } = animals;
  // Utils -> storage.utils.js
  const token = getFromStorage("token");
  if (selectedAnimalLoading) return;

  dispatch(startSelectedAnimalLoading());

  const formatExpectedOnRequest = {
    id: selectedAnimal.id,
    exitDate: selectedAnimal.exit_date
  }

  const { result, error, status } = await putRequest("animals/exitDate", formatExpectedOnRequest, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setSelectedwAnimalError({ error: `Something went wrong : ${error}` }));

  dispatch(setUpdateExitDate({ animal: result.updatedExitDate[0] }));
  showToast(dispatch);
}
// ******************** END PUT ********************

// ******************** DELETE ********************
export const deleteAnimalThunk = () => async (dispatch, getState) => {
  const { deleteAnimalLoading, animals } = getState().animalReducer;
  const { selectedAnimal } = animals;
  // Utils -> storage.utils.js
  const token = getFromStorage("token");
  if (deleteAnimalLoading) return;

  dispatch(startDeleteAnimalLoading());

  const { result, error, status } = await deleteRequest(`animals/${selectedAnimal.id}`, token);
  if (!result?.message || status >= 400 || !!error) return dispatch(setDeleteAnimalError({ error: `Something went wrong : ${error}` }));

  dispatch(setDeleteAnimal({ id: selectedAnimal.id }));
  showToast(dispatch);
}
// ******************** END DELETE ********************