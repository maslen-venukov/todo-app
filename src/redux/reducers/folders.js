import getRandomId from '../../utils/getRandomId';

const initialState = {
  items: null,
  active: null,
  isLoaded: false
}

const folders = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case 'SET_FOLDERS':
      return {
        ...state,
        items: payload
      }

    case 'SET_FOLDERS_LOADED':
      return {
        ...state,
        isLoaded: true
      }

    case 'SET_ACTIVE_FOLDER':
      return {
        ...state,
        active: payload
      }

    case 'ADD_FOLDER':
      const newFolder = { id: getRandomId(), text: payload };
      return {
        ...state,
        items: [ ...state.items, newFolder ]
      }

    case 'REMOVE_FOLDER':
      return {
        ...state,
        items: state.items.filter(folder => folder.id !== payload)
      }

    case 'EDIT_FOLDER':
      return {
        ...state,
        items: state.items.map(folder => (
          folder.id === payload.id
            ? { ...folder, text: payload.text }
            : folder
        ))
      }

    default:
      return state;
  }
}

export default folders;