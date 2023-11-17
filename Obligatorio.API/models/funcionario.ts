export class Funcionario {
    public id: String;
    public contraseña: String;
    private token: String = "";
    

    constructor(id: String, contraseña: String) {
        this.contraseña = contraseña;
        this.id = id;
    }

    public setToken(token: String){
        this.token = token
    }

}
