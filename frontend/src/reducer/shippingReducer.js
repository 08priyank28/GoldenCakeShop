
const userReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SHIPPING_DATA':
        // Store the token in localStorage
        //  localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          address: action.payload.address,
          date: action.payload.date,
        };
      default:
        return state;
    }
  };
  export default userReducer;