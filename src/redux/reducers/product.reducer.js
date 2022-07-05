import { FAIL, REQUEST, SUCCESS, PRODUCT_ACTION } from "../constants";

const initialState = {
  products: [],
  productDetails: {},
  filter: {},
  loading: false,
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case REQUEST(PRODUCT_ACTION.GET_ALL_PRODUCT):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(PRODUCT_ACTION.GET_ALL_PRODUCT):
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case FAIL(PRODUCT_ACTION.GET_ALL_PRODUCT):
      return {
        ...state,
        userInfo: {},
        loading: false,
      };
    // Get detail
    case REQUEST(PRODUCT_ACTION.GET_PRODUCT_INFO):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(PRODUCT_ACTION.GET_PRODUCT_INFO):
      return {
        ...state,
        productDetails: payload.data,
        loading: false,
      };
    case FAIL(PRODUCT_ACTION.GET_PRODUCT_INFO):
      return {
        ...state,
        userInfo: {},
        loading: false,
      };
    case REQUEST(PRODUCT_ACTION.FILTER_PRODUCT):
      return {
        ...state,
        filter: { ...state.filter, payload },
        loading: true,
      };
    case SUCCESS(PRODUCT_ACTION.FILTER_PRODUCT):
      const { data, pagination } = payload;
      return {
        ...state,
        products: data,
        filter: pagination,
        loading: false,
      };
    default:
      return state;
  }
}

export { initialState };
export default reducer;
