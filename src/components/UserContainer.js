import React, { Component, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { deleteUsers, fetchUsers, updateUsers } from "../redux";
import UserContainerForm from "./UserContainerForm";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import UsePagination from "./usePagination";
import { usePagination } from "@material-ui/lab";
import ReactPaginate from "react-paginate";
function UserContainer({ userData, fetchUsers }, props) {
  const [users, setUsers] = useState([]);
  // const [user, setUser] = useState([]);
  const inputEl = useRef("");
  const [postsPerPage] = useState(4);
  const [offset, setOffset] = useState(1);
  const [posts, setAllPosts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // const { name, age, email } = user;
  useEffect(() => {
    fetchUsers();
    setUsers(userData);
    getAllPosts();
  }, [offset]);
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

  const addUser = async () => {
    history.push("/adduser");
    // <UserContainerForm />;
  };

  const filterContent = (users, searchTerm) => {
    const result = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("result", result);
    setUsers(result);
  };
  const onValueChange = (e) => {
    const searchTerm = e.currentTarget.value;
    fetchUsers();
    if (userData) {
      console.log("users for search", userData);
      filterContent(userData, searchTerm);
    }
  };
  const getPostData = (data) => {
    return (
      <div>
        <Router>
          <div className="container text-right">
            <Link to={{ pathname: `/adduser` }}>
              <button
                onClick={addUser}
                className="btn btn-primary btn-md m-1  "
              >
                ADD USER
              </button>
            </Link>
          </div>
          <div className="container mb-10 text-left">
            <div className="w-75 mb-10  justify-content-left ui icon input">
              {/* <SearchPage /> */}
              <input
                // ref={inputEl}
                type="search "
                placeholder="Search Users"
                className="mb-7 form-control  "
                // v
                name="searchTerm"
                onChange={onValueChange}
              />
            </div>
          </div>

          <div className=" container ">
            <table className="table mt-5 table-striped justify-content-center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-left">
                {data.map((user) => (
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
  };
  const getAllPosts = async () => {
    fetchUsers();
    const data = userData;
    console.log("dtaa in get all post", data);
    const slice = data.slice(offset - 1, offset - 1 + postsPerPage);
    console.log(
      "🚀 ~ file: userContainer.js ~ line 73 ~ getAllPosts ~ slice ",
      slice
    );

    // For displaying Data
    const postData = getPostData(slice);

    // Using Hooks to set value
    setAllPosts(postData);
    setPageCount(Math.ceil(data.length / postsPerPage));
  };
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };
  return (
    <div>
      <Router>
        <h2>Users List</h2>
        {/* <div>
          {users.length > 0 ? (
            <Pagination
              data={users}
              RenderComponent={userData.map((user) => (
                <p key={user._id}>
                  {user.name}
                  {user.age}
                  {user.email}
                </p>
              ))}
              title="Posts"
              pageLimit={5}
              dataLimit={10}
            />
          ) : (
            <h1>No Posts to display</h1>
          )}
        </div> */}
        <div className="container text-right">
          {posts}

          {/* Using React Paginate */}
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={" next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
          <Link to={{ pathname: `/adduser` }}>
            {/* <button onClick={addUser} className="btn btn-primary btn-md m-1  ">
              ADD USER
            </button> */}
          </Link>
        </div>
        <div className="container mb-10 text-left">
          <div className="w-75 mb-10  justify-content-left ui icon input">
            {/* <SearchPage /> */}
            {/* <input
              // ref={inputEl}
              type="search "
              placeholder="Search Users"
              className="mb-7 form-control  "
              // v
              name="searchTerm"
              onChange={onValueChange}
            /> */}
          </div>
        </div>

        <div className=" container ">
          {/* <table className="table mt-5 table-striped justify-content-center">
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
          </table> */}
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
