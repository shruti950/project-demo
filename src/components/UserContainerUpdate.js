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
  // const onSubmitData = (e) => {
  //   e.preventDefault();
  //   updateUsers(id, user);
  //   console.log("inside update state", id, user);
  // };
  console.log("out side update state", id, name, age, email);

  console.log("user======>", user);
  const editUserDetails = async () => {
    // if (window.confirm(`Are you sure you want to Update ?`)) {
    console.log("inside update user", id, user);
    const response = await updateUsers(id, user);
    // } else {
    // history.push("/home");
    // }
    // await updateUsers(id, user);
    // console.log("inside ", id, user, user.name, user.age);
    // history.push("/home");
    // <Redirect to="/home" />;
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
                  type="text"
                  name="email"
                  className="form-control"
                  defaultValue={getuser.email}
                  onChange={onValueChange}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={() => editUserDetails()}
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        );
      })}
    </div>
  );
}
// export default UserContainerUpdate
// class UserContainerUpdate extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       age: "",
//     };
//   }

//   // getUser = (name, age) => {
//   //   this.setState({
//   //     name: name,
//   //     age: age,
//   //   });
//   // };
//   fetchUser()
//   changeHandler = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   submitHandler = (e) => {
//     e.preventDefault();
//     console.log(this.state);
//     this.props.updateUsers(this.state);
//   };

//   render() {
//     const { name, age } = this.props;
//     const { id } = useParams();
//     console.log("user id", id);
//     console.log("name" + this.props.name + "age" + this.props);
//     return (
//       <div className="container ">
//         {userData.map((user) => {
//           console.log("map user ==========>", user);
//           return (
//             <p key={user._id}>
//               <form onSubmit={this.submitHandler}>
//                 <div className="form-group text-left">
//                   <label>Name:</label>
//                   <input
//                     type="text"
//                     name="name"
//                     className="form-control"
//                     defaultValue={user.name}
//                     value={name}
//                     onChange={this.changeHandler}
//                   />
//                 </div>
//                 <div className="form-group text-left">
//                   <label>Age:</label>
//                   <input
//                     type="text"
//                     name="age"
//                     className="form-control"
//                     defaultValue={user.age}
//                     value={age}
//                     onChange={this.changeHandler}
//                   />
//                 </div>
//                 <button
//                   className="btn btn-primary"
//                   // onClick={() => setModalIsOpen(false)}
//                   type="submit"
//                 >
//                   Update
//                 </button>
//               </form>
//             </p>
//           );
//         })}
//       </div>
//     );
//   }
// }
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
