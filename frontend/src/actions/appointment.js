import cookie from "react-cookies";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import {
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAIL,
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/appointment";

//create appointment
export const createAppointment = (body) => async (dispatch) => {
  dispatch({ type: CREATE_APPOINTMENT_REQUEST });
  const token = cookie.load("token");
  try {
    const response = await axios({
      method: "post",
      url: `${BASE_URL}appointment/create`,
      headers: {
        "x-access-token": token,
      },
      data: body,
    });
    const { data } = response;
    dispatch({
      type: CREATE_APPOINTMENT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: CREATE_APPOINTMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
//fetch appointments
export const fetchAppointments = () => async (dispatch) => {
  dispatch({ type: FETCH_APPOINTMENTS_REQUEST });
  const token = cookie.load("token");
  try {
    const response = await axios({
      method: "get",
      url: `${BASE_URL}appointment/get`,
      headers: {
        "x-access-token": token,
      },
    });
    const { data } = response;
    dispatch({
      type: FETCH_APPOINTMENTS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_APPOINTMENTS_SUCCESS,
      payload: [],
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
