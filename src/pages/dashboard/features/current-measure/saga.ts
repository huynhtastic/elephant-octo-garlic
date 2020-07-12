import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { takeEvery, call } from 'redux-saga/effects';
import { CombinedError } from 'urql';

import { actions } from './reducer';

function* apiErrorReceived(action: PayloadAction<CombinedError>) {
  const { name, message } = action.payload;
  yield call(toast.error, `Error getting current measurements:\n${name}: ${message}`);
}

export default function* saga() {
  yield takeEvery(actions.handleErr.type, apiErrorReceived);
}
