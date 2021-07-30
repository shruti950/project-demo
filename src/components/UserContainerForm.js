import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, Link, Redirect } from "react-router-dom";
import { fetchUsers, insertUsers } from "../redux";
import HeaderUser from "./HeaderUser";
// import UserContainer from "./UserContainer";
class UserContainerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: "",
        age: "",
        email: "",
      },
      users: [],
    };
  }
  // changeHandler = (e) => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };
  onChangeName = (e) => {
    const name = e.target.value;
    this.setState((prevState) => ({
      user: { ...prevState.user, name: name },
    }));
  };
  onChangeAge = (e) => {
    const age = e.target.value;
    this.setState((prevState) => ({
      user: { ...prevState.user, age: age },
    }));
  };
  onChangeEmail = (e) => {
    const email = e.target.value;
    this.setState((prevState) => ({
      user: { ...prevState.user, email: email },
    }));
  };
  submitHandler = (e) => {
    e.preventDefault();
    this.props.insertUsers(this.state.user);
  };
  addUser = async (e) => {
    const { users, user } = this.state;
    const { name, age, email } = this.state.user;
    const { userData, history } = this.props;

    if (!name || !age || !email) {
      alert("Please add all the details");
    } else {
      fetchUsers();

      this.setState({ users: userData });
      const existEmail = userData.filter((existingEmail) => {
        if (email === existingEmail.email) {
          return true;
        }
      });
      const map = existEmail.map((item) => {
        if (item.email === email) {
          return true;
        } else {
          return false;
        }
      });
      if (map.includes(true)) {
        alert("Email already Exists");
      } else {
        history.push("/home");
        return await insertUsers(user);

        history.push("/home");
      }
      //
    }
  };

  render() {
    const { name, age, email } = this.state;
    return (
      <div className="container ">
        <HeaderUser />
        <form onSubmit={this.submitHandler}>
          <div className="form-group text-left">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group text-left ">
            <label className="font-weight-bolder">Age:</label>
            <input
              type="text"
              name="age"
              value={age}
              className="form-control"
              onChange={this.onChangeAge}
            />
          </div>
          <div className="form-group text-left ">
            <label className="font-weight-bolder">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="form-group text-left">
            <Link to={{ pathname: `/home` }}>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => this.addUser()}
              >
                Submit
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.users,
  };
};

export default connect(mapStateToProps, { fetchUsers, insertUsers })(
  UserContainerForm
);
