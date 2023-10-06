
export default class UserInfo{
    constructor(nameSelector, jobSelector, avatarSelector){
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatarImage = document.querySelector(avatarSelector);
    }

    getUserInfo(){
        return {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        };
    }

    setUserInfo(info){
        this._nameElement.textContent = info.name;
        this._jobElement.textContent = info.about;
    }

    setAvatar(avatarLink){
        this._avatarImage.src = avatarLink;
    }
}