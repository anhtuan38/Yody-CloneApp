import { fork } from "redux-saga/effects";

import userSaga from "./user.saga";
import productSaga from "./product.saga";
import locationSaga from "./location.saga";
import commentSaga from "./comment.saga";
import cartSaga from "./cart.saga";

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(productSaga);
  yield fork(cartSaga);
  yield fork(locationSaga);
  yield fork(commentSaga);
}
