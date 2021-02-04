import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames'

import getRandomNum from '../utils/getRandomNum';

const Folder = ({ id, text, onSelectFolder, onRemoveFolder }) => {
  const active = useSelector(({ folders }) => folders.active);
  const colors = useSelector(({ colors }) => colors);

  const backgroundColor = colors && colors[getRandomNum(0, colors.length - 1)].hex;

  const handleSelectFolder = e => {
    if(!e.target.classList.contains('folders__remove')) {
      onSelectFolder(id);
    }
  }

  const handleRemoveFolder = () => window.confirm('Вы действительно хотите удалить папку?') && onRemoveFolder(id);

  return (
    <li onClick={handleSelectFolder} className={classNames('folders__item', active === id ? 'active' : '')}>
      {colors && <i className="folders__marker" style={{ backgroundColor }} />}
      <span className="folders__text">{text}</span>
      <button onClick={handleRemoveFolder} className="folders__remove" aria-label="Удалить папку" />
    </li>
  )
}

export default Folder;