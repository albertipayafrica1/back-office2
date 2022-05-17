import {
  FETCH_KYCSTATUS_REQUEST,
  FETCH_KYCSTATUS_SUCCESS,
  FETCH_KYCSTATUS_FAILURE,
} from "./kycStatusTypes";

const initialState = {
  loading: false,
  kycStatus: {},
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_KYCSTATUS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_KYCSTATUS_SUCCESS:
      return {
        loading: false,
        kycStatus: action.payload,
        error: "",
      };
    case FETCH_KYCSTATUS_FAILURE:
      return {
        loading: false,
        kycStatus: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
