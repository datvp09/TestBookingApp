import {actionTypes, endpoints, methods} from 'config';

export const setBookings = (payload) => ({
  type: actionTypes.SET_BOOKINGS,
  payload,
});

export const getBookings = (bodyParams = {}) => ({
  type: actionTypes.GET_BOOKINGS,
  endpoint: endpoints.GET_BOOKINGS_EP,
  method: methods.POST,
  bodyParams,
});

export const createBooking = (bodyParams = {}, onSuccess) => ({
  type: actionTypes.CREATE_BOOKING,
  endpoint: endpoints.CREATE_BOOKING_EP,
  method: methods.POST,
  bodyParams,
  onSuccess,
});

export const clearBookings = () => ({
  type: actionTypes.CLEAR_BOOKINGS,
});
