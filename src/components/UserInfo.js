export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userImageSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
    this._userImageElement = document.querySelector(userImageSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameElement.textContent,
      about: this._userAboutElement.textContent,
      avatar: this._userImageElement.src
    };

    return userInfo;
  }

  setUserInfo(userData) {
    this._userNameElement.textContent = userData.name;
    this._userAboutElement.textContent = userData.about;
    this._userImageElement.src = userData.avatar;
  }
}