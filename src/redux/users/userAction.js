import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userType";
import axios from "axios";
const usersUrl = "http://localhost:9000";
export const fetchUser = (user) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get("http://localhost:9000/" + user)
      .then((response) => {
        const user = response.data;
        dispatch(fetchUserSuccess(user));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
};
export const fetchSearchedUser = (searchTerm, offset) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get(
        "http://localhost:9000/users/search/" +
          searchTerm +
          "/?offset=" +
          offset
      )
      .then((response) => {
        const user = response.data;
        dispatch(fetchUserSuccess(user.slice, user.totalPages));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
};

export const fetchAllUsers = (offset, limit) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get("http://localhost:9000/?offset=" + offset + "&limit=" + limit)
      .then((response) => {
        const user = response.data;

        dispatch(fetchUserSuccess(user.slice, user.page));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
      });
  };
  // } catch (err) {
  // }
  // debugger;
};
export const fetchUsers = () => {
  //
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .get(`${usersUrl}/users`)
      .then((response) => {
        const user = response.data;

        dispatch(fetchUserSuccess(user));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error));
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

export const updateUsers = (id, user) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const response = await axios.put("http://localhost:9000/" + id, user);

      dispatch(fetchUserSuccess(response.data));
    } catch (error) {
      dispatch(fetchUserFailure(error));
    }
  };
};

// export const deleteUsers = async (id) => {
//   return await axios.delete(`${usersUrl}/${id}`);
// };
export const deleteUsers = (id) => {
  return (dispatch) => {
    dispatch(fetchUserRequest());
    axios
      .delete(`${usersUrl}/${id}`)
      .then((response) => {
        const users = response.data;
        dispatch(fetchUserSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};
export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (users, pages) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
    totalPage: pages,
  };
};
export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};
