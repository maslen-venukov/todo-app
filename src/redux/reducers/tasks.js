import getRandomId from '../../utils/getRandomId';

const initialState = {
  items: null,
  isLoaded: false
}

const tasks = (state = initialState, action) => {
  const { type, payload } = action;

  switch(type) {
    case 'SET_TASKS':
      return {
        ...state,
        items: payload
      }

    case 'SET_TASKS_LOADED':
      return {
        ...state,
        isLoaded: true
      }

    case 'ADD_TASK':
      const newTask = { id: getRandomId(), folderId: payload.folderId, text: payload.text, isCompleted: false };
      return {
        ...state,
        items: [ ...state.items, newTask ]
      }

    case 'COMPLETE_TASK':
      return {
        ...state,
        items: state.items.map(task => task.id === payload ? { ...task, isCompleted: !task.isCompleted } : task)
      }

    case 'REMOVE_TASK':
      return {
        ...state,
        items: state.items.filter(task => task.id !== payload)
      }

    case 'REMOVE_TASKS':
      return {
        ...state,
        items: state.items.filter(task => task.folderId !== payload)
      }

    case 'EDIT_TASK':
      return {
        ...state,
        items: state.items.map(task => (
          task.id === payload.id
            ? { ...task, text: payload.text }
            : task
        ))
      }

    default:
      return state;
  }
}

export default tasks;