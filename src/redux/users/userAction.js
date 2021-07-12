import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userType";
import axios from "axios";
export const fetchUser = (user) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get("http://localhost:9000/" + user)
      .then((response) => {
        const users = response.data;
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.msg));
      });
  };
};
export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get("http://localhost:9000/")
      .then((response) => {
        const users = response.data;
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.msg));
      });
  };
};
export const insertUsers = (user) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .post("http://localhost:9000/", user)
      .then((response) => {
        const users = response.data;
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.msg));
      });
  };
};
export const updateUsers = (user, name, age) => {
  console.log("updated user", user, name, age);
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .put("http://localhost:9000/" + user.id, user.name, age)
      .then((response) => {
        const users = response.data;
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.msg));
      });
  };
};
export const deleteUsers = (user) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .post("http://localhost:9000/" + user.id)
      .then((response) => {
        const users = response.data;
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.msg));
      });
  };
};
export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};
export const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};
