import { combineReducers } from "redux";
import cakeReducer from "./cake/cakeReducer";
import userReducer from "./user/userReducer";
import kycStatusReducer from "./kycStatus/kycStatusReducer";

const reducer = combineReducers({
  cake: cakeReducer,
  user: userReducer,
  kycStatus: kycStatusReducer,
});

export default reducer;
