import { combineReducers } from 'redux';

import folders from './folders';
import tasks from './tasks';
import colors from './colors';

const rootReducer = combineReducers({
  folders,
  tasks,
  colors
})

export default rootReducer;