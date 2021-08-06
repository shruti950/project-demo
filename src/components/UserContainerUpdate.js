import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { fetchUser, updateUsers } from "../redux";
import HeaderUser from "./HeaderUser";
class UserContainerUpdate extends Component {
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
      id: "",
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
    const id = this.props.match.params.id;
    this.props.fetchUser(id);
    this.setState({ users: this.props.userData, id: id });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        users: nextProps.userData,
      });
    }
  }
  editUserDetails = async (e) => {
    const { user, id, age } = this.state;
    const { updateUsers, userData, history } = this.props;
    if (!user.name || !user.age || !user.email) {
      if (!user.name) {
        user.name = userData[0].name;
      }
      if (!user.age) {
        user.age = userData[0].age;
      }
      if (!user.email) {
        user.email = userData[0].email;
      }
      var validEmailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

      if (validEmailRegex.test(user.email) === false || user.age <= 17) {
        e.preventDefault();
        if (validEmailRegex.test(user.email) === false) {
          alert("Email is not valid");
        }
        if (user.age <= 17) {
          alert("Age is must be 18+!");
        }
        history.push(`/updateuser/${user._id}`);
        return;
      } else {
        await updateUsers(id, user);
        history.push("/home");
        return;
      }
    } else {
      var validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (validEmailRegex.test(user.email) === false || user.age <= 17) {
        e.preventDefault();
        if (validEmailRegex.test(user.email) === false) {
          alert("Email is not valid");
        }
        if (user.age <= 17) {
          alert("Age is must be 18+!");
        }
        history.push(`/updateuser/${user._id}`);
        return;
      } else {
        await updateUsers(id, user);
        history.push("/home");
        return;
      }
    }
  };
  render() {
    const { users } = this.state;
    return (
      <div className="container ">
        <Router>
          <HeaderUser />
          {users?.length > 0 &&
            users?.map((getuser) => {
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
                        onChange={this.onChangeName}
                      />
                      {this.state.errors.name.length > 0 && (
                        <p className=" small font-weight-bold text-danger">
                          {this.state.errors.name}
                        </p>
                      )}
                    </div>
                    <div className="form-group text-left">
                      <label>Age:</label>
                      <input
                        type="text"
                        name="age"
                        className="form-control"
                        defaultValue={getuser.age}
                        onChange={this.onChangeAge}
                      />
                      <p className=" small font-weight-bold text-danger">
                        {this.state.errors.age}
                      </p>
                    </div>
                    <div className="form-group text-left">
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        defaultValue={getuser.email}
                        onChange={this.onChangeEmail}
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
                          onClick={(event) => this.editUserDetails(event)}
                          type="submit"
                        >
                          Update
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              );
            })}
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.users,
    loadingData: state.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    updateUsers: (id, user) => dispatch(updateUsers(id, user)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainerUpdate);
