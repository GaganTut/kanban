import React from 'react';
import Login from '../containers/Login';
import PopUps from '../containers/PopUps';

export default () => (
  <div className="main-title">
    <h1>Kanban</h1>
    <h3>Keepin' it simple</h3>
    <PopUps />
    <Login />
  </div>
)