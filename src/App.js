import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";

// import "bootstrap/dist/css/bootstrap-responsive.css";
import UserContainer from "./components/UserContainer";
import { Provider } from "react-redux";
import store from "./redux/userStore";
import UserContainerForm from "./components/UserContainerForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";
import UserContainerUpdate from "./components/UserContainerUpdate";
// import Sample from "./components/Sample";
import Modal from "react-modal";
Modal.setAppElement("#root");
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          {/* <Header /> */}
          <Switch>
            <Route path="/home" component={UserContainer} />
            <Route path="/home/:page" component={UserContainer} />
            <Route path="/adduser" component={UserContainerForm} />
            <Route path="/updateuser/:id" component={UserContainerUpdate} />
            <Redirect to="/home" />
          </Switch>
        </Router>

        {/* <UserContainer /> */}
        {/* <UserContainerForm /> */}
      </Provider>
    </div>
  );
}

export default App;
