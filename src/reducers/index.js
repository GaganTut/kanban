const initialState = {
  queueCards: [],
  progressCards: [],
  completedCards: []
};

const cards = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_CARDS' :
      return Object.assign({}, state, {
        queueCards: action.cards.filter(card => card.status === 'Queue'),
        progressCards: action.cards.filter(card => card.status === 'Progress'),
        completedCards: action.cards.filter(card => card.status === 'Completed')
      });

    default:
      return state;
  }
};

export default cards;