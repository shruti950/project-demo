import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteUsers, fetchUsers, updateUsers } from "../redux";
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
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import UserContainerUpdate from "./UserContainerUpdate";
import childComponent from "./UserContainerUpdate";
import UserContainerUpdate from "./UserContainerUpdate";
import SearchField from "react-search-field";
// import { Modal } from "re";
// const history = useHistory();

function UserContainer({ userData, fetchUsers }, props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ name: "", age: "" });
  const { name, age, email } = user;
  useEffect(() => {
    fetchUsers();
    setUsers(userData);
  }, []);
  const history = useHistory();
  const deleteUserData = async (id, name) => {
    if (window.confirm(`Are you sure you want to Delete ${name}?`)) {
      await deleteUsers(id);
    } else {
      history.push("/home");
    }

    // await deleteUsers(id);
    fetchUsers();
  };
  const onSubmitDelete = (id) => {
    deleteUsers(id);
  };
  const addUser = async () => {
    history.push("/adduser");
    // <UserContainerForm />;
  };
  const updateUser = async () => {
    <Redirect to="/updateuser/${user._id}" />;
    history.push("/adduser");
    // <UserContainerForm />;
  };
  const getDataFromAPI = () => {
    console.log("Options Fetched from API");

    // });
  };

  return (
    <div>
      <Router>
        <h2>Users List</h2>
        <div className="searchForm">
          <form>
            <input
              type="text"
              id="filter"
              placeholder="Search for..."
              ref={(input) => (this.search = input)}
              onChange={this.handleInputChange}
            />
          </form>
          <div>
            {userData.map((i) => (
              <p>{i.name}</p>
            ))}
          </div>
        </div>
        <div className="container text-right">
          <Link to={{ pathname: `/adduser` }}>
            <button onClick={addUser} className="btn btn-primary btn-md m-1  ">
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
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-left">
              {userData.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.email}</td>
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

                    <button
                      onClick={() => {
                        deleteUserData(user._id, user.name);
                      }}
                      className="btn btn-danger btn-sm m-1 "
                    >
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
