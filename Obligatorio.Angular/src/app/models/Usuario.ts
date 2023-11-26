export class Usuario{
    userID: string
    password: string

    constructor(_userID: string, _password: string){
        this.userID = _userID
        this.password = _password
    }
}