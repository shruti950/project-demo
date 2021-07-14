import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUsers } from "../redux";
// import React from 'react'
import { useLocation, useParams, Redirect, useHistory } from "react-router-dom";
import HeaderUser from "./HeaderUser";
// const location = useLocation();
const initialState = {
  name: "",
  age: "",
  email: "",
};
function UserContainerUpdate({ userData, fetchUser }, props) {
  const [user, setUser] = useState(initialState);
  const { name, age, email } = user;
  const { id } = useParams();
  let history = useHistory();
  console.log(
    "params DAta",
    useParams(),
    userData,
    userData.name,
    userData.age,
    userData.email
  );
  useEffect(() => {
    fetchUser(id);

    // setUser({ user: userData });
  }, []);

  console.log(
    "params DAta",
    useParams(),
    userData.name,
    userData.age,
    userData.email
  );
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("user==>", user.email);
  };

  console.log("out side update state", id, name, age, email);

  console.log("user======>", user);
  const editUserDetails = async () => {
    // if (window.confirm(`Are you sure you want to Update ?`))
    await updateUsers(id, user);
    history.push("/home");
  };
  return (
    <div className="container ">
      <HeaderUser />
      {userData.map((getuser) => {
        console.log("map user ==========>", getuser);
        return (
          <div key={getuser._id}>
            <form>
              <div className="form-group text-left">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  defaultValue={getuser.name}
                  // value={user.name}
                  onChange={onValueChange}
                />
              </div>
              <div className="form-group text-left">
                <label>Age:</label>
                <input
                  type="text"
                  name="age"
                  className="form-control"
                  defaultValue={getuser.age}
                  // value={user.age}
                  onChange={onValueChange}
                />
              </div>
              <div className="form-group text-left">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  defaultValue={getuser.email}
                  onChange={onValueChange}
                />
              </div>
              <div className="form-group text-left">
                <button
                  className="btn btn-primary"
                  onClick={() => editUserDetails()}
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    userData: state.users,
  };
};
export default connect(
  mapStateToProps,
  // mapDispatchToProps{}
  { updateUsers, fetchUser }
)(UserContainerUpdate);
