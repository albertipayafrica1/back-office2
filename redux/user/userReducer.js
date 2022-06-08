import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
} from "./userTypes";

const initialState = {
  loading: false,
  user: {
    firstName: "",
    middleName: "",
    surname: "",
    phoneNumber: "",
    email: "",
    countryIso: "",
    vid: "",
    businessName: "",
    role: "",
    permissions: [{}],
  },
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        error: "",
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
