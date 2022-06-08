import { combineReducers } from "redux";
import cakeReducer from "./cake/cakeReducer";
import userReducer from "./user/userReducer";
import kycStatusReducer from "./kycStatus/kycStatusReducer";
import currencyReducer from "./currency/currencyReducer";

const reducer = combineReducers({
  // cake: cakeReducer,
  user: userReducer,
  kycStatus: kycStatusReducer,
  currency: currencyReducer,
});

export default reducer;
