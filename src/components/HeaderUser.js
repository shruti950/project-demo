import React from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import UserContainer from "./UserContainer";
function HeaderUser(props) {
  let history = useHistory();
  const toHome = () => {
    // <UserContainer />;
    history.push("/home");
  };
  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark  ">
      {/* <Link to={{ pathname: `/home` }}> */}
      {/* <button className="navbar-nav" onClick={<UserContainer />}> */}
      <ul className="navbar-nav">
        <li className="nav-item">
          {/* <button
            onClick={toHome()}
            className="btn btn-outline-primary text-left"
          >
            HOME
          </button> */}
          <a className="nav-link text-left" href="http://localhost:3000/home">
            / Home
          </a>
        </li>
      </ul>

      {/* </button> */}
      {/* </Link> */}
    </nav>
  );
}

export default HeaderUser;
