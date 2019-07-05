const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'SET_FAVORITE':
      return {
        ...state,
        myList: [...state.myList, action.payload]
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
};

export default reducer;