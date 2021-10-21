export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getServerImages() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .catch((error) => console.log("Error from getServerImages:", error));
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .catch((error) => console.log("Error from getProfileInfo:", error));
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .catch((error) => console.log("Error from setProfileInfo:", error));
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
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .catch((error) => console.log("Error from addNewImage:", error));
  }

  deleteImage(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .catch((error) => console.log("Error from deleteImage:", error));
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .catch((error) => console.log("Error from likeCard:", error));
  }

  unLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .catch((error) => console.log("Error from unLikeCard:", error));
  }

  editProfileImage(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: link.avatarLink,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.statusText);
        }
      })
      .catch((error) => console.log("Error from editProfileImage:", error));
  }
}