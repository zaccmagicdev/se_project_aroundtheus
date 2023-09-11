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
        console.log(res);
        if(res.ok){
          return res.json();
        } else {
          return Promise.reject(`Error: ${res.status}`);
        }
      })
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
  }
  
  //1b84763e-5acc-4363-85da-9e285c605f8c