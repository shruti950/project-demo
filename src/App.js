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
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import Sample from "./components/Sample";
import Modal from "react-modal";
Modal.setAppElement("#root");
function App() {
  const persistor = persistStore(store);
  return (
    <div className="App">
      <Provider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
        {/* <UserContainer /> */}
        {/* <UserContainerForm /> */}
      </Provider>
    </div>
  );
}

export default App;
