
const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Store the token in localStorage
      //  localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      // Remove the token from localStorage
      //  localStorage.removeItem('token');
      //  localStorage.removeItem('isadmin');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'SET_ADMIN':
      //  localStorage.setItem('isadmin', action.payload);
      return{
        ...state,
        isAdmin:action.payload,
      }
    default:
      return state;
  }
};
export default userReducer;