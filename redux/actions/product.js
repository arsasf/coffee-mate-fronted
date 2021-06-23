import axiosApiIntances from "utils/axios";

export const getProductById = (id) => {
  return {
    type: "GET_PRODUCT_BY_ID",
    payload: axiosApiIntances.get(`product/by-id/${id}`)
  }
}