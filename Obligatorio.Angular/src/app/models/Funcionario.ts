import { CarneSalud } from "./CarneSalud";

export class FuncionarioUCU {
    nombre: string;
    apellido: string;
    ci: string;
    fechaNacimiento: Date;
    telefono: string;
    email: string;
    domicilio: string;
  
    constructor(
      _nombre: string,
      _apellido: string,
      _ci: string,
      _fechaNacimiento: Date,
      _telefono: string,
      _email: string,
      _domicilio: string
    ) {
      this.nombre = _nombre;
      this.apellido = _apellido;
      this.ci = _ci;
      this.fechaNacimiento = _fechaNacimiento;
      this.telefono = _telefono;
      this.email = _email;
      this.domicilio = _domicilio;
    }
  }
  
  export class Funcionario extends FuncionarioUCU {
    carneSalud: CarneSalud;
  
    constructor(
      _nombre: string,
      _apellido: string,
      _ci: string,
      _fechaNacimiento: Date,
      _telefono: string,
      _email: string,
      _domicilio: string,
      _carneSalud: CarneSalud
    ) {
      super(_nombre, _apellido, _ci, _fechaNacimiento, _telefono, _email, _domicilio);
      this.carneSalud = _carneSalud;
    }
  }
  