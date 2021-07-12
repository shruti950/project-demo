import React, { Component } from "react";
import { connect } from "react-redux";
import { insertUsers } from "../redux";
class UserContainerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
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
    const { name, age } = this.state;
    return (
      <div className="container ">
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
          <div className="form-group text-left">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
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
