// export const BASE_URL = 'https://auth.nomoreparties.co';
export const BASE_URL = ' http://localhost:3000';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.json());
}

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
}

export function authorize(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, email }),
  }).then(checkResponse);
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
}