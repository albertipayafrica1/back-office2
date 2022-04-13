import { createStore, applyMiddleware } from "redux";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "./syncStorage";
import reducers from "./rootReducer";
// import counter from "./counter/reducer";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return reducers(state, action);
};

// export const initStore = () => {
//   return createStore(persistedReducer, bindMiddleware([thunkMiddleware]));
// };

const makeStore = ({ isServer }) => {
  if (isServer) {
    // If it's on server side, create a store
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
  }
  // If it's on client side, create a store which will persist

  const persistConfig = {
    key: "root",
    // whitelist: ["counter"], // only counter will be persisted, add other reducers if needed
    storage, // if needed, use a safer storage
  };

  const persistedReducer = persistReducer(persistConfig, reducer); // Create a new reducer with our existing reducer

  const store = createStore(
    persistedReducer,
    bindMiddleware([thunkMiddleware])
  ); // Creating the store again

  store.persistor = persistStore(store); // This creates a persistor object & push that persisted object to .persistor, so that we can avail the persistability feature

  return store;
};

export const wrapper = createWrapper(makeStore);
