/*jshint esversion: 6*/
import React from 'react';

export default ({board, openBoard}) => {
  return (
    <div className="each-board" onClick={openBoard}>
      <h1>{board.title}</h1>
    </div>
  );
};