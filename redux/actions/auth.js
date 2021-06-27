import axiosApiIntances from "../../utils/axios";

export const login = (data) => {
  return {
    type: "LOGIN",
    payload: axiosApiIntances.post("auth/login", data),
  };
};

export const register = (data) => {
  return {
    type: "REGISTER",
    payload: axiosApiIntances.post("auth/register", data),
  };
};

export const forgotPassword = (data) => {
  return {
    type: "FORGOT_PASSWORD",
    payload: axiosApiIntances.post("auth/request-otp", data)
  }
}