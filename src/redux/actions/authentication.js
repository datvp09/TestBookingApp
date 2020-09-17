import {actionTypes, endpoints, methods} from 'config';

export const login = (bodyParams = {}) => ({
  type: actionTypes.LOGIN,
  endpoint: endpoints.LOGIN_EP,
  method: methods.POST,
  bodyParams,
});

export const setUserInfo = (payload) => ({
  type: actionTypes.SET_USERINFO,
  payload,
});

export const logOut = () => ({
  type: actionTypes.LOGOUT,
});
