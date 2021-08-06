import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUsers, fetchAllUsers, fetchSearchedUser } from "../redux";

import { BrowserRouter as Router, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
class UserContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      offset: 1,
      data: [],
      perPage: 5,
      pageCount: 0,
      isLoading: true,
      searchTerm: "",
      pager: {},
    };
  }
  componentDidMount() {
    this.loadPage();
  }
  componentWillMount() {
    this.loadPage();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.userData !== this.props.userData ||
      prevProps.totalPage !== this.props.totalPage
    ) {
      this.setState({
        users: this.props.userData,
        pageCount: this.props.totalPage,
      });
    }
  }

  loadPage = () => {
    const { offset, perPage } = this.state;
    const { totalPage, fetchAllUsers } = this.props;
    fetchAllUsers(offset, perPage);
    this.setState({ users: this.props.userData, pageCount: totalPage });
  };
  searchPage = (searchTerm, selectedPage) => {
    this.props.fetchSearchedUser(searchTerm, selectedPage);

    this.setState({
      users: this.props.userData,
      pageCount: this.props.totalPage,
    });
  };
  handlePageClick = async (e) => {
    const selectedPage = e.selected;
    const { searchTerm, perPage } = this.state;
    if (searchTerm === "") {
      this.props.fetchAllUsers(selectedPage, perPage);
      this.setState({ offset: selectedPage + 1 }, () => {
        this.loadPage();
      });
    } else {
      this.props.fetchSearchedUser(searchTerm, selectedPage);
      this.setState({ offset: selectedPage + 1 }, () => {
        this.searchPage(searchTerm, this.state.offset);
      });
    }
  };
  addUser = async () => {
    this.props.history.push("/adduser");
  };
  deleteUserData = async (id, name) => {
    const { offset, perPage } = this.state;
    if (window.confirm(`Are you sure you want to Delete ${name}?`)) {
      this.props.deleteUsers(id);
    } else {
      this.props.history.push("/home");
    }
    if (this.props.userData.length === 1) {
      this.props.fetchAllUsers(1, perPage);
      this.setState({ offset: 1 });
    } else {
      this.props.fetchAllUsers(offset, perPage);
    }
  };
  editUserData = async (id) => {
    this.props.history.push(`/updateuser/${id}`);
  };
  refreshPage = () => {
    window.location.reload();
  };

  filterContent = (users, searchTerm) => {
    if (searchTerm === "") {
      this.loadPage();
    } else {
      const result = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.setState({ users: result });
    }
  };
  onValueChange = (e) => {
    const searchTerm = e.currentTarget.value;
    this.setState({ searchTerm: searchTerm });

    if (searchTerm === "") {
      // this.refreshPage();
      this.loadPage();
      // this.getData();
    } else {
      this.searchPage(searchTerm, this.state.offset);
    }
  };
  render() {
    const { users } = this.state;
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
                {users?.length > 0 &&
                  users?.map((user) => (
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
                            onClick={() => this.editUserData(user._id)}
                            className="btn btn-success btn-sm m-1  "
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
              forcePage={this.state.offset - 1}
            />
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: (page, limit) => dispatch(fetchAllUsers(page, limit)),
    fetchSearchedUser: (searchTerm, offset) =>
      dispatch(fetchSearchedUser(searchTerm, offset)),
    deleteUsers: (id) => dispatch(deleteUsers(id)),
  };
};
export default connect(
  (state) => ({
    userData: state.users,
    loadingData: state.loading,
    totalPage: state.page,
  }),
  mapDispatchToProps
)(UserContainer);
