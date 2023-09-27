export default class Api {
    constructor(options) {
      this.url = options.url;
      this.headers = options.headers;
    }

    async getUserData(){
      fetch(this.url + '/users/me', {
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
      fetch(this.url + '/cards', {
        method: 'GET',
        headers: this.headers
      })
      .then(res => {
        if(res.ok){
          return res.json()
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      }).then((data) => console.log(data))
    }

    
    async likeCard(){
      //this will be out method to have likes in a card
    }

    async unlikeCard(){

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
      }).then((res) => res.json())
      .then((json) => console.log(json))
    }

    async updateProfilePic(url){
      //this will be out request to set a new profile picture
      fetch(this.url + '/users/me/avatar', {
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