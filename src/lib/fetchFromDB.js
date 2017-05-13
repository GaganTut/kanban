export const getAllCards = () => fetch('/api/cards').then(res => res.json());

export const addCardToDb = (cardObj) => fetch('/api/cards', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(cardObj)
  }).then(res => res.json());

export const updateCardInDb = (id, cardObj) => fetch(`/api/cards/${id}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(cardObj)
  }).then(res => res.json());

export const deleteCardInDb = (id) => fetch(`/api/cards/${id}`, {
    method: 'DELETE'
  });

export const sendLoginRequest = (username, password) => fetch('/api/user/login', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({username: username, password:password})
  })
    .then(res => res.json());

export const logoutUser = () => fetch('/api/user/logout').then(res => res.json());