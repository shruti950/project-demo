// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { fetchUser, updateUsers } from "../redux";
// // import React from 'react'
// // import { useParams, useHistory, withRouter } from "react-router-dom";
// import HeaderUser from "./HeaderUser";

// class UserContainerUpdate extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: {
//         name: "",
//         age: "",
//         email: "",
//       },
//       users: [],
//       id: "",
//     };
//   }
//   onValueChange = (e) => {
//     // setUser({ ...user, [e.target.name]: e.target.value });
//     // console.log("user==>", user.name, user.age, user.email);
//     this.setState({
//       user: { ...this.state.user, [e.target.name]: e.target.value },
//     });
//     console.log("user==>", this.state.user);
//   };
//   // componentDidMount() {
//   //   const id = this.props.id;
//   //   this.setState({ id: id });
//   //   console.log("idd", id, this.props.userData, this.props.userData.name);
//   //   this.props.fetchUser(id);
//   // }
//   componentDidMount() {
//     // this.props.fetchUsers();
//     // console.log("userData", this.props.userData);
//     // this.setState({ users: this.props.userData, offset: 1 });
//     const id = this.props.id;
//     // this.setState({ id: id });
//     this.props.fetchUser(id);
//     console.log(
//       "userData in component did mount",
//       this.props.userData,
//       this.props.id
//     );
//     this.setState({ users: this.props.userData, id: id });
//     console.log(
//       "users in component did mount",
//       this.state.users,
//       this.state.id,
//       this.props
//     );
//   }
//   componentWillMount() {
//     const id = this.props.id;
//     // this.setState({ id: id });
//     this.props.fetchUser(id);
//     console.log(
//       "userData in component will mount",
//       this.props.userData,
//       this.props.id,
//       this.props
//     );
//     this.setState({ users: this.props.userData, id: id });
//     console.log(
//       "users in component will mount",
//       this.state.id,
//       this.state.users
//     );
//     // this.getData();
//   }
//   editUserDetails = async (e) => {
//     const { user, id, users } = this.state;
//     const { updateUsers, userData, history } = this.props;
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
//       if (!user.email) {
//         // email = userData.map((user) => user.email);
//         user.email = userData[0].email;
//         console.log("user in if ", user);
//         updateUsers(id, user);
//         // history.push("/home");
//       }
//     } else {
//       console.log("in else part", user);
//       updateUsers(id, user);
//       // history.push("/home");
//     }
//   };
//   render() {
//     return (
//       <div className="container ">
//         <HeaderUser />
//         {this.props.userData.map((getuser) => {
//           return (
//             <div key={getuser._id}>
//               <form onSubmit={this.editUserDetails()}>
//                 <div className="form-group text-left">
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     className="form-control"
//                     defaultValue={getuser.name}
//                     // value={user.name}
//                     onChange={this.onValueChange}
//                   />
//                 </div>
//                 <div className="form-group text-left">
//                   <label>Age:</label>
//                   <input
//                     type="text"
//                     name="age"
//                     className="form-control"
//                     defaultValue={getuser.age}
//                     // value={user.age}
//                     onChange={this.onValueChange}
//                   />
//                 </div>
//                 <div className="form-group text-left">
//                   <label>Email:</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     defaultValue={getuser.email}
//                     onChange={this.onValueChange}
//                   />
//                 </div>
//                 <div className="form-group text-left">
//                   <button
//                     className="btn btn-primary"
//                     // onClick={this.editUserDetails()}
//                     type="submit"
//                   >
//                     Update
//                   </button>
//                 </div>
//               </form>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
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
//   mapStateToProps,
//   mapDispatchToProps
// )(UserContainerUpdate);
import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUsers } from "../redux";
// import React from 'react'
import { useParams, useHistory, withRouter } from "react-router-dom";
import HeaderUser from "./HeaderUser";
// const location = useLocation();
const initialState = {
  name: "",
  age: "",
  email: "",
};
function UserContainerUpdate({ userData, fetchUser }, props) {
  const [user, setUser] = useState(initialState);
  const [users, setUsers] = useState([]);
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
    // setUsers(userData);
    // console.log("user in useeffect", users);
  }, []);

  console.log("params DAta", useParams(), users, userData.age, userData.email);
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("user==>", user.name, user.age, user.email);
  };

  console.log("out side update state", id, name, age, email);

  console.log("user======>", userData[0].name, users, user);
  const editUserDetails = (e) => {
    console.log("in else part", user);
    console.log("users", users);
    if (!user.name || !user.age || !user.email) {
      if (!user.name) {
        // const uname = users.name;
        user.name = userData[0].name;
        console.log("user name", user.name);
      }
      if (!user.age) {
        // age = userData.map((user) => user.age);
        user.age = userData[0].age;
        console.log("user age", user);
      }
      if (!email) {
        // email = userData.map((user) => user.email);
        user.email = userData[0].email;
        console.log("user in if ", user);
        updateUsers(id, user);
        history.push("/home");
      }
    } else {
      console.log("in else part", user);
      updateUsers(id, user);
      history.push("/home");
    }
  };
  return (
    <div className="container ">
      <HeaderUser />
      {userData.map((getuser) => {
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
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => dispatch(fetchUser(id)),
    updateUsers: (id, user) => dispatch(updateUsers(id, user)),
  };
};
export default connect(
  (state) => ({ userData: state.users, loadingData: state.loading }),
  mapDispatchToProps
)(UserContainerUpdate);
