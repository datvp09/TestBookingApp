import {actionTypes} from 'config';

const initialState = {
  bookings: [],
};

export default function bookingReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
      };
    case actionTypes.CLEAR_BOOKINGS:
      return initialState;
    default:
      return state;
  }
}
