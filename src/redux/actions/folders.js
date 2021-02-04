import axios from 'axios';

export const setFolders = payload => ({
  type: 'SET_FOLDERS',
  payload
})

export const setLoaded = () => ({
  type: 'SET_FOLDERS_LOADED'
})

export const setActiveFolder = payload => ({
  type: 'SET_ACTIVE_FOLDER',
  payload
})

export const addFolder = payload => ({
  type: 'ADD_FOLDER',
  payload
})

export const removeFolder = payload => ({
  type: 'REMOVE_FOLDER',
  payload
})

export const editFolder = payload => ({
  type: 'EDIT_FOLDER',
  payload
})

export const fetchFolders = url => dispatch => {
  axios.get(url)
    .then(({ data }) => {
      dispatch(setFolders(data.folders));
      dispatch(setLoaded());
   })
    .catch(err => console.log(err));
}