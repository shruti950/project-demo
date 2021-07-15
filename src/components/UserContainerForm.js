import React, { Component, useState } from "react";
import { connect } from "react-redux";
import {
  useLocation,
  useParams,
  Redirect,
  useHistory,
  Link,
} from "react-router-dom";
import { insertUsers } from "../redux";
import HeaderUser from "./HeaderUser";
import UserContainer from "./UserContainer";
const initialState = {
  name: "",
  age: "",
  email: "",
};
function UserContainerForm() {
  const [user, setUser] = useState(initialState);
  const { name, age, email } = user;
  const { id } = useParams();
  let history = useHistory();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("user==>", user.email);
  };

  const addUser = async (e) => {
    // if (window.confirm(`Are you sure you want to Update ?`))
    // e.preventDefault();
    if (!name || !age || !email) {
      alert("Please add all the details");
    } else {
      await insertUsers(user);
      history.push("/home");
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
  return {
    userData: state.users,
  };
};
export default connect(mapStateToProps, { insertUsers })(UserContainerForm);
