import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import UserContainer from "./components/UserContainer";
import { Provider } from "react-redux";
import store from "./redux/userStore";
import UserContainerForm from "./components/UserContainerForm";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Modal from "react-modal";
import UserContainerUpdate from "./components/UserContainerUpdate";
Modal.setAppElement("#root");
function App() {
  const persistor = persistStore(store);
  return (
    <div
      className="App background-red"
      style={{ backgroundColor: "transparent" }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route path="/home" component={UserContainer} />
              <Route path="/home/:page" component={UserContainer} />
              <Route path="/adduser" component={UserContainerForm} />
              <Route path="/updateuser/:id" component={UserContainerUpdate} />
              <Redirect to="/home" />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
