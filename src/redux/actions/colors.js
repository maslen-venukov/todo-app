import axios from 'axios';

export const setColors = payload => ({
  type: 'SET_COLORS',
  payload
})

export const fetchColors = url => dispatch => {
  axios.get(url)
    .then(({ data }) => dispatch(setColors(data.colors)))
    .catch(err => console.log(err));
}