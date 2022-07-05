import {
  getLocal,
  openNotificationWithIcon,
  removeLocal,
  setLocal,
} from "../../helper";
import { FAIL, REQUEST, SUCCESS, USER_ACTION } from "../constants";

const initialState = {
  token: getLocal("token") || "",
  userInfo: {},
  loading: false,
  users: [],
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case REQUEST(USER_ACTION.GET_ALL_USER):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(USER_ACTION.GET_ALL_USER):
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case FAIL(USER_ACTION.GET_ALL_USER):
      return {
        ...state,
        loading: false,
      };
    case REQUEST(USER_ACTION.SIGN_IN):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(USER_ACTION.SIGN_IN):
      setLocal({ key: "token", value: payload.data.accessToken });
      setLocal({ key: "user", value: { id: payload.data.user.id } });
      return {
        ...state,

        token: payload.data.accessToken,
        userInfo: payload.data.user,
        loading: false,
      };
    case FAIL(USER_ACTION.SIGN_IN):
      return {
        ...state,
        userInfo: {},
        loading: false,
      };
    // sign up
    case REQUEST(USER_ACTION.SIGN_UP):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(USER_ACTION.SIGN_UP):
      return {
        ...state,
        userInfo: {
          data: payload.data,
        },
        loading: false,
      };
    case FAIL(USER_ACTION.SIGN_UP):
      return {
        ...state,
        userInfo: {},
        loading: false,
      };
    case REQUEST(USER_ACTION.GET_USER_INFO):
      return {
        ...state,
        loading: true,
      };
    case SUCCESS(USER_ACTION.GET_USER_INFO):
      return {
        ...state,
        userInfo: payload.data,
        loading: false,
      };
    case REQUEST(USER_ACTION.CHANGE_USER_INFO):
      const { city, district, ward, address, paymentMethod } = payload;
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          city,
          district,
          ward,
          address,
          paymentMethod,
        },
      };
    case REQUEST(USER_ACTION.SIGN_OUT):
      removeLocal("token");
      removeLocal("user");
      removeLocal("cart");

      openNotificationWithIcon({
        type: "success",
        message: "Đăng xuất thành công",
      });

      return {
        ...state,
        userInfo: {},
        token: "",
      };
    default:
      return state;
  }
}

export { initialState };
export default reducer;
