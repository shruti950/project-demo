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
  const [users, setUsers] = useState();
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
    setUsers(userData);
    // setUser({ user: userData });s
  }, []);

  console.log("params DAta", useParams(), users, userData.age, userData.email);
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("user==>", user.name, user.age, user.email);
  };

  console.log("out side update state", id, name, age, email);

  console.log("user======>", userData, users, user);
  const editUserDetails = async (e) => {
    console.log("in else part", user);
    if (!name || !age || !email) {
      if (!name) {
        name = userData.name;
      }
      if (!age) {
        age = userData.age;
      }
      if (!email) {
        email = userData.email;
      }
      await updateUsers(id, user);
      history.push("/home");
    } else {
      console.log("in else part", user);
      await updateUsers(id, user);
      history.push("/home");
    }
  };
  return (
    <div className="container ">
      <HeaderUser />
      {userData.map((getuser) => {
        console.log("map user ==========>", getuser);
        return (
          <div key={getuser._id}>
            <form onSubmit={() => editUserDetails()}>
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
                  // onClick={() => editUserDetails()}
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
