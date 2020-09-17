import {actionTypes} from 'config';

const initialState = {
  error: {},
  data: [],
  isFetching: false,
  isShowingNotification: false,
  notiType: '',
  notiTitle: '',
  notiMessage: '',
  showNotiCallback: () => {},
  functionComponent: null,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MAKE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.MAKE_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        error: {},
      };
    case actionTypes.MAKE_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        data: [],
      };
    case actionTypes.SHOW_NOTIFICATION:
      const {
        notiMessage,
        showNotiCallback,
        notiTitle,
        notiType,
        functionComponent,
      } = action.payload;

      return {
        ...state,
        isShowingNotification: true,
        notiMessage,
        showNotiCallback,
        notiTitle,
        notiType,
        functionComponent,
      };
    case actionTypes.HIDE_NOTIFICATION:
      return {
        ...state,
        isShowingNotification: false,
      };
    case actionTypes.SHOW_SPINNER:
      return {
        ...state,
        isFetching: true,
      };
    case actionTypes.HIDE_SPINNER:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
