import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Folder from './Folder';

const Sidebar = ({ onResetFolder, onSelectFolder, onAddFolder, onRemoveFolder }) => {
  const folders = useSelector(({ folders }) => folders.items);
  const isLoaded = useSelector(({ folders }) => folders.isLoaded);

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    isPopupOpen && inputRef.current.focus();
  }, [isPopupOpen]);

  const inputRef = useRef();

  const onTogglePopup = () => {
    setPopupOpen(!isPopupOpen);
    setInputValue('');
  }

  const onInputChange = e => setInputValue(e.target.value);

  const onFormSubmit = e => {
    e.preventDefault();
    if(inputValue.trim()) {
      onAddFolder(inputValue);
      onTogglePopup();
    } else {
      window.alert('Введите название папки');
      inputRef.current.focus();
    }
  }

  return (
    <div className="sidebar">
      <h2 onClick={onResetFolder} className="title title--folders">Папки</h2>
        <ul className="folders">
          {isLoaded
            ? folders.map(folder => <Folder key={folder.id} {...folder} onSelectFolder={onSelectFolder} onRemoveFolder={onRemoveFolder} />)
            : 'Загрузка...'}
        </ul>
        <button onClick={onTogglePopup} className="add-btn add-btn--folders">Добавить папку</button>
        {isPopupOpen &&
          <form onSubmit={onFormSubmit} className="popup">
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

export default Sidebar;