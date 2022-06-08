import {
  FETCH_KYCSTATUS_REQUEST,
  FETCH_KYCSTATUS_SUCCESS,
  FETCH_KYCSTATUS_FAILURE,
} from "./kycStatusTypes";

const initialState = {
  loading: false,
  kycStatus: {
    lastStep: 0,
    totalSteps: 0,
    percentage: 0,
    status: false,
    slug: "incomplete",
  },
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
