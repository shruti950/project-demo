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
  Redirect,
} from "react-router-dom";
// import UserContainerUpdate from "./components/UserContainerUpdate";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import Sample from "./components/Sample";
import Modal from "react-modal";
// import { useHistory } from "react-router-dom";
import Post from "./components/Post";
import UserContainerUpdate from "./components/UserContainerUpdate";
Modal.setAppElement("#root");
function App() {
  const persistor = persistStore(store);
  // let history = useHistory();
  // const { id } = useParams();
  return (
    <div
      className="App background-red"
      style={{ backgroundColor: "transparent" }}
    >
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
              {/* <Route path="/updateuser/:id" component={Post} /> */}
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
