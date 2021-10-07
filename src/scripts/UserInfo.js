export default class UserInfo {
  constructor({ userNameSelector, userAboutSelector }) {
    this._userNameElement = document.querySelector(userNameSelector);
    this._userAboutElement = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userNameElement.textContent,
      about: this._userAboutElement.textContent,
    };

    return userInfo;
  }

  setUserInfo(userData) {
    this._userNameElement.textContent = userData.fullName;
    this._userAboutElement.textContent = userData.about;
  }
}