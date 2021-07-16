import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  useLocation,
  useParams,
  Redirect,
  useHistory,
  Link,
} from "react-router-dom";
import { deleteUsers, fetchUsers, insertUsers } from "../redux";
import HeaderUser from "./HeaderUser";
import UserContainer from "./UserContainer";
const initialState = {
  name: "",
  age: "",
  email: "",
};
function UserContainerForm({ userData, fetchUsers }) {
  const [user, setUser] = useState(initialState);
  const [users, setUsers] = useState([]);
  const { name, age, email } = user;
  const { id } = useParams();
  let history = useHistory();
  useEffect(() => {
    fetchUsers();
    setUsers(userData);
    // console.log("users 33 userData", users, userData);
  }, []);
  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("user==>", user.email);
  };

  const addUser = async (e) => {
    if (!name || !age || !email) {
      alert("Please add all the details");
    } else {
      fetchUsers();
      console.log(
        "file: UserContainerForm.js ~ line 45 ~ addUser ~ userData",
        userData
      );
      setUsers(userData);
      console.log("users in add", users);
      const existEmail = users.filter((existingEmail) => {
        // console.log(email == existingEmail.email, typeof existingEmail.email);
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
      console.log("map function ", map);
      if (map.includes(true)) {
        alert("Email already Exists");
      } else {
        await insertUsers(user);
        history.push("/home");
      }
      //
    }
  };

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
            onChange={onValueChange}
          />
        </div>
        <div className="form-group text-left ">
          <label className="font-weight-bolder">Age:</label>
          <input
            type="text"
            name="age"
            value={age}
            className="form-control"
            onChange={onValueChange}
          />
        </div>
        <div className="form-group text-left ">
          <label className="font-weight-bolder">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            onChange={onValueChange}
          />
        </div>
        <div className="form-group text-left">
          <Link to={{ pathname: `/home` }}>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={() => addUser()}
            >
              Submit
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

// class UserContainerForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       age: "",
//       email: "",
//     };
//   }
//   changeHandler = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   submitHandler = (e) => {
//     e.preventDefault();
//     console.log(this.state);
//     this.props.insertUsers(this.state);
//   };
//   render() {
//     const { name, age, email } = this.state;
//     return (
//       <div className="container ">
//         <HeaderUser />
//         <form onSubmit={this.submitHandler}>
//           <div className="form-group text-left">
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               value={name}
//               className="form-control"
//               onChange={this.changeHandler}
//             />
//           </div>
//           <div className="form-group text-left ">
//             <label className="font-weight-bolder">Age:</label>
//             <input
//               type="text"
//               name="age"
//               value={age}
//               className="form-control"
//               onChange={this.changeHandler}
//             />
//           </div>
//           <div className="form-group text-left ">
//             <label className="font-weight-bolder">Email:</label>
//             <input
//               type="email"
//               name="email"
//               value={email}
//               className="form-control"
//               onChange={this.changeHandler}
//             />
//           </div>
//           <div className="form-group text-left">
//             <Link to={{ pathname: `/home` }}>
//               <button
//                 className="btn btn-primary"
//                 type="submit"
//                 onClick={<Redirect to="/home" />}
//               >
//                 Submit
//               </button>
//             </Link>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }
const mapStateToProps = (state) => {
  console.log("state===>", state);
  return {
    userData: state.users,
  };
};

export default connect(mapStateToProps, { fetchUsers, insertUsers })(
  UserContainerForm
);
