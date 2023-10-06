export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  async getUserData() {
    return fetch(this._url + '/users/me', {
      method: 'GET',
      headers: this._headers
    }).then(this._processResponse)
  }

  async getInitialCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers
    }).then(this._processResponse)
  }

  async uploadCard(name, link) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._processResponse)
  }

  async deleteCard(cardId) {
    return fetch(this._url + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._processResponse)
  }

  async getCardsAndUserData() {
    return Promise.all([this.getInitialCards(), this.getUserData()]);
  }

  async likeCard(cardId) {
    //this will be out method to have likes in a card
    return fetch(this._url + `/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._processResponse)
  }

  async unlikeCard(cardId) {
    return fetch(this._url + `/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._processResponse)
  }

  // other methods for working with the API
  async setProfileData(name, about) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._processResponse)
  }

  async updateProfilePic(url) {
    return fetch(this._url + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url
      })
    }).then(this._processResponse)
  }
}

//we will need to find a way to have the respective popups have a loading phase..there is a resource in the lessons I can actually use
//we will add a new little element in the card object to show the likes as an integer