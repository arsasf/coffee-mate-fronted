const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING": //pending = proses sedang dijalankan
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "LOGIN_FULFILLED": //fulfilled = proses yang akan dijalankan ketika berhhasil
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "LOGIN_REJECTED": //proses yang dijalankan ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };

    case "REGISTER_PENDING": //pending = proses sedang dijalankan
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case "REGISTER_FULFILLED": //fulfilled = proses yang akan dijalankan ketika berhhasil
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case "REGISTER_REJECTED": //proses yang dijalankan ketika gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default auth;
