import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { REQUEST, SUCCESS, FAIL, COMMENT_ACTION } from "../constants";

import { API_PATH } from "../../Service/constants";
import { openNotificationWithIcon } from "../../helper";

function* getCommentListSaga(action) {
  try {
    const { productID } = action.payload;

    const { data } = yield axios.get(`${API_PATH}/comments`, {
      params: {
        productID: productID,
      },
    });

    yield put({
      type: SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: "Lấy data lỗi",
    });
  }
}

function* sendCommentSaga({ payload }) {
  try {
    const { productID, comment, email } = payload;
    const { data } = yield axios.post(`${API_PATH}/comments`, {
      productID,
      comment,
      email,
    });
    if (data) {
      yield openNotificationWithIcon({
        type: "success",
        message: "Gửi bình luận thành công!",
      });
      yield put({
        type: REQUEST(COMMENT_ACTION.GET_COMMENT_LIST),
        payload: {
          productID,
        },
      });
    }
  } catch (error) {
    yield openNotificationWithIcon({
      type: "error",
      message: "Gửi bình luận thất bại!",
    });
    yield put({
      type: FAIL(COMMENT_ACTION.SEND_COMMENT),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* commentSaga() {
  yield takeEvery(REQUEST(COMMENT_ACTION.GET_COMMENT_LIST), getCommentListSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.SEND_COMMENT), sendCommentSaga);
}
