import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";
import UserContainer from "./UserContainer";
function HeaderUser(props) {
  return (
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark  ">
      {/* <Link to={{ pathname: `/home` }}> */}
      {/* <button className="navbar-nav" onClick={<UserContainer />}> */}
      <ul class="navbar-nav">
        <li class="nav-item">
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
