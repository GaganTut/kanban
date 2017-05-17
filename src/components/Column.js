import React from 'react';
import KanbanCard from './../containers/KanbanCard';

const Column = ({cardList, columnName}) => (
  <div  className={columnName}>
    <h2 className='column-title'>{columnName}</h2>
    <div className="card-section">
      {cardList.map((card, index) => <KanbanCard card={card} key={card.id} />)}
    </div>
  </div>
)

export default Column;