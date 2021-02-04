import React, { useState } from 'react';

const Task = ({ id, text, isCompleted, onCompleteTask, onRemoveTask, onEditTask }) => {
  const [isChecked, setChecked] = useState(isCompleted);

  const handleCompleteTask = () => {
    onCompleteTask(id);
    setChecked(!isChecked);
  }

  const handleRemoveTask = () => window.confirm('Вы действительно хотите удалить таск?') && onRemoveTask(id);

  const handleEditTask = () => {
    const result = window.prompt('Введите новое название таска', text);
    if(result && result !== text) {
      const newName = result.trim().replace(/\s+/g, ' ');
      const payload = { id, text: newName };
      onEditTask(payload);
    } else if(result === '' || result === text) {
      window.alert('Введите новое название');
    }
  }

  return (
    <li className="tasks__item">
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={handleCompleteTask}
        className="tasks__checkbox" 
      />
      <label htmlFor={id} className="tasks__label">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10" cy="10" r="10" />
          <path d="M14.3 7.20001L8.79999 12.7L6.29999 10.2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="tasks__text">{text}</span>
      </label>
      <button onClick={handleRemoveTask} className="tasks__remove" aria-label="Удалить таск" />
      <button onClick={handleEditTask} className="tasks__edit" aria-label="Редактировать название таска" />
    </li>
  )
}

export default Task;