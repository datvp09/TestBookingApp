import {actionTypes} from 'config';

const initialState = {
  username: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USERINFO:
      const {username} = action.payload;
      return {
        ...state,
        username,
      };
    default: {
      return state;
    }
  }
}
