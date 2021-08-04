import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import { fetchUser, updateUsers } from "../redux";
// import React from 'react'
// import { useParams, useHistory, withRouter } from "react-router-dom";
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
      users: [],
      id: "",
      p: {},
    };
  }
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
  componentDidMount() {
    // if (this.props.loadingData === false) {
    const id = this.props.match.params.id;
    this.props.fetchUser(id);
    this.setState({ users: this.props.userData, id: id });
  }
  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps !== this.props) {
      this.setState({
        users: nextProps.userData,
      });
    }
  }

  // }
  // componentWillMount() {
  //   if (this.props.loadingData === false) {
  //   } else {
  //   }
  //     "loading data in will",
  //     this.props.loadingData,
  //     this.props.loadingData === false
  //   );
  //   if (this.props.loadingData === false) {
  //     const id = this.props.match.params.id;
  //     // this.setState({ id: id });
  //     this.props.fetchUser(id);
  //       "userData in component will mount",
  //       this.props.match.params.id,
  //       this.props.userData,
  //       // this.props.id,
  //       this.props,
  //       this.props.fetchUser(id)
  //     );
  //       "userData in component will mount id",
  //       this.props.match.params.id
  //     );
  //     this.setState({ users: this.props.userData, id: id });
  //       "users in component will mount",
  //       this.state.id,
  //       this.state.users
  //     );
  //     // this.getData();
  //   }
  // }
  editUserDetails = async (e) => {
    // e.preventDefault();
    const { user, id, users } = this.state;
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
        await updateUsers(id, user);
        history.push("/home");
        return;
      }
    } else {
      await updateUsers(id, user);
      history.push("/home");
      return;
    }
  };
  render() {
    let { userData, updateUsers } = this.props;
    let id = this.props.match.params.id;
    const { user, users } = this.state;
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
                        // value={user.name}
                        onChange={this.onChangeName}
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
                        onChange={this.onChangeAge}
                      />
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
                    </div>
                    <div className="form-group text-left">
                      <Link to={{ pathname: `/home` }}>
                        <button
                          className="btn btn-primary"
                          onClick={() => this.editUserDetails()}
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
