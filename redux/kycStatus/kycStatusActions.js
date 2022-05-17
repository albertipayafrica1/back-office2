import {
  FETCH_KYCSTATUS_REQUEST,
  FETCH_KYCSTATUS_SUCCESS,
  FETCH_KYCSTATUS_FAILURE,
} from "./kycStatusTypes";

export const fetchKycStatusRequest = () => {
  return {
    type: FETCH_KYCSTATUS_REQUEST,
  };
};

export const fetchKycStatusSuccess = (kycStatus) => {
  return {
    type: FETCH_KYCSTATUS_SUCCESS,
    payload: kycStatus,
  };
};

export const fetchKycStatusFailure = (error) => {
  return {
    type: FETCH_KYCSTATUS_FAILURE,
    payload: error,
  };
};
