import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUsers, updateUsers } from "../redux";
import UserContainerForm from "./UserContainerForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory,
  Redirect,
} from "react-router-dom";
import Modal from "react-modal";

// import UserContainerUpdate from "./UserContainerUpdate";
import childComponent from "./UserContainerUpdate";
import UserContainerUpdate from "./UserContainerUpdate";
// import { Modal } from "re";
// const history = useHistory();

function UserContainer({ userData, fetchUsers }, props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState({ name: "", age: "" });
  const { name, age } = user;
  useEffect(() => {
    fetchUsers();
  }, []);
  const history = useHistory();

  return (
    <div>
      <Router>
        <h2>Users List</h2>
        <div className="container text-right">
          <Link to={{ pathname: `/adduser` }}>
            <button
              // onClick={<UserContainerForm />}
              className="btn btn-primary btn-md m-1  "
            >
              ADD USER
            </button>
          </Link>
        </div>
        <div className=" container ">
          <table className="table  table-striped justify-content-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-left">
              {userData.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `/updateuser/${user._id}`,
                      }}
                    >
                      <button
                        onClick={<Redirect to="/updateuser/${user._id}" />}
                        className="btn btn-success btn-sm m-1  "
                        // component={Link}
                        // to={`/updateuser/${user._id}`}
                      >
                        UPDATE
                      </button>
                    </Link>
                    <button className="btn btn-danger btn-sm m-1 ">
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("state", state.users);
  return {
    userData: state.users,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   console.log();
//   return {
//     fetchUsers: () => dispatch(fetchUsers()),
//     updateUsers:()=>dispatch(updateUsers())
//   };
// };
export default connect(mapStateToProps, { fetchUsers, updateUsers })(
  UserContainer
);
// connect(mapStateToProps, { fetchUsers })
