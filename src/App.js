import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

import Sidebar from './components/Sidebar';
import Main from './components/Main';

import { fetchFolders, setActiveFolder, addFolder, removeFolder, editFolder } from './redux/actions/folders';
import { fetchTasks, removeTasks, addTask, completeTask, removeTask, editTask } from './redux/actions/tasks';
import { fetchColors } from './redux/actions/colors';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const folders = useSelector(({ folders }) => folders.items);

  const onResetFolder = useCallback(() => {
    history.push('/');
    dispatch(setActiveFolder(null));
  }, [history, dispatch]);

  useEffect(() => {
    dispatch(fetchFolders('./db.json'));
    dispatch(fetchTasks('./db.json'));
    dispatch(fetchColors('./db.json'));
  }, [dispatch]);

  useEffect(() => {
    const pathname = history.location.pathname.substr(1);
    folders && !folders.find(folder => folder.id === pathname)
      ? onResetFolder()
      : dispatch(setActiveFolder(pathname));
  }, [history, folders, onResetFolder, dispatch]);

  const onSelectFolder = useCallback(id => {
    history.location.pathname !== `/${id}` && history.push(`/${id}`);
    dispatch(setActiveFolder(id));
  }, [dispatch, history]);

  const onAddFolder = useCallback(text => {
    dispatch(addFolder(text));
  }, [dispatch]);

  const onRemoveFolder = useCallback(id => {
    dispatch(removeFolder(id));
    dispatch(removeTasks(id));
    dispatch(setActiveFolder(null));
  }, [dispatch]);

  const onEditFolder = useCallback(payload => {
    dispatch(editFolder(payload));
  }, [dispatch]);

  const onAddTask = useCallback(text => {
    dispatch(addTask(text));
  }, [dispatch]);

  const onCompleteTask = useCallback(id => {
    dispatch(completeTask(id));
  }, [dispatch]);

  const onRemoveTask = useCallback(id => {
    dispatch(removeTask(id));
  }, [dispatch]);

  const onEditTask = useCallback(payload => {
    dispatch(editTask(payload));
  }, [dispatch]);

  return (
    <div className="wrapper">
      <div className="todo">
        <Sidebar onResetFolder={onResetFolder} onSelectFolder={onSelectFolder} onAddFolder={onAddFolder} onRemoveFolder={onRemoveFolder} />
        <Main onAddTask={onAddTask} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask} onEditFolder={onEditFolder} onEditTask={onEditTask} />
      </div>
    </div>
  )
}

export default App;