/*jshint esversion: 6*/
export const getAllCards = () => fetch('http://localhost:8888/api/cards').then(res => res.json());

export const addCard = (cardObj) => fetch('http://localhost:8888/api/cards', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(cardObj)
  }).then(res => res.json());

export const updateCard = (id, cardObj) => fetch(`http://localhost:8888/api/cards/${id}`, {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(cardObj)
  }).then(res => res.json());

export const deleteCard = (id) => fetch(`http://localhost:8888/api/cards/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());

export const loginUser = (username, password) => fetch('http://localhost:8888/api/user/login', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({username: username, password:password})
  })
    .then(res => res.json());

export const logoutUser = () => fetch('http://localhost:8888/api/user/logout').then(res => res.json());