const initialState = null;

const colors = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_COLORS':
      return action.payload;

    default:
      return state;
  }
}

export default colors;