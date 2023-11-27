export class Funcionario {

    public ci: String;
    public nombre: String;
    public apellido: String;
    public fechaNacimiento: Date;
    public direccion: String;
    public telefono: string;
    public email: string;
    public userId: number;
    
    constructor(
        _ci: String,
        _nombre: String,
        _apellido: String,
        _fechaNacimiento: Date,
        _direccion: String,
        _telefono: string,
        _email: string,
        _userId: number
    ) {
        this.ci = _ci
        this.nombre = _nombre
        this.apellido = _apellido
        this.fechaNacimiento = _fechaNacimiento
        this.direccion = _direccion
        this.telefono = _telefono
        this.email = _email
        this.userId = _userId
    }

}
