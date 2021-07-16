import React, { Component, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { deleteUsers, fetchUsers, updateUsers } from "../redux";
import UserContainerForm from "./UserContainerForm";
import Autocomplete from "@material-ui/lab/Autocomplete";
import childComponent from "./UserContainerUpdate";
import UserContainerUpdate from "./UserContainerUpdate";
import SearchField from "react-search-field";
// import SearchBar from "./SearchBar";
// import SearchPage from "./searchPage";
import axios from "axios";
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import ReactPaginate from "react-paginate";
function UserContainer({ userData, fetchUsers }, props) {
  const [users, setUsers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);
  // const [user, setUser] = useState([]);
  const inputEl = useRef("");
  // const { name, age, email } = user;
  const history = useHistory();
  useEffect(() => {
    // getAllUsers();
    getData();
    fetchUsers();
    setUsers(userData);
  }, []);
  // useEffect(() => {
  //   fetchUsers();
  // });
  useEffect(() => {
    getData();
    console.log(
      "file: userContainer.js ~ line 43~ useEffect ~ getData();",
      getData()
    );
    console.log("users 33 userData", users, userData);
  }, [offset]);
  console.log("userData", userData);
  // const slice=userData.slice()
  const deleteUserData = async (id, name) => {
    if (window.confirm(`Are you sure you want to Delete ${name}?`)) {
      await deleteUsers(id);
    } else {
      history.push("/home");
    }

    // await deleteUsers(id);
    fetchUsers();
  };
  const getData = async () => {
    const res = await axios.get(`http://localhost:9000/`);
    const data = res.data;
    setUsers(data);
    console.log(
      "file: userContainer.js ~ line 54 ~ getData ~ data ",
      data,
      offset
    );
    const indexOfLastTodo = offset * perPage;
    const indexOfFirstTodo = indexOfLastTodo - perPage;
    const slice = data.slice(indexOfFirstTodo, indexOfLastTodo);
    console.log("file: userContainer.js ~ line 56 ~ getData ~ slice", slice);

    setUsers(slice);

    setPageCount(Math.ceil(data.length / perPage));
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
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
    // console.log(e.currentTarget.value);
    const searchTerm = e.currentTarget.value;
    fetchUsers();
    // axios.get("http://localhost:9000/").then((response) => {
    console.log("file: userContainer.js ~ line 82 ~ getData ~ offset", offset);
    if (userData) {
      console.log("users for search", userData);
      filterContent(userData, searchTerm);
    }
    // });
  };
  const getAllUsers = async () => {
    fetchUsers();
    setUsers(userData);
    console.log("users 97", data);
  };

  return (
    <div>
      <Router>
        <h2>Users List</h2>
        <div className="container text-right">
          <Link to={{ pathname: `/adduser` }}>
            <button onClick={addUser} className="btn btn-primary btn-md m-1  ">
              ADD USER
            </button>
          </Link>
        </div>
        <div className="container mt-mb-10 text-left">
          <div className="w-100 mt-mb-10  justify-content-left ui icon input">
            {/* <SearchPage /> */}
            <input
              // ref={inputEl}
              type="search "
              placeholder="Search Users"
              className="mt-mb-7 form-control  "
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
              {users.map((user) => (
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
          {data}
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </Router>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log("state===>", state);
  return {
    userData: state.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  console.log();
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
// connect(mapStateToProps, { fetchUsers }
// connect(mapStateToProps, { fetchUsers })
// import React, { Component, useEffect, useState, useRef } from "react";
// import { connect } from "react-redux";
// import { deleteUsers, fetchUsers, updateUsers } from "../redux";
// import UserContainerForm from "./UserContainerForm";
// import {
//   BrowserRouter as Router,
//   Link,
//   useHistory,
//   Redirect,
// } from "react-router-dom";
// import UsePagination from "./usePagination";
// import { usePagination } from "@material-ui/lab";
// import ReactPaginate from "react-paginate";
// function UserContainer({ userData, fetchUsers }, props) {
//   const [users, setUsers] = useState([]);
//   // const [user, setUser] = useState([]);
//   const inputEl = useRef("");
//   const [postsPerPage] = useState(4);
//   const [offset, setOffset] = useState(0);
//   const [posts, setAllPosts] = useState([]);
//   const [pageCount, setPageCount] = useState(0);
//   // const { name, age, email } = user;
//   useEffect(() => {
//     fetchUsers();
//     setAllPosts(userData);
//     console.log("users======> in useeffect ", posts, userData);
//   }, []);
//   // useEffect(() => {
//   //   getAllPosts();
//   // }, [offset]);
//   const history = useHistory();
//   const deleteUserData = async (id, name) => {
//     if (window.confirm(`Are you sure you want to Delete ${name}?`)) {
//       await deleteUsers(id);
//     } else {
//       history.push("/home");
//     }

//     // await deleteUsers(id);
//     fetchUsers();
//   };

//   const addUser = async () => {
//     history.push("/adduser");
//     // <UserContainerForm />;
//   };

//   const filterContent = (users, searchTerm) => {
//     const result = users.filter((user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     console.log("result", result);
//     setUsers(result);
//   };
//   const onValueChange = (e) => {
//     const searchTerm = e.currentTarget.value;
//     fetchUsers();
//     if (userData) {
//       console.log("users for search", userData);
//       filterContent(userData, searchTerm);
//     }
//   };
//   const getPostData = (data) => {
//     return (
//       <div>
//         <Router>
//           <div className="container text-right">
//             <Link to={{ pathname: `/adduser` }}>
//               <button
//                 onClick={addUser}
//                 className="btn btn-primary btn-md m-1  "
//               >
//                 ADD USER
//               </button>
//             </Link>
//           </div>
//           <div className="container mb-10 text-left">
//             <div className="w-75 mb-10  justify-content-left ui icon input">
//               {/* <SearchPage /> */}
//               <input
//                 // ref={inputEl}
//                 type="search "
//                 placeholder="Search Users"
//                 className="mb-7 form-control  "
//                 // v
//                 name="searchTerm"
//                 onChange={onValueChange}
//               />
//             </div>
//           </div>

//           <div className=" container ">
//             <table className="table mt-5 table-striped justify-content-center">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Age</th>
//                   <th>Email</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody className="text-left">
//                 {data.map((user) => (
//                   <tr key={user._id}>
//                     <td>{user.name}</td>
//                     <td>{user.age}</td>
//                     <td>{user.email}</td>
//                     <td>
//                       <Link
//                         to={{
//                           pathname: `/updateuser/${user._id}`,
//                         }}
//                       >
//                         <button
//                           onClick={<Redirect to="/updateuser/${user._id}" />}
//                           className="btn btn-success btn-sm m-1  "
//                           // component={Link}
//                           // to={`/updateuser/${user._id}`}
//                         >
//                           UPDATE
//                         </button>
//                       </Link>

//                       <button
//                         onClick={() => {
//                           deleteUserData(user._id, user.name);
//                         }}
//                         className="btn btn-danger btn-sm m-1 "
//                       >
//                         DELETE
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Router>
//       </div>
//     );
//   };
//   const getAllPosts = async () => {
//     fetchUsers();
//     const data = userData;
//     // setUsers(userData);
//     console.log("dtaa in get all post", data);
//     const slice = users.slice(offset, offset + postsPerPage);
//     console.log(
//       "🚀 ~ file: userContainer.js ~ line 73 ~ getAllPosts ~ slice ",
//       slice
//     );

//     // For displaying Data
//     const postData = getPostData(slice);
//     console.log(
//       "🚀 ~ file: userContainer.js ~ line 151 ~ getAllPosts ~ postData",
//       postData
//     );
//     // console.log(
//     //   "🚀 ~ file: userContainer.js ~ line 152 ~ data.length",
//     //   data.length
//     // );

//     // Using Hooks to set value
//     setAllPosts(postData);
//     // setUsers(slice);
//     setPageCount(Math.ceil(data.length / postsPerPage));
//   };
//   const handlePageClick = (event) => {
//     const selectedPage = event.selected;
//     console.log(
//       "file: userContainer.js ~ line 166 ~ handlePageClick ~ selectedPage ",
//       selectedPage
//     );
//     setOffset(selectedPage + 1);
//   };
//   return (
//     <div>
//       <Router>
//         <h2>Users List</h2>
//         <div className="container text-right">
//           {posts}

//           {/* Using React Paginate */}
//           <ReactPaginate
//             previousLabel={"previous"}
//             nextLabel={" next"}
//             breakLabel={"..."}
//             breakClassName={"break-me"}
//             pageCount={pageCount}
//             onPageChange={handlePageClick}
//             containerClassName={"pagination"}
//             subContainerClassName={"pages pagination"}
//             activeClassName={"active"}
//           />
//           <Link to={{ pathname: `/adduser` }}>
//             <button onClick={addUser} className="btn btn-primary btn-md m-1  ">
//               ADD USER
//             </button>
//           </Link>
//         </div>
//         <div className="container mb-10 text-left">
//           <div className="w-75 mb-10  justify-content-left ui icon input">
//             {/* <SearchPage /> */}
//             <input
//               // ref={inputEl}
//               type="search "
//               placeholder="Search Users"
//               className="mb-7 form-control  "
//               // v
//               name="searchTerm"
//               onChange={onValueChange}
//             />
//           </div>
//         </div>

//         <div className=" container ">
//           <table className="table mt-5 table-striped justify-content-center">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Age</th>
//                 <th>Email</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-left">
//               {users.map((user) => (
//                 <tr key={user._id}>
//                   <td>{user.name}</td>
//                   <td>{user.age}</td>
//                   <td>{user.email}</td>
//                   <td>
//                     <Link
//                       to={{
//                         pathname: `/updateuser/${user._id}`,
//                       }}
//                     >
//                       <button
//                         onClick={<Redirect to="/updateuser/${user._id}" />}
//                         className="btn btn-success btn-sm m-1  "
//                         // component={Link}
//                         // to={`/updateuser/${user._id}`}
//                       >
//                         UPDATE
//                       </button>
//                     </Link>

//                     <button
//                       onClick={() => {
//                         deleteUserData(user._id, user.name);
//                       }}
//                       className="btn btn-danger btn-sm m-1 "
//                     >
//                       DELETE
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Router>
//     </div>
//   );
// }

// const mapStateToProps = (state) => {
//   console.log("state", state.users);
//   return {
//     userData: state.users,
//   };
// };
// // const mapDispatchToProps = (dispatch) => {
// //   console.log();
// //   return {
// //     fetchUsers: () => dispatch(fetchUsers()),
// //     updateUsers:()=>dispatch(updateUsers())
// //   };
// // };
// export default connect(mapStateToProps, { fetchUsers, updateUsers })(
//   UserContainer
// );
// // connect(mapStateToProps, { fetchUsers })
