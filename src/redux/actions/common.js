import {actionTypes} from 'config';

export const showNotification = (payload) => ({
  type: actionTypes.SHOW_NOTIFICATION,
  payload,
});

export const hideNotification = (payload) => ({
  type: actionTypes.HIDE_NOTIFICATION,
  payload,
});

export const showSpinner = () => ({
  type: actionTypes.SHOW_SPINNER,
});

export const hideSpinner = () => ({
  type: actionTypes.HIDE_SPINNER,
});
