import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { message } from 'antd';

interface CustomError {
  data: { error: string };
  status: number;
}

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!');
      const payload = action.payload as CustomError;

      message.error(
        'data' in payload
          ? (payload.data as { error: string }).error
          : action.error.message
      );
    }

    return next(action);
  };
