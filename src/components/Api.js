export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
    return res.json();
    } else {
    return Promise.reject(res.statusText);
    }
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res))
  }

  getServerImages() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then((res) => this._checkResponse(res))
  }

  setProfileInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: data.fullName,
        about: data.about,
      }),
    })
    .then((res) => this._checkResponse(res))
  }

  addNewImage(data) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.imageTitle,
        link: data.imageLink,
      }),
    })
    .then((res) => this._checkResponse(res))
  }

  deleteImage(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    })
    .then((res) => this._checkResponse(res))
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT",
    })
    .then((res) => this._checkResponse(res))
  }

  unLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    })
    .then((res) => this._checkResponse(res))
  }

  editProfileImage(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: link.avatarLink,
      }),
    })
    .then((res) => this._checkResponse(res))
  }
}