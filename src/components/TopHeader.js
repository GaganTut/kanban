import React from 'react';
import PopUps from '../containers/PopUps';

export default () => (
  <div className="main-title">
    <div className="header-title">
      <img src={require('../assets/kanbanLogo.png')} alt="Kanban Logo"/>
      <h3>Keepin' it simple</h3>
    </div>
    <PopUps />
  </div>
)