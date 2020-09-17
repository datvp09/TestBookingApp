import axios from 'axios';
import {methods, actionTypes} from 'config';
import {store} from 'redux/store';
import _ from 'lodash';

const {GET, POST, PUT, DELETE} = methods;
const {MAKE_REQUEST, MAKE_REQUEST_SUCCESS, MAKE_REQUEST_FAILURE} = actionTypes;

const fetchAPI = async (endpoint, method, bodyParameters = {}) => {
  store.dispatch({type: MAKE_REQUEST});

  const headersAuthor = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  console.log(
    `%cMETHOD_${method}`,
    'color:blue',
    endpoint,
    bodyParameters,
    headersAuthor,
  );

  let caller = null;

  switch (method) {
    case GET:
      caller = axios({method: GET, endpoint, headers: headersAuthor});
      break;
    case POST:
      caller = axios({
        method: POST,
        url: endpoint,
        headers: headersAuthor,
        data: JSON.stringify(bodyParameters),
      });
      break;
    case PUT:
      caller = axios({
        method: PUT,
        url: endpoint,
        headers: headersAuthor,
        data: JSON.stringify(bodyParameters),
      });
      break;
    case DELETE:
      caller = axios({
        method: DELETE,
        url: endpoint,
        headers: headersAuthor,
      });
      break;
    default:
      return false;
  }

  return caller
    .then((res) => {
      console.log('%c--API response--', 'color:blue', res);
      store.dispatch({type: MAKE_REQUEST_SUCCESS, payload: res.data});
      return res;
    })
    .catch((e) => {
      console.log('%c--API response--', 'color:red', e, e.response);
      store.dispatch({type: MAKE_REQUEST_FAILURE, payload: e.response});
      throw e;
    });
};

export default fetchAPI;
