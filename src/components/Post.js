import React from "react";
import { useParams } from "react-router-dom";
import UserContainerUpdate from "./UserContainerUpdate";

function Post() {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <UserContainerUpdate id={id} />
    </div>
  );
}
// export default UserContainerForm;
// class UserContainerForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: {
//         name: "",
//         age: "",
//         email: "",
//       },
//       users: [],
//     };
//   }
//   // changeHandler = (e) => {
//   //   this.setState({ [e.target.name]: e.target.value });
//   // };
//   onChangeName = (e) => {
//     const name = e.target.value;
//     this.setState((prevState) => ({
//       user: { ...prevState.user, name: name },
//     }));
//     console.log("user==>", this.state.user);
//   };
//   onChangeAge = (e) => {
//     const age = e.target.value;
//     this.setState((prevState) => ({
//       user: { ...prevState.user, age: age },
//     }));
//     console.log("user==>", this.state.user);
//   };
//   onChangeEmail = (e) => {
//     const email = e.target.value;
//     this.setState((prevState) => ({
//       user: { ...prevState.user, email: email },
//     }));
//     console.log("user==>", this.state.user);
//     submitHandler = (e) => {
//       e.preventDefault();
//       console.log(this.state.user);
//       this.props.insertUsers(this.state.user);
//     };
//     addUser = async (e) => {
//       const { users } = this.state;
//       const { name, age, email } = this.state.user;
//       if (!name || !age || !email) {
//         alert("Please add all the details");
//       } else {
//         fetchUsers();
//         console.log(
//           "file: UserContainerForm.js ~ line 45 ~ addUser ~ userData",
//           userData
//         );
//         setUsers(userData);
//         console.log("users in add", users);
//         const existEmail = users.filter((existingEmail) => {
//           console.log(email == existingEmail.email, typeof existingEmail.email);
//           if (email === existingEmail.email) {
//             return true;
//           }
//         });
//         const map = existEmail.map((item) => {
//           if (item.email === email) {
//             return true;
//           } else {
//             return false;
//           }
//         });
//         console.log("map function ", map);
//         if (map.includes(true)) {
//           alert("Email already Exists");
//         } else {
//           await insertUsers(user);
//           history.push("/home");
//           history.push("/home");
//         }
//         //
//       }
//     };

//     render();
//     {
//       const { name, age, email } = this.state;
//       return (
//         <div className="container ">
//           <HeaderUser />
//           <form onSubmit={this.submitHandler}>
//             <div className="form-group text-left">
//               <label>Name:</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={name}
//                 className="form-control"
//                 onChange={this.onChangeName}
//               />
//             </div>
//             <div className="form-group text-left ">
//               <label className="font-weight-bolder">Age:</label>
//               <input
//                 type="text"
//                 name="age"
//                 value={age}
//                 className="form-control"
//                 onChange={this.onChangeAge}
//               />
//             </div>
//             <div className="form-group text-left ">
//               <label className="font-weight-bolder">Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={email}
//                 className="form-control"
//                 onChange={this.onChangeEmail}
//               />
//             </div>
//             <div className="form-group text-left">
//               <Link to={{ pathname: `/home` }}>
//                 <button
//                   className="btn btn-primary"
//                   type="submit"
//                   onClick={this.addUser()}
//                 >
//                   Submit
//                 </button>
//               </Link>
//             </div>
//           </form>
//         </div>
//       );
//     }
//   };
// }
export default Post;
