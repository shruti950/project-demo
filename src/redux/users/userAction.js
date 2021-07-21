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
        console.log("file: userAction.js ~ line 28 ~ .then ~ users", users);
        // localStorage.setItem("users", JSON.stringify(users));
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.msg));
      });
  };
};
const usersUrl = "http://localhost:9000";
// export const insertUsers = (user) => {
//   return (dispatch) => {
//     dispatch(fetchUserRequest());
//     axios
//       .post("http://localhost:9000/", user)
//       .then((response) => {
//         const users = response.data;
//         dispatch(fetchUserSuccess(users));
//       })
//       .catch((error) => {
//         dispatch(fetchUserFailure(error.msg));
//       });
//   };
// };
export const insertUsers = async (user) => {
  return await axios
    .post(`${usersUrl}`, user)
    .then((response) => {
      console.log(
        "file: userAction.js ~ line 58 ~ returnawaitaxios.post ~ response",
        response
      );
    })
    .catch((error) => {
      console.log("Bad request");
    });
};
// export const updateUsers = async (id, user) => {
//   console.log("id and user", id, user);
//   return await axios
//     .put(`${usersUrl}/${id}`, user)
//     .catch((error) => console.log("error", error));
// };
export const updateUsers = async (id, user) => {
  console.log("updated user", id, user.name, user.age);
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    await axios
      .put("http://localhost:9000/" + id, user)
      .then((response) => {
        const users = response.data;
        console.log("users==>", users);
        console.log("RESPONSE==>", response);
        return dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.msg));
        console.log("error", error);
      });
  };
};

export const deleteUsers = async (id) => {
  return await axios.delete(`${usersUrl}/${id}`);
};
// export const deleteUsers = (id) => {
//   console.log("id", id);
//   return (dispatch) => {
//     dispatch(fetchUserRequest());
//     console.log("data", id);
//     axios
//       .delete(`${usersUrl}/${id}`)
//       .get("http://localhost:9000/")
//       .then((response) => {
//         // response.data is the users
//         const users = response.data;
//         console.log("users", users);
//         dispatch(fetchUserSuccess(users));
//       })
//       .catch((error) => {
//         // error.message is the error message
//         dispatch(fetchUserFailure(error.message));
//       });
//   };
// };
export const fetchUserRequest = () => {
  console.log("is call.... fetchUserRequest");
  return {
    type: FETCH_USER_REQUEST,
  };
};
export const fetchUserSuccess = (users) => {
  console.log("is call.... fetchUserSuccess");
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};

export const fetchUserFailure = (error) => {
  console.log("is call.... fetchUserFailure");
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};
