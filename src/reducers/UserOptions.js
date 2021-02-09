export const SET_LOGGED_IN = 'USER_OPTIONS/SET_LOGGED_IN';

export const setSidebarShadow = (loggedIn) => ({
  type: SET_LOGGED_IN,
  loggedIn
});

export default function reducer(
  state = {
    // Sidebar

    loggedIn: false
  },
  action
) {
  switch (action.type) {
    // Sidebar

    case SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.loggedIn
      };
    default:
      break;
  }
  return state;
}
