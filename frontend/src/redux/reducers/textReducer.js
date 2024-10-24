// reducers.js
const initialState = {
  text: '',
  style: 'default',
};

const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return { ...state, text: action.payload };
    case 'SET_STYLE':
      return { ...state, style: action.payload };
    default:
      return state;
  }
};

export default textReducer;
