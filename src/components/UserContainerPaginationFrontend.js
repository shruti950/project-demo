import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUsers, fetchUsers } from "../redux";
// import UserContainerForm from "./UserContainerForm";
// import Autocomplete from "@material-ui/lab/Autocomplete";
// import childComponent from "./UserContainerUpdate";
// import UserContainerUpdate from "./UserContainerUpdate";
// import SearchField from "react-search-field";
// // import SearchBar from "./SearchBar";
// // import SearchPage from "./searchPage";
// import axios from "axios";
import { BrowserRouter as Router, Link, Redirect } from "react-router-dom";
import ReactPaginate from "react-paginate";
class UserContainerPaginationFrontend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      offset: 0,
      data: [],
      perPage: 5,
      pageCount: 0,
    };
  }
  componentDidMount() {
    const { loadingData } = this.props;

    this.props.fetchUsers();
    console.log("userData", this.props.userData);
    this.setState({ users: this.props.userData, offset: 1 });
    console.log(
      "users in component did mount",
      this.state.users,
      this.state.offset
    );
    this.setState({ offset: 1 });
    console.log("offset", this.state.offset);
    // if (loadingData === false) {
    this.getData();
    // }
  }
  componentWillMount() {
    // this.refreshPage();
    const { loadingData } = this.props;
    if (loadingData === false) {
      this.props.fetchUsers();
      console.log("userData", this.props.userData);

      this.setState({ users: this.props.userData, offset: 1 });
      console.log("users in component will mount", this.state.users);
      this.getData();
    }
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log(
      "🚀 ~ file: userContainer.js ~ line 350 ~ UserContainer ~ componentDidUpdate ~ snapShot",
      snapShot
    );
    console.log(
      "🚀 ~ file: userContainer.js ~ line 350 ~ UserContainer ~ componentDidUpdate ~ prevState",
      prevState,
      this.state
    );
    console.log(" this.states @@", this.state);
    console.log(
      "🚀 ~ file: userContainer.js ~ line 346 ~ UserContainer ~ componentDidUpdate ~ this.props",
      prevProps,
      this.props
    );
    // vmn
    if (prevProps.userData !== this.props.userData) {
      //Perform some operation here
      console.log(" this.props.userData @@", this.props.userData);
      this.setState({ users: this.props.userData });
      this.getData();
    }
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    this.setState({ offset: selectedPage + 1 }, () => {
      this.getData();
    });
    // setOffset(selectedPage + 1);
  };
  addUser = async () => {
    this.props.history.push("/adduser");
    // this.refreshPage();
    // <UserContainerPaginationFrontendForm />;
  };
  deleteUserData = async (id, name) => {
    if (window.confirm(`Are you sure you want to Delete ${name}?`)) {
      await deleteUsers(id);
    } else {
      this.props.history.push("/home");
    }
    this.props.fetchUsers();
    // this.refreshPage();
  };
  editUserData = async (id) => {
    console.log("id vaman", id);
    this.props.history.push(`/updateuser/${id}`);
    // this.refreshPage();
  };
  refreshPage = () => {
    window.location.reload();
  };
  getData = async () => {
    const { loadingData } = this.props;
    console.log("loading in getDAta", loadingData);
    // if (loadingData === false) {
    const data = this.props.userData || [];
    console.log("set pagination here.....", data);
    const indexOfLastTodo = this.state.offset * this.state.perPage;
    const indexOfFirstTodo = indexOfLastTodo - this.state.perPage;
    const slice = data.slice(indexOfFirstTodo, indexOfLastTodo);
    console.log(
      "file: userContainerPaginationFrontend.js ~ line 56 ~ getData ~ slice",
      slice
    );
    this.setState({ users: slice });
    // setUsers(slice);
    console.log("users in getData", this.state.users);
    this.setState({ pageCount: Math.ceil(data.length / this.state.perPage) });
    // setPageCount(Math.ceil(data.length / perPage));
    // }
  };
  filterContent = (users, searchTerm) => {
    console.log("searchterm", searchTerm);
    if (searchTerm === "") {
      console.log("searchterm empty");
      this.getData();
    } else {
      const result = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("result", result);
      this.setState({ users: result });
      // this.getData();
    }
  };
  onValueChange = (e) => {
    // console.log(e.currentTarget.value);
    const searchTerm = e.currentTarget.value;
    this.props.fetchUsers();
    // axios.get("http://localhost:9000/").then((response) => {
    console.log(
      "file: userContainerPaginationFrontend.js ~ line 82 ~ getData ~ offset",
      this.state.offset
    );
    if (this.props.userData) {
      console.log("users for search", this.props.userData);
      this.filterContent(this.props.userData, searchTerm);
    }
    // });
  };
  render() {
    return (
      <div className="container App">
        <Router>
          <h2>Users List</h2>
          <div className="container text-right">
            <Link to={{ pathname: `/adduser` }}>
              <button
                onClick={this.addUser}
                className="btn btn-primary btn-md m-1  "
              >
                ADD USER
              </button>
            </Link>
          </div>
          <div className="container mt-mb-10 text-left">
            <div className="w-100 mt-mb-10  justify-content-left ui icon input">
              {/* <SearchPage /> */}
              <span className="icon-input-btn">
                <i className="fa fa-search"></i>
                <input
                  // ref={inputEl}
                  type="search "
                  placeholder="Search Users"
                  className="mt-mb-7 form-control  "
                  // v
                  name="searchTerm"
                  onChange={this.onValueChange}
                />
              </span>
            </div>
          </div>
          <div className=" container  ">
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
                {this.state.users.map((user) => (
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
                          // onClick={<Redirect to="/updateuser/${user._id}" />}
                          onClick={() => this.editUserData(user._id)}
                          className="btn btn-success btn-sm m-1  "
                          // component={Link}
                          // to={`/updateuser/${user._id}`}
                        >
                          UPDATE
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          this.deleteUserData(user._id, user.name);
                        }}
                        className="btn btn-danger btn-sm m-1 "
                      >
                        <i className="fa fa-trash"></i>
                        DELETE
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </Router>
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   console.log("state===>", state.users, state.loading);
//   const { users, loading } = state;
//   // localStorage.setItem("useData", JSON.stringify(users));
//   return {
//     userData: users,
//     loadingData: loading,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     // bindActionCreators({fetchUsers: fetchUsers()}, dispatch);
//     fetchUsers: () => dispatch(fetchUsers()),
//   };
// };
export default connect(
  (state) => (
    console.log("state", state),
    { userData: state.users, loadingData: state.loading }
  ),
  { fetchUsers }
)(UserContainerPaginationFrontend);
