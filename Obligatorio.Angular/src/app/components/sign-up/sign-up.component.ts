import { Component } from '@angular/core';
import { LogInService } from '../../services/log-in.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ValidadorService } from 'src/app/validador.service';
import { Funcionario } from 'src/app/models/Funcionario';
import { CarneSalud } from 'src/app/models/CarneSalud';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  constructor(private servicioRegistro: LogInService, private router: Router, private validador: ValidadorService) { }

  userValid: boolean = true
  passValid: boolean = true

  formularioInvalido: boolean = false
  messageFormError: string = ""


  carnet: File | undefined;
  tieneCarnet: boolean = false;
  user: string = "";
  pass: string = "";
  ci: string = "";
  nombreCompleto: string = "";
  fechaNacimiento = new Date();
  fechaVencimientoCarnet = new Date();
  fechaEmisionCarnet = new Date();
  direccion: string = "";
  correo: string = "";
  telefono: string = "";
  rol: string = ""

  userReasonsInvalid: string[] = [];
  passReasonsInvalid: string[] = [];
  ciReasonsInvalid: string[] = [];
  nombreCompletoReasonsInvalid: string[] = [];
  fechaNacimientoReasonsInvalid: string[] = [];
  fechaVencimientoReasonsInvalid: string[] = [];
  fechaEmisionReasonsInvalid: string[] = [];
  direccionReasonsInvalid: string[] = [];
  correoReasonsInvalid: string[] = [];
  telefonoReasonsInvalid: string[] = [];
  archivoValido = false;

  setTieneCarnet(valor: boolean) {
    this.tieneCarnet = valor
  }

  setRol(rol: string) {
    this.rol = rol
  }
  showUserInvalidMessage() {
    let message = "  s"
    for (let reason of this.userReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length - 2)
    console.log(message)
    return message
  }

  showPassInvalidMessage() {
    let message = "  "
    for (let reason of this.passReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length - 2)
    console.log(message)
    return message
  }

  showCIInvalidMessage() {
    let message = "  s"
    for (let reason of this.ciReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length - 2)
    console.log(message)
    return message
  }

  showNameInvalidMessage() {
    let message = "  "
    for (let reason of this.nombreCompletoReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length - 2)
    console.log(message)
    return message
  }

  showBornDateInvalidMessage() {
    let message = "  s"
    for (let reason of this.fechaNacimientoReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length - 2)
    console.log(message)
    return message
  }

  showStartDateInvalidMessage() {
    let message = "  "
    for (let reason of this.fechaEmisionReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length - 2)
    console.log(message)
    return message
  }

  showEndDateInvalidMessage() {
    let message = "  s"
    for (let reason of this.fechaVencimientoReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length - 2)
    console.log(message)
    return message
  }

  showEmitDateInvalidMessage() {
    let message = "  "
    for (let reason of this.fechaEmisionReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length - 2)
    console.log(message)
    return message
  }

  showVoucherInvalidMessage() {
    let message = ""
    if (!this.archivoValido) {
      message = " el formato debe ser jpg o pdf, no se acepta otro formato"
    }
    return message
  }

  showEmailInvalidMessage() {
    let message = "  "
    for (let reason of this.correoReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length - 2)
    console.log(message)
    return message
  }

  showAddressInvalidMessage() {
    let message = "  "
    for (let reason of this.direccionReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length - 2)
    console.log(message)
    return message
  }

  showPhoneInvalidMessage() {
    let message = "  "
    for (let reason of this.telefonoReasonsInvalid) {
      message += reason + ", "
    }
    message = message.slice(0, message.length - 2)
    console.log(message)
    return message
  }

  onSubmit(form: NgForm) {

   /*  this.userReasonsInvalid = this.validador.validarUser(this.user);
    this.passReasonsInvalid = this.validador.validarPass(this.pass);

    this.ciReasonsInvalid = this.validador.validarCI(this.ci)
    this.nombreCompletoReasonsInvalid = this.validador.validarNombre(this.nombreCompleto)
    this.fechaNacimientoReasonsInvalid = this.validador.validarFechaNacimiento(this.fechaNacimiento)

    this.fechaVencimientoReasonsInvalid = this.validador.validarFechaVencimiento(this.fechaVencimientoCarnet)
    this.fechaEmisionReasonsInvalid = this.validador.validarFechaEmision(this.fechaEmisionCarnet)
    this.direccionReasonsInvalid = this.validador.validarDomicilio(this.direccion)
    this.correoReasonsInvalid = this.validador.validarCorreo(this.correo)
    this.telefonoReasonsInvalid = this.validador.validarTelefono(this.telefono)
 */



    if (this.rol == "Funcionario" || this.rol == "Administrador" && this.revisarDatos()) {
      let carneSalud = null
      if (this.tieneCarnet && this.carnet != undefined && this.archivoValido) {
        const formData = new FormData();
        formData.append('archivo', this.carnet);
        carneSalud = new CarneSalud(this.ci.toString(), this.fechaEmisionCarnet, this.fechaVencimientoCarnet, formData)
      } else if (this.tieneCarnet && (this.carnet == undefined || !this.archivoValido)) {
        this.formularioInvalido = true
        this.messageFormError = "Debe subir un formato valido de comprobante, jpg o pdf"
      } else {
        var datos = {
          funcionario: new Funcionario(this.nombreCompleto.split(" ")[0] ?? this.nombreCompleto, this.nombreCompleto.split(" ")[1] ?? this.nombreCompleto, this.ci, this.fechaNacimiento, this.telefono, this.correo, this.direccion, carneSalud),
          usuario: new Usuario(this.user, this.pass),
          rol: this.rol
        }

        this.servicioRegistro.signUp(datos).subscribe(
          data => {
            this.router.navigateByUrl("/logIn")
          },
          error => {
            alert("Error" + error)
          }
        )
      }
    } else {
      this.formularioInvalido = true
      this.messageFormError = "Debe especificar un rol para poder registrarse"
    }

  }


  revisarDatos() {
    return  true /* this.userReasonsInvalid.length == 0 &&
      this.passReasonsInvalid.length == 0 &&
      this.ciReasonsInvalid.length == 0 &&
      this.nombreCompletoReasonsInvalid.length == 0 &&
      this.fechaNacimientoReasonsInvalid.length == 0 &&
      this.fechaVencimientoReasonsInvalid.length == 0 &&
      this.fechaEmisionReasonsInvalid.length == 0 &&
      this.direccionReasonsInvalid.length == 0 &&
      this.correoReasonsInvalid.length == 0 &&
      this.telefonoReasonsInvalid.length == 0 */
  }


  onFileSelected(event: any) {
    let archivo = event.target;
    if (archivo.files && archivo.files[0]) {
      let file = archivo.files[0];
      let extension = file.name.split('.').pop().toLowerCase();
      if (extension == 'jpg' || extension == 'pdf') {
        this.archivoValido = true
        this.carnet = archivo
      }
    }
  }
}
function onOptionChange(algo: any, Event: { new(type: string, eventInitDict?: EventInit): Event; prototype: Event; readonly NONE: 0; readonly CAPTURING_PHASE: 1; readonly AT_TARGET: 2; readonly BUBBLING_PHASE: 3; }) {
  throw new Error('Function not implemented.');
}
