export default class Api {
    constructor(options) {
      this.url = options.url;
      this.headers = options.headers;
    }

    async getUserData(){
      return fetch(this.url + '/users/me', {
        method: 'GET',
        headers: this.headers
      })
      .then(res => {
        if(res.ok){
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
    }

    async getInitialCards() {
     return fetch(this.url + '/cards', {
      method: 'GET',
      headers: this.headers
     }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // if the server returns an error, reject the promise
      return Promise.reject(`Error: ${res.status}`);
    });
    }

    async uploadCard(name, link){
      fetch(this.url + '/cards', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
    }

    //we may need to change this up depending on how implementation will go
    //let's also not forget to handle errors for the rest of these
    async deleteCard(cardId){
      fetch(this.url + `/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      });
    }

    async getCardsAndUserData(){
      return Promise.all([this.getInitialCards(), this.getUserData()]);
    }

    async likeCard(cardId){
      //this will be out method to have likes in a card
      fetch(this.url + `/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this.headers
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      });
    }

    async unlikeCard(cardId){
      fetch(this.url + `/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this.headers
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      });
    }
  
    // other methods for working with the API
    async setProfileData(name, about){
      fetch(this.url + '/users/me', {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
    }

    async updateProfilePic(url){
      return fetch(this.url + '/users/me/avatar', {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: url
        })
      })
    }
  }
  
  //we will need to find a way to have the respective popups have a loading phase..there is a resource in the lessons I can actually use
  //we will add a new little element in the card object to show the likes as an integer