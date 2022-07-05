import { put, takeEvery } from "redux-saga/effects";

import { openNotificationWithIcon } from "../../helper";

import { FAIL, REQUEST, SUCCESS, USER_ACTION } from "../constants";
import { authAPI } from "../../Service";

function* Login(action) {
  try {
    const { data, callback } = action.payload;
    const response = yield authAPI.login(data);
    yield put({
      type: SUCCESS(USER_ACTION.SIGN_IN),
      payload: response,
    });
    yield openNotificationWithIcon({
      type: "success",
      message: "Đăng nhập thành công!",
    });

    if (response?.data?.user?.role === "admin") {
      callback("/admin/product-management");
    } else {
      callback("/");
    }
  } catch (e) {
    yield put({
      type: FAIL(USER_ACTION.SIGN_IN),
      payload: e.message,
    });
    yield openNotificationWithIcon({
      type: "error",
      message: "Login fail!",
      description: "Incorrect account or password!",
    });
  }
}

function* Register(action) {
  try {
    const { data, callback } = action.payload;
    data.status = "active";

    const response = yield authAPI.register(data);
    yield put({
      type: SUCCESS(USER_ACTION.SIGN_UP),
      payload: response,
    });
    yield openNotificationWithIcon({
      type: "success",
      message: "Đăng ký tài khoản thành công!",
    });
    callback();
  } catch (e) {
    console.log(e);
    yield put({
      type: FAIL(USER_ACTION.SIGN_UP),
      payload: e.message,
    });
    yield openNotificationWithIcon({
      type: "error",
      message: "Đăng ký thất bại",
      description: "Email đã được sử dụng, vui lòng chọn 1 email khác!",
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { data } = yield authAPI.getInfo(action.payload);
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_INFO),
      payload: {
        data,
      },
    });
  } catch (errors) {
    console.log(errors);
  }
}

function* changePassword(action) {
  try {
    const { userId, email, oldPassword, newPassword, callback } =
      action.payload;

    const { data } = yield authAPI.login({
      email: email,
      password: oldPassword,
    });
    if (data?.accessToken) {
      yield authAPI.changePassword(userId, { password: newPassword });
      yield openNotificationWithIcon({
        type: "success",
        message: "Thay đổi mật khẩu thành công",
      });
    }

    callback();
  } catch (errors) {
    yield openNotificationWithIcon({
      type: "error",
      message: "Mật khẩu cũ không chính xác",
    });
  }
}

function* changeUserInfo(action) {
  try {
    const { userID, callback, ...rest } = action.payload;

    const { data } = yield authAPI.updateInfo(userID, rest);

    if (data) {
      yield put({
        type: SUCCESS(USER_ACTION.GET_USER_INFO),
        payload: {
          data,
        },
      });
      callback && callback();
    }
  } catch (errors) {
    yield put({
      type: FAIL(USER_ACTION.CHANGE_USER_INFO),
      payload: {
        data: errors.message,
      },
    });
  }
}

function* getAllUserFromServer() {
  try {
    const { data } = yield authAPI.getAllUsers();

    if (data) {
      yield put({
        type: SUCCESS(USER_ACTION.GET_ALL_USER),
        payload: data,
      });
    }
  } catch (errors) {
    yield put({
      type: FAIL(USER_ACTION.GET_ALL_USER),
      payload: {
        data: errors.message,
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery(REQUEST(USER_ACTION.SIGN_IN), Login);
  yield takeEvery(REQUEST(USER_ACTION.SIGN_UP), Register);
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_INFO), getUserInfoSaga);
  yield takeEvery(REQUEST(USER_ACTION.CHANGE_PASSWORD), changePassword);
  yield takeEvery(REQUEST(USER_ACTION.CHANGE_USER_INFO), changeUserInfo);
  yield takeEvery(REQUEST(USER_ACTION.GET_ALL_USER), getAllUserFromServer);
}
