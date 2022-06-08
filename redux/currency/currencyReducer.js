import {
  FETCH_OPERATIONCURRENCIES_REQUEST,
  FETCH_OPERATIONCURRENCIES_SUCCESS,
  FETCH_OPERATIONCURRENCIES_FAILURE,
  SET_GLOBAL_CURRENCY,
} from "./currencyTypes";

const initialState = {
  loading: false,
  currencyOptions: [{}],
  globalCurrency: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OPERATIONCURRENCIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_OPERATIONCURRENCIES_SUCCESS:
      return {
        loading: false,
        currencyOptions: action.payload,
        globalCurrency: action.payload[0].value,
        error: "",
      };
    case FETCH_OPERATIONCURRENCIES_FAILURE:
      return {
        loading: false,
        currencyOptions: [{}],
        error: action.payload,
      };
    case SET_GLOBAL_CURRENCY:
      return {
        loading: false,
        currencyOptions: state.currencyOptions,
        globalCurrency: action.payload,
        error: "",
      };
    default:
      return state;
  }
};

export default reducer;
