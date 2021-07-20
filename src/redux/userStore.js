import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./users/userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const config = {
  key: "root",
  storage: storage,
  blacklist: ["navigation"],
  //   transforms: [TransformCredentials],
};
const persisted = persistReducer(config, reducer);

const store = createStore(persisted, applyMiddleware(logger, thunk));

export default store;
