import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { REQUEST, SUCCESS, FAIL, LOCATION_ACTION } from "../constants";

import { API_PATH } from "../../Service/constants";

function* getCities() {
  try {
    const { data } = yield axios.get(`${API_PATH}/cities`);

    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_CITIES),
      payload: {
        data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_CITIES),
      payload: "Lấy data lỗi",
    });
  }
}

function* getDistricts(action) {
  const { cityCode } = action.payload;
  try {
    const { data } = yield axios.get(`${API_PATH}/districts`, {
      params: {
        parentcode: cityCode,
      },
    });

    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_DISTRICTS),
      payload: {
        data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_DISTRICTS),
      payload: "Lấy data lỗi",
    });
  }
}

function* getWards(action) {
  const { districtCode } = action.payload;
  try {
    const { data } = yield axios.get(`${API_PATH}/wards`, {
      params: {
        parentcode: districtCode,
      },
    });

    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_WARDS),
      payload: {
        data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_WARDS),
      payload: "Lấy data lỗi",
    });
  }
}

export default function* locationSaga() {
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_CITIES), getCities);
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_DISTRICTS), getDistricts);
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_WARDS), getWards);
}
