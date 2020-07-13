import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { takeEvery, call } from 'redux-saga/effects';
import { CombinedError } from 'urql';

import { actions } from './reducer';

function* handleErr({ payload: { name, message } }: PayloadAction<CombinedError>) {
  yield call(toast.error, `Error fetching chart data: ${name}: ${message}`);
}

export default function* saga() {
  yield takeEvery(actions.handleErr.type, handleErr);
}
