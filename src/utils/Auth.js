export const BASE_URL = 'https://auth.nomoreparties.co/';

function checkResponse(res) {
	if (res.ok) {
		return res.json();
	};
	return Promise.reject(`Ошибка: ${res.status}`);
};

export function register({ email, password }) {
	return fetch(`${BASE_URL}signup`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password }),
	})
		.then((res) => checkResponse(res));
};

export function login({ email, password }) {
	return fetch(`${BASE_URL}signin`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	})
		.then((res) => checkResponse(res));
};

export function checkToken(myToken) {
	return fetch(`${BASE_URL}users/me`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${myToken}`,
		},
	})
		.then((res) => checkResponse(res));
};