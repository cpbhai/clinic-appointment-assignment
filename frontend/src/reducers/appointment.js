import {
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAIL,
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/appointment";

export const appointment = (state = {}, action) => {
  switch (action.type) {
    case CREATE_APPOINTMENT_REQUEST:
    case FETCH_APPOINTMENTS_REQUEST:
      return { loading: true };
    case CREATE_APPOINTMENT_SUCCESS:
      return { loading: false, message: action.payload };
    case CREATE_APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_APPOINTMENTS_SUCCESS:
      return { loading: false, appointments: action.payload };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
