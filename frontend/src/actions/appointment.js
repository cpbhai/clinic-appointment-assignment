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
export const createAppointment = (body, user) => async (dispatch) => {
  dispatch({ type: CREATE_APPOINTMENT_REQUEST });
  const token = cookie.load("token");
  // debugger;
  try {
    const meetingData = await axios({
      method: "post",
      url: `https://api.daily.co/v1/rooms`,
      headers: {
        Authorization:
          "Bearer b0662a29a0518b535ea7f8aaee35a19faac0b9eb00c9c055f38355b6c7a485bb",
        "Content-Type": "application/json",
      },
      // data: body,
    });
    body.meetingData = meetingData.data;

    const response = await axios({
      method: "post",
      url: `${BASE_URL}appointment/create`,
      headers: {
        "x-access-token": token,
      },
      data: body,
    });
    const { data } = response;

    //mail
    axios({
      method: "post",
      url: `${BASE_URL}send-email-meeting`,
      data: {
        to: [user.email, body.email],
        user: user.fullName,
        meetingData: meetingData.data,
      },
    });
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
