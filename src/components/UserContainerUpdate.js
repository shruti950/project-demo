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
    };
  }
  onChangeName = (e) => {
    const name = e.target.value;
    this.setState((prevState) => ({
      user: { ...prevState.user, name: name },
    }));
    console.log("user==>", this.state.user);
  };
  onChangeAge = (e) => {
    const age = e.target.value;
    this.setState((prevState) => ({
      user: { ...prevState.user, age: age },
    }));
    console.log("user==>", this.state.user);
  };
  onChangeEmail = (e) => {
    const email = e.target.value;
    this.setState((prevState) => ({
      user: { ...prevState.user, email: email },
    }));
    console.log("user==>", this.state.user);
  };
  componentDidMount() {
    console.log("loading data in did", this.props.loadingData);

    // if (this.props.loadingData === false) {
    const id = this.props.match.params.id;
    this.props.fetchUser(id);
    // console.log(
    //   "userData in component did mount",
    //   this.props.match.params.id,
    //   this.props.userData
    //   // this.props.id
    // );
    console.log("vaman this.props.userData", this.props.userData);
    this.setState({ users: this.props.userData, id: id });
    // console.log(
    //   "users in component did mount",
    //   this.state.users,
    //   this.state.id,
    //   this.props
    // );
    // console.log(
    //   "userData in component did mount id",
    //   this.props.match.params.id
    // );
  }

  // }
  // componentWillMount() {
  //   if (this.props.loadingData === false) {
  //     console.log(" true for loading data");
  //   } else {
  //     console.log("false");
  //   }
  //   console.log(
  //     "loading data in will",
  //     this.props.loadingData,
  //     this.props.loadingData === false
  //   );
  //   if (this.props.loadingData === false) {
  //     const id = this.props.match.params.id;
  //     // this.setState({ id: id });
  //     this.props.fetchUser(id);
  //     console.log(
  //       "userData in component will mount",
  //       this.props.match.params.id,
  //       this.props.userData,
  //       // this.props.id,
  //       this.props,
  //       this.props.fetchUser(id)
  //     );
  //     console.log(
  //       "userData in component will mount id",
  //       this.props.match.params.id
  //     );
  //     this.setState({ users: this.props.userData, id: id });
  //     console.log(
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
    // console.log("in else part", user);
    console.log("users vaman", users);
    if (!user.name || !user.age || !user.email) {
      if (!user.name) {
        user.name = userData[0].name;
        console.log("user name", user.name);
      }
      if (!user.age) {
        user.age = userData[0].age;
        console.log("user age", user);
      }
      if (!user.email) {
        user.email = userData[0].email;
        console.log("user in if ", user);
        return await updateUsers(id, user);
        history.push("/home");
      }
    } else {
      console.log("in else part", user);
      return await updateUsers(id, user);
      history.push("/home");
    }
  };
  render() {
    let { userData, updateUsers } = this.props;
    let id = this.props.match.params.id;
    const { user, users } = this.state;
    console.log("users.map1212", users);
    return (
      <div className="container ">
        <Router>
          <HeaderUser />
          {users.map((getuser) => {
            console.log("getuser1212", getuser);
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
                    {/* <Link to={{ pathname: `/home` }}> */}
                    <button
                      className="btn btn-primary"
                      onClick={() => this.editUserDetails()}
                      type="submit"
                    >
                      Update
                    </button>
                    {/* </Link> */}
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
  console.log("state vaman", state);
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
export default connect(mapStateToProps, { fetchUser, updateUsers })(
  UserContainerUpdate
);
// import React, { Component, useState, useEffect } from "react";
// import { connect } from "react-redux";
// import { fetchUser, updateUsers } from "../redux";
// // import React from 'react'
// import { useParams, useHistory, withRouter } from "react-router-dom";
// import HeaderUser from "./HeaderUser";
// // const location = useLocation();
// const initialState = {
//   name: "",
//   age: "",
//   email: "",
// };
// function UserContainerUpdate({ userData, fetchUser }, props) {
//   const [user, setUser] = useState(initialState);
//   const [users, setUsers] = useState([]);
//   const { name, age, email } = user;
//   const { id } = useParams();
//   let history = useHistory();
//   console.log(
//     "params DAta",
//     useParams(),
//     userData,
//     userData.name,
//     userData.age,
//     userData.email
//   );
//   useEffect(() => {
//     fetchUser(id);
//     // setUsers(userData);
//     // console.log("user in useeffect", users);
//   }, []);

//   console.log("params DAta", useParams(), users, userData.age, userData.email);
//   const onValueChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//     console.log("user==>", user.name, user.age, user.email);
//   };

//   console.log("out side update state", id, name, age, email);

//   console.log("user======>", userData[0].name, users, user);
//   const editUserDetails = (e) => {
//     console.log("in else part", user);
//     console.log("users", users);
//     if (!user.name || !user.age || !user.email) {
//       if (!user.name) {
//         // const uname = users.name;
//         user.name = userData[0].name;
//         console.log("user name", user.name);
//       }
//       if (!user.age) {
//         // age = userData.map((user) => user.age);
//         user.age = userData[0].age;
//         console.log("user age", user);
//       }
//       if (!email) {
//         // email = userData.map((user) => user.email);
//         user.email = userData[0].email;
//         console.log("user in if ", user);
//         updateUsers(id, user);
//         history.push("/home");
//       }
//     } else {
//       console.log("in else part", user);
//       updateUsers(id, user);
//       history.push("/home");
//     }
//   };
//   return (
//     <div className="container ">
//       <HeaderUser />
//       {userData.map((getuser) => {
//         return (
//           <div key={getuser._id}>
//             <form onSubmit={() => editUserDetails()}>
//               <div className="form-group text-left">
//                 <label>Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   className="form-control"
//                   defaultValue={getuser.name}
//                   // value={user.name}
//                   onChange={onValueChange}
//                 />
//               </div>
//               <div className="form-group text-left">
//                 <label>Age:</label>
//                 <input
//                   type="text"
//                   name="age"
//                   className="form-control"
//                   defaultValue={getuser.age}
//                   // value={user.age}
//                   onChange={onValueChange}
//                 />
//               </div>
//               <div className="form-group text-left">
//                 <label>Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control"
//                   defaultValue={getuser.email}
//                   onChange={onValueChange}
//                 />
//               </div>
//               <div className="form-group text-left">
//                 <button
//                   className="btn btn-primary"
//                   // onClick={() => editUserDetails()}
//                   type="submit"
//                 >
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   console.log("state", state);
//   return {
//     userData: state.users,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchUser: (id) => dispatch(fetchUser(id)),
//     updateUsers: (id, user) => dispatch(updateUsers(id, user)),
//   };
// };
// export default connect(
//   (state) => ({ userData: state.users, loadingData: state.loading }),
//   mapDispatchToProps
// )(UserContainerUpdate);
