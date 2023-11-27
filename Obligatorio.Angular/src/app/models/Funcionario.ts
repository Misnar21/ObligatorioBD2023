import { CarneSalud } from "./CarneSalud";

export class FuncionarioUCU {
    nombre: string;
    apellido: string;
    ci: string;
    fechaNacimiento: Date;
    telefono: string;
    email: string;
    direccion: string;
  
    constructor(
      _nombre: string,
      _apellido: string,
      _ci: string,
      _fechaNacimiento: Date,
      _telefono: string,
      _email: string,
      _direccion: string
    ) {
      this.nombre = _nombre;
      this.apellido = _apellido;
      this.ci = _ci;
      this.fechaNacimiento = _fechaNacimiento;
      this.telefono = _telefono;
      this.email = _email;
      this.direccion = _direccion;
    }
  }
  
  export class Funcionario extends FuncionarioUCU {
    carneSalud: CarneSalud | null;
  
    constructor(
      _nombre: string,
      _apellido: string,
      _ci: string,
      _fechaNacimiento: Date,
      _telefono: string,
      _email: string,
      _direccion: string,
      _carneSalud: CarneSalud | null
    ) {
      super(_nombre, _apellido, _ci, _fechaNacimiento, _telefono, _email, _direccion);
      this.carneSalud = _carneSalud;
    }
  }
  