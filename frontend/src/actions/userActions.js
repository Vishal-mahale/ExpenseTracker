import axios from "axios";
import { toast } from "react-toastify";
import {
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT_FAIL,
  LOG_OUT_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "../constants/userConstants.js";

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/user/login",
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
    toast.success("Login Successful.");
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({
      type: LOGIN_FAIL,
      payload: errorMsg,
    });
    toast.error(errorMsg);
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: "CLEAR_ERRORS" });
};

// Register user
export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "REGISTER_USER_REQUEST" });
  try {
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.post("/api/v1/user/register", user, config);
    dispatch({
      type: "REGISTER_USER_SUCCESS",
      payload: data.user,
    });
    toast.success("Registration Successfull.");
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({
      type: "REGISTER_USER_FAIL",
      payload: errorMsg,
    });
    toast.error(errorMsg);
  }
};

// Load user
export const loadUser = () => async (dispatch) => {
  dispatch({ type: LOAD_USER_REQUEST });
  try {
    const { data } = await axios.get("/api/v1/user/me");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: LOAD_USER_FAIL, payload: errorMsg });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/user/logout");
    dispatch({ type: LOG_OUT_SUCCESS });
    toast.success("Logged out Successfully.");
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({ type: LOG_OUT_FAIL, payload: errorMsg });
    toast.error(errorMsg);
  }
};

export const updateUser = (userData) => async (dispatch) => {
  dispatch({ type: UPDATE_PROFILE_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put("/api/v1/me/update", userData, config);
    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.user,
    });
    toast.success("Profile updated successfully");
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: errorMsg,
    });
    toast.error(errorMsg);
  }
};

export const updatePassword =
  ({ currentPassword, newPassword, confirmPassword }) =>
    async (dispatch) => {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.put(
          "/api/v1/user/password/update",
          { currentPassword, newPassword, confirmPassword },
          config
        );
        dispatch({
          type: UPDATE_PASSWORD_SUCCESS,
          payload: data.user,
        });
        toast.success("Password updated successfully");
      } catch (error) {
        const errorMsg = error.response?.data?.message || error.message;
        dispatch({
          type: UPDATE_PASSWORD_FAIL,
          payload: errorMsg,
        });
        toast.error(errorMsg);
      }
    };

export const forgotPassword = (email) => async (dispatch) => {
  dispatch({ type: FORGOT_PASSWORD_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/user/password/forgot",
      { email },
      config
    );
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    toast.success(data.message);
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: errorMsg,
    });
    toast.error(errorMsg);
  }
};

export const resetPassword =
  (token, { password, confirmPassword }) =>
    async (dispatch) => {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.put(
          `/api/v1/user/password/reset/${token}`,
          { password, confirmPassword },
          config
        );
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: data.message,
        });
        toast.success(data.message);
      } catch (error) {
        const errMsg = error.response?.data?.message || error.message;
        dispatch({
          type: RESET_PASSWORD_FAIL,
          payload: errMsg,
        });
        toast.error(errMsg);
      }
    };
