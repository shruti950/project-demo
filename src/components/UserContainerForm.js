import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
      errors: { name: "", age: "", email: "" },
      users: [],
    };
  }
  onChangeName = (e) => {
    let errors = this.state.errors;
    const name = e.target.value;
    errors.name =
      name.length < 3 ? " Name must be 3 or more  characters long!" : "";
    this.setState((prevState) => ({
      user: { ...prevState.user, name: name },
    }));
  };
  onChangeAge = (e) => {
    let errors = this.state.errors;
    const age = e.target.value;
    errors.age = age <= 17 ? "Age is must be 18+ !" : "";
    this.setState((prevState) => ({
      user: { ...prevState.user, age: age },
    }));
  };
  onChangeEmail = (e) => {
    const validEmailRegex = RegExp(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    );
    let errors = this.state.errors;
    const email = e.target.value;
    errors.email = validEmailRegex.test(email) ? "" : "Email is not valid!";
    this.setState((prevState) => ({
      user: { ...prevState.user, email: email },
    }));
  };

  componentDidMount() {
    this.loadPage();
  }
  componentWillMount() {
    this.loadPage();
  }
  loadPage = () => {
    const { totalPage, fetchUsers } = this.props;
    fetchUsers();
    this.setState({ users: this.props.userData, pageCount: totalPage });
  };

  addUser = async (e) => {
    const { user } = this.state;
    const { name, age, email } = this.state.user;
    const { userData, history } = this.props;
    if (!name || !age || !email) {
      e.preventDefault();
      alert("Please add all the details");
      history.push("/adduser");
      return;
    } else {
      this.props.fetchUsers();
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
        e.preventDefault();
        alert("Email already Exists");
        history.push("/adduser");
        return;
      } else {
        var validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (validEmailRegex.test(user.email) === false || age <= 17) {
          e.preventDefault();
          if (validEmailRegex.test(user.email) === false) {
            alert("Email is not valid");
          }
          if (age <= 17) {
            alert("Age is must be 18+!");
          }
          history.push("/adduser");
          return;
        }
        history.push("/home");
        return await this.props.insertUsers(user);

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
        <form>
          <div className="form-group text-left">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control"
              onChange={this.onChangeName}
              required
            />
            {this.state.errors.name.length > 0 && (
              <p className=" small font-weight-bold text-danger">
                {this.state.errors.name}
              </p>
            )}
          </div>
          <div className="form-group text-left ">
            <label className="font-weight-bolder">Age:</label>
            <input
              type="number"
              name="age"
              value={age}
              className="form-control"
              onChange={this.onChangeAge}
              required
            />
            {this.state.errors.age.length > 0 && (
              <p className=" small font-weight-bold text-danger">
                {this.state.errors.age}
              </p>
            )}
          </div>
          <div className="form-group text-left ">
            <label className="font-weight-bolder">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              onChange={this.onChangeEmail}
              required="required"
            />
            {this.state.errors.email.length > 0 && (
              <p className=" small font-weight-bold text-danger">
                {this.state.errors.email}
              </p>
            )}
          </div>
          <div className="form-group text-left">
            <Link to={{ pathname: `/home` }}>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={(event) => this.addUser(event)}
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
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    insertUsers: (user) => dispatch(insertUsers(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserContainerForm);
