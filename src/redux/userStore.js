import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducer from "./users/userReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

const config = {
  key: "root",
  storage: storage,
  blacklist: ["navigation"],
  //   transforms: [TransformCredentials],
};
const persisted = persistReducer(config, reducer);
const composerEnhancer = composeWithDevTools({
  name: `Redux`,
  realtime: true,
  trace: true,
  traceLimit: 25,
});
const store = createStore(persisted, composerEnhancer(applyMiddleware(thunk)));

export default store;
