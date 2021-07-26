import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userType";
// import { persistReducer } from "redux-persist";
const initialState = {
  loading: "",
  users: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log("action in reducer", action, payload, type);
  switch (type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, users: [], error: "" };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, users: payload, error: "" };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, users: [], error: payload };
    default:
      return state;
  }
};
export default reducer;
