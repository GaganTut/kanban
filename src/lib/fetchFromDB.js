/*jshint esversion: 6*/
export const getAllCards = () => fetch('/api/cards')
  .then(res => res.json())
  .catch(err => console.log(err));

export const addCard = (cardObj) => fetch('/api/cards', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(cardObj)
  })
    .then(res => res.json());

export const updateCard = (id, cardObj) => fetch(`/api/cards/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(cardObj)
  })
    .then(res => res.json());

export const deleteCard = (id) => fetch(`/api/cards/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then(res => res.json());

export const loginUser = (username, password) => fetch('/api/user/login', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({username: username, password:password})
  })
    .then(res => {
      if (res.status !== 200) {
        return res;
      }
      return res.json();
    });

export const logoutUser = () => fetch('/api/user/logout',{credentials: 'include'})
  .then(res => res.json());

export const getUserList = () => fetch('/api/user')
  .then(res => res.json());