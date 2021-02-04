import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Task from './Task';

const Main = ({ onAddTask, onCompleteTask, onRemoveTask, onEditFolder, onEditTask }) => {
  const isLoaded = useSelector(({ tasks }) => tasks.isLoaded);
  const activeFolder = useSelector(({ folders }) => folders.isLoaded && folders.items.find(folder => folder.id === folders.active));
  const tasks = useSelector(({ tasks }) => activeFolder && tasks.items && tasks.items.filter(task => task.folderId === activeFolder.id));

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    isPopupOpen && inputRef.current.focus();
  }, [isPopupOpen]);

  useEffect(() => {
    setPopupOpen(false);
  }, [activeFolder]);

  const inputRef = useRef();

  const onTogglePopup = () => {
    setPopupOpen(!isPopupOpen);
    setInputValue('');
  }

  const onInputChange = e => setInputValue(e.target.value);

  const handleAddTask = e => {
    e.preventDefault();
    onAddTask({ folderId: activeFolder.id, text: inputValue });
    onTogglePopup();
  }

  const handleEditFolder = () => {
    const result = window.prompt('Введите новое название папки', activeFolder.text);
    if(result && result !== activeFolder.text) {
      const newName = result.trim().replace(/\s+/g, ' ');
      const payload = { id: activeFolder.id, text: newName };
      onEditFolder(payload);
    } else if(result === '' || result === activeFolder.text) {
      window.alert('Введите новое название');
    }
  }

  return (
    <div className="main">
      <h2 className="title title--tasks">Таски</h2>
      {activeFolder &&
        <h3 className="tasks__title">
          {activeFolder.text}
          <button onClick={handleEditFolder} className="tasks__edit tasks__edit--folders" aria-label="Редактировать название папки" />
        </h3>}
      <ul className="tasks">
        {isLoaded
          ? activeFolder
            ? tasks.length === 0
              ? 'Список тасков пуст😕'
              : tasks.map(task => <Task key={task.id} onCompleteTask={onCompleteTask} onRemoveTask={onRemoveTask} onEditTask={onEditTask} {...task} />)
            : 'Выберите папку😉'
          : 'Загрузка...'}
      </ul>
      {activeFolder && <button onClick={onTogglePopup} className="add-btn">Добавить таск</button>}
      {activeFolder && isPopupOpen &&
        <form onSubmit={handleAddTask} className="popup popup--tasks">
          <button onClick={onTogglePopup} className="popup__close" type="button" aria-label="Закрыть" />
          <input
            ref={inputRef}
            onChange={onInputChange}
            value={inputValue}
            className="popup__input"
            type="text"
            placeholder="Название"
          />
          <button className="popup__add">Добавить</button>
        </form>}
    </div>
  )
}

export default Main;