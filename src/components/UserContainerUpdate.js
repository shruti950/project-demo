import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser, updateUsers } from "../redux";
// import React from 'react'
import { useLocation, useParams, Redirect } from "react-router-dom";
// const location = useLocation();
const initialState = {
  id: "",
  name: "",
  age: "",
};
function UserContainerUpdate({ userData, fetchUser }, props) {
  const [usera, setUser] = useState(initialState);
  const { name, age } = usera;
  const { id } = useParams();
  console.log(
    "params DAta",
    useParams(),
    userData,
    userData.name,
    userData.age
  );
  useEffect(() => {
    fetchUser(id);
  }, []);

  // fetchUser = async () => {
  //   // const response = await getUsers(id);
  //   setUser(userData);
  // };

  // const history = useHistory();
  console.log("params DAta", useParams(), userData.name, userData.age);
  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...usera, [e.target.name]: e.target.value });
  };
  const onSubmitData = (e) => {
    // e.preventDefault();
    updateUsers(id, name, age);
    console.log("update state", id, name, age);
  };
  console.log("update state", id, name, age);

  console.log("user======>", usera);
  return (
    <div className="container ">
      {userData.map((user) => {
        console.log("map user ==========>", user);
        return (
          <p key={user._id}>
            <form onSubmit={onSubmitData}>
              <div className="form-group text-left">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  defaultValue={user.name}
                  value={usera.name}
                  onChange={setUser}
                />
              </div>
              <div className="form-group text-left">
                <label>Age:</label>
                <input
                  type="text"
                  name="age"
                  className="form-control"
                  value={age}
                  onChange={
                    ((e) => {
                      console.log(e.target.value);
                      setUser({ age: e.target.value });
                    }) && <Redirect to="/home" />
                  }
                />
              </div>
              <button
                className="btn btn-primary"
                // onClick={() => setModalIsOpen(false)}
                type="submit"
              >
                Update
              </button>
            </form>
          </p>
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
//       <div>
//         <form>
//           <div className="form-group">
//             <label>Name:</label>
//             <input
//               type="text"
//               name="name"
//               class="form-control"
//               // defaultValue={user.name}
//               // value={name}
//               // onChange={(e) =>
//               //   setUser({
//               //     name: e.target.value,
//               //   })
//               // }
//             />
//           </div>
//           <div className="form-group">
//             <label for="text">Age:</label>
//             <input
//               type="text"
//               name="age"
//               class="form-control"
//               // defaultValue={user.age}
//               // value={age}
//               // onChange={(e) =>
//               //   setUser({
//               //     age: e.target.value,
//               //   })
//               // }
//             />
//           </div>
//           <button
//             className="btn btn-primary"
//             // onClick={() => setModalIsOpen(false) && <Redirect to="/home" />}
//             type="submit"
//           >
//             Update
//           </button>
//         </form>
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
