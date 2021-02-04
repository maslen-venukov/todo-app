import axios from 'axios';

export const setTasks = payload => ({
  type: 'SET_TASKS',
  payload
})

export const setLoaded = () => ({
  type: 'SET_TASKS_LOADED'
})

export const addTask = payload => ({
  type: 'ADD_TASK',
  payload
})

export const completeTask = payload => ({
  type: 'COMPLETE_TASK',
  payload
})

export const removeTask = payload => ({
  type: 'REMOVE_TASK',
  payload
})

export const removeTasks = payload => ({
  type: 'REMOVE_TASKS',
  payload
})

export const editTask = payload => ({
  type: 'EDIT_TASK',
  payload
})

export const fetchTasks = url => dispatch => {
  axios.get(url)
    .then(({ data }) => {
      dispatch(setTasks(data.tasks));
      dispatch(setLoaded());
   })
    .catch(err => console.log(err));
}