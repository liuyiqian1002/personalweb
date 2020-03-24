// import { delay } from 'redux-saga'
import { put, takeEvery, all, delay } from "redux-saga/effects";
import { commonConstants } from "../reducers/commons.js";

function* loadingAsync() {
  yield delay(3000);
  console.log("loadingAsync");
  yield put({ type: commonConstants.loading, payload: true });
}

function* increaseAsync() {
  yield delay(1000);
  yield put({ type: "INCREASE" });
}

function* decreaseAsync() {
  yield delay(1000);
  yield put({ type: "DECREASE" });
}

function* watchLoadingAsync() {
  console.log("watchLoadingAsync");
  yield takeEvery(`${commonConstants.loading}_ASYNC`, loadingAsync);
}

function* watchIncreaseAsync() {
  yield takeEvery("INCREASE_ASYNC", increaseAsync);
}

function* watchDecreaseAsync() {
  yield takeEvery("DECREASE_ASYNC", decreaseAsync);
}

export default function* rootSaga() {
  console.log("hello saga");
  yield all([watchLoadingAsync(), watchIncreaseAsync(), watchDecreaseAsync()]);
}
