/*jshint esversion: 6*/
import React from 'react';

export default ({card, closeDescription}) => {
  return (
    <div className="card-description" draggable="true">
      <input
        className="close-edit"
        type="button"
        onClick={closeDescription}
        value="✖"
        />
      <h1 className="description-title">Task: {card.title}</h1>
      <p className="description-text">Description: <br/>{card.description || 'No Description Written'}</p>
    </div>
  );
};