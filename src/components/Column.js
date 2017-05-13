import React from 'react';
import KanbanCard from './../containers/KanbanCard';

const Column = ({cardList, columnID}) => (
  <div  id={columnID}>
    {cardList.map((card, index) => <KanbanCard card={card} key={card.id} />)}
  </div>
)

export default Column;