import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { insertUsers } from "../redux";
import HeaderUser from "./HeaderUser";
import UserContainer from "./UserContainer";
class UserContainerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      email: "",
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    this.props.insertUsers(this.state);
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
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group text-left ">
            <label className="font-weight-bolder">Age:</label>
            <input
              type="text"
              name="age"
              value={age}
              className="form-control"
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group text-left ">
            <label className="font-weight-bolder">Age:</label>
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              onChange={this.changeHandler}
            />
          </div>
          <div className="form-group text-left">
            <Link to={{ pathname: `/home` }}>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={<Redirect to="/home" />}
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
export default connect(mapStateToProps, { insertUsers })(UserContainerForm);
