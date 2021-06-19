import axios from "axios";
import Cookie from "js-cookie";

// For setting a token before execute endpoint
let dataToken = "";
const setToken = (token) => {
  dataToken = token;
};

const axiosApiInstances = axios.create({
  baseURL: process.env.API_BASE_URL,
});

// Add a request interceptor
axiosApiInstances.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // set bagian headers
    config.headers = {
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
      // Authorization: `Bearer ${Cookie.get("token")}`,
      Authorization: `Bearer ${dataToken}`,
    };

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApiInstances.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 403) {
      alert("Please login first!");
      Cookie.remove("token");
      Cookie.remove("user");
      setToken("");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default { axiosApiInstances, setToken };
