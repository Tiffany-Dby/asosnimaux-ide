// Reducers
import { resetFollowIDs, resetFollowedAnimals, setUser, setisAuth } from "../redux/reducers/user.reducer";
// Utils
import { clearStorage } from "./storage.utils";

// Disconnect user -> clear storage and states
export const signOut = (dispatch) => {
  clearStorage();
  dispatch(resetFollowIDs());
  dispatch(resetFollowedAnimals());
  dispatch(setUser({ id: "", username: "", email: "", avatar: "", role: "" }));
  dispatch(setisAuth(false));
}