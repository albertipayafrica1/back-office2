import {
  FETCH_OPERATIONCURRENCIES_REQUEST,
  FETCH_OPERATIONCURRENCIES_SUCCESS,
  FETCH_OPERATIONCURRENCIES_FAILURE,
  SET_GLOBAL_CURRENCY,
} from "./currencyTypes";

export const fetchOperationCurrenciesRequest = () => {
  return {
    type: FETCH_OPERATIONCURRENCIES_REQUEST,
  };
};

export const fetchOperationCurrenciesSuccess = (operationCurrencies) => {
  return {
    type: FETCH_OPERATIONCURRENCIES_SUCCESS,
    payload: operationCurrencies,
  };
};

export const fetchOperationCurrenciesFailure = (error) => {
  return {
    type: FETCH_OPERATIONCURRENCIES_FAILURE,
    payload: error,
  };
};

export const setGlobalCurrency = (currency) => {
  return {
    type: SET_GLOBAL_CURRENCY,
    payload: currency,
  };
};
