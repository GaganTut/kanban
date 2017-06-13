/*jshint esversion: 6*/
export const getAllCards = () => fetch('/api/cards')
  .then(res => res.json())
  .catch(err => err);

export const addCard = (cardObj) => fetch('/api/cards', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(cardObj)
  })
    .then(res => res.json())
    .catch(err => err);

export const updateCard = (id, cardObj) => fetch(`/api/cards/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(cardObj)
  })
    .then(res => res.json())
    .catch(err => err);

export const deleteCard = (id) => fetch(`/api/cards/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then(res => res.json())
    .catch(err => err);

export const loginUser = (username, password) => fetch('/api/user/login', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({username: username, password:password})
  })
    .then(res => res.json())
    .catch(err => err);

export const signupUser = userInfo => fetch('/api/user/new', {
  method: 'POST',
  credentials: 'include',
  headers: new Headers({
    'Content-Type': 'application/json'
  }),
  body: JSON.stringify(userInfo)
})
  .then(res => res.json())
  .catch(err => err);

export const logoutUser = () => fetch('/api/user/logout',{credentials: 'include'})
  .then(res => res.json())
  .catch(err => err);

export const getUserList = () => fetch('/api/user')
  .then(res => res.json())
  .catch(err => err);

export const checkLogin = () => fetch('/api/user/check')
  .then(res => res.json())
  .catch(err => err);

export const loadBoards = () => fetch('/api/boards/')
  .then(res => res.json())
  .catch(err => err);

export const loadCards = id => fetch(`/api/boards/${id}`)
  .then(res => res.json())
  .catch(err => err);