import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userType";
const initialState = {
  loading: "false",
  users: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, users: payload, error: "" };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, users: [], error: payload };

    default:
      return state;
  }
};
export default reducer;
