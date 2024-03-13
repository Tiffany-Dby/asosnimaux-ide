// Reducers
import { resetFormNewAnimal, setSelectedAnimal } from "../redux/reducers/animal.reducer";
import { resetFormNewArticle, setSelectedArticle } from "../redux/reducers/article.reducer";
import { setSelectedTestimony } from "../redux/reducers/testimony.reducer";
import { setSelectedUser } from "../redux/reducers/user.reducer";

// *** Reset states (mostly used by Admin)
export const resetAdminSelects = (dispatch) => {
  dispatch(setSelectedArticle({ id: "", name: "", location: "", description: "" }));
  dispatch(setSelectedAnimal({ id: "", age: "", name: "", sex: "", description: "", race: "", status: "", species: "", exit_date: "" }));
  dispatch(setSelectedTestimony({ id: "", user_id: "", content: "" }));
  dispatch(setSelectedUser({ id: "", username: "", role: "" }));
}

export const resetAdminForms = (dispatch) => {
  dispatch(resetFormNewArticle());
  dispatch(resetFormNewAnimal());
}
// *** End Reset states (mostly used by Admin)