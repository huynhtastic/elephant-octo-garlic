import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { takeEvery, takeLatest, call } from 'redux-saga/effects';
import { CombinedError } from 'urql';

import { actions } from './reducer';

function* apiErrorReceived(action: PayloadAction<CombinedError>) {
  yield call(toast.error, `Error Received: ${action.payload.message}`);
}

export function* saga() {
    console.log('run saga');
    yield takeLatest(actions.handleErr.type, apiErrorReceived);
//   yield takeEvery(actions.handleErr.type, apiErrorReceived);
}
