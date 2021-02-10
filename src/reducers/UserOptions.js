export const SET_CURRENT_USER = 'USER_OPTIONS/SET_CURRENT_USER';

export const setCurrentUser = (currentUser) => ({
  type: SET_CURRENT_USER,
  currentUser
});

export default function reducer(
  state = {
    currentUser: null
  },
  action
) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      };
    default:
      break;
  }
  return state;
}
