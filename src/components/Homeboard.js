/*jshint esversion: 6*/
import React from 'react';

export default ({board, openBoard}) => {
  return (
    <div className="each-board" onClick={openBoard}>
      <h1 className="board-title">{board.title}</h1>
      <h3>Owner: {board.Users.filter(user => user.BoardUser.permission === 'Owner')[0].BoardUser.UserEmail}</h3>
      <h3>Date Created: {new Date(board.createdAt).toDateString()}</h3>
    </div>
  );
};