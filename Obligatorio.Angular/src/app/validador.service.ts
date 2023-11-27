import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor() { }

  private expresionCompleta = "[A-Za-z0-9]"
  private expresion1 = "[a-z]"
  private expresion2 = "[A-Z]"
  private expresion3 = "[0-9]"
  private expresion4 = "^[^@\s]+@[^@\s]+\.[^@\s]+$"
  private expresion5 = "[A-Za-z]"
  private expresion6 = "[/^\d{7,8}$/]"

  private regExp = new RegExp(this.expresionCompleta)
  private regExp1 = new RegExp(this.expresion1)
  private regExp2 = new RegExp(this.expresion2)
  private regExp3 = new RegExp(this.expresion3)
  private regExp4 = new RegExp(this.expresion4)
  private regExp5 = new RegExp(this.expresion5)
  private regExp6 = new RegExp(this.expresion6)



  validarUser(user: string) {
    let userValid = (this.regExp1.test(user) || this.regExp2.test(user)) && this.regExp3.test(user)
    let userReasonsInvalid: Array<string> = []

    if (!userValid) {
      if (!(this.regExp1.test(user) || this.regExp2.test(user))) {
        userReasonsInvalid.push(" faltan letras")
      }
      if (!this.regExp3.test(user)) {
        userReasonsInvalid.push(" faltan numeros ")
      }
    }

    return userReasonsInvalid
  }


  validarPass(pass: string) {
    let passValid = this.regExp.test(pass)
    let passReasonsInvalid: Array<string> = []


    if (!passValid) {

      if (!this.regExp1.test(pass)) {
        passReasonsInvalid.push(" faltan minúsculas ")
      }
      if (!this.regExp2.test(pass)) {
        passReasonsInvalid.push(" faltan mayusculas ")
      }
      if (!this.regExp3.test(pass)) {
        passReasonsInvalid.push(" faltan numeros ")
      }
    }

    return passReasonsInvalid
  }


  validarNombre(nombre: string) {
    let nombreCompletoReasonsInvalid: Array<string> = []


    if (!this.regExp5.test(nombre)) {
      nombreCompletoReasonsInvalid.push(" debe tener letras ")
    }
    if (this.regExp3.test(nombre)) {
      nombreCompletoReasonsInvalid.push(" no debe tener números ")
    }

    return nombreCompletoReasonsInvalid

  }

  validarFechaNacimiento(fecha: Date) {
    let añoNacimiento = fecha.getFullYear()
    let añoHoy = new Date().getFullYear()
    let fechaNacimientoReasonsInvalid: Array<string> = []
    let edad =  añoHoy - añoNacimiento

    if(edad < 15){
      fechaNacimientoReasonsInvalid.push(" fecha invalidad, no puede ser que la persona sea menor a 15 años y trabaje")
    }
    return fechaNacimientoReasonsInvalid

  }

  validarFechaVencimiento(fecha: Date) {
    let añoVencimiento = fecha.getFullYear()
    let añoHoy = new Date().getFullYear()
    let fechaVencimientoReasonsInvalid: Array<string> = []

    let diferencia = añoVencimiento - añoHoy
  
    if(diferencia < -1){
      fechaVencimientoReasonsInvalid.push(" fecha invalidad, no puede ser que la persona tenga el carnet vencido hace dos años")
    }

    return fechaVencimientoReasonsInvalid

  }

  validarFechaEmision(fecha: Date) {
    let añoEmision = fecha.getFullYear()
    let añoHoy = new Date().getFullYear()
    let fechaVencimientoReasonsInvalid: Array<string> = []

    let diferencia = añoHoy - añoEmision 
  
    if(diferencia >= 0){
      fechaVencimientoReasonsInvalid.push(" fecha invalidad, no puede ser que la persona tenga un carnet emitido en el futuro")
    }

    return fechaVencimientoReasonsInvalid

  }

  validarDomicilio(domicilio: string) {
    let domicilioReasonsInvalid: Array<string> = []

    if(!this.regExp5.test(domicilio)){
      domicilioReasonsInvalid.push(" faltan letras en ese texto")
    }
    return domicilioReasonsInvalid

  }

  validarCorreo(correo: string) {
    let correoReasonsInvalid: Array<string> = []

    if(!this.regExp4.test(correo)){
      correoReasonsInvalid.push(" formato incorrecto para un correo, falta arroba y punto")
    }
    if(!this.regExp5.test(correo) && !this.regExp3.test(correo)){
      correoReasonsInvalid.push(" no tiene letras ni números para el dominio, ponga un correo valido ")
    }
    return correoReasonsInvalid
  }

  validarTelefono(telefono: string) {
    let telefonoReasonsInvalid: Array<string> = []

    if(!this.regExp3.test(telefono)){
      telefonoReasonsInvalid.push(" un teléfono debe teenr números")
    }
    return telefonoReasonsInvalid
  }
  
  validarCI(ci: string){
    let ciReasonsInvalid: Array<string> = []
    if (!this.regExp6.test(ci)) {
      ciReasonsInvalid.push(" no tiene la cantidad de números")
    }

    // Obtener dígitos de la cédula
    const digitos = ci.split('').map(Number);

    // Calcular el dígito verificador
    const digitoVerificador = digitos.pop();
    const suma = digitos.reduce((acc, digit, index) => {
      const multiplicador = index % 2 === 0 ? 2 : 1;
      let resultado = digit * multiplicador;
      resultado = resultado > 9 ? resultado - 9 : resultado;
      return acc + resultado;
    }, 0);

    // Verificar el dígito verificador
    const digitoVerificadorCalculado = (10 - (suma % 10)) % 10;
    if(digitoVerificador != digitoVerificadorCalculado){
      ciReasonsInvalid.push(" cédula invalida")
    }
    return ciReasonsInvalid
  }

}
