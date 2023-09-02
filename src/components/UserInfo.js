const userName = document.querySelector('#user-name');
const userCareer = document.querySelector('#user-career');

export default class UserInfo{
    constructor(name, job){
        this._name = name;
        this._job = job;
    }

    getUserInfo(){
        this._retreivedInfo = new UserInfo(this._name, this._job);
        return this._retreivedInfo;
    }

    setUserInfo(){
        userName.textContent = this._name;
        userCareer.textContent = this._job;
    }
}