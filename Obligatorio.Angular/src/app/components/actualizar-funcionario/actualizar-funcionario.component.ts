import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/services/log-in.service';
import { ValidadorService } from 'src/app/validador.service';

@Component({
  selector: 'app-actualizar-funcionario',
  templateUrl: './actualizar-funcionario.component.html'
})
export class ActualizarFuncionarioComponent {

  constructor(private servicioRegistro: LogInService, private router: Router, private validador: ValidadorService) { }


  formularioInvalido: boolean = false
  messageFormError: string = ""

  carnet: File | undefined
  tieneCarnet = false

  ciReasonsInvalid: string[] = [];
  nombreCompletoReasonsInvalid: string[] = [];
  fechaNacimientoReasonsInvalid: string[] = [];
  fechaVencimientoReasonsInvalid: string[] = [];
  fechaEmisionReasonsInvalid: string[] = [];
  archivoValido = false;




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



  onSubmit(form: NgForm) {
    let ci: number = 0
    let nombreCompleto: string = ""
    let fechaNacimiento = new Date()
    let fechaVencimientoCarnet = new Date()
    let fechaEmisionCarnet = new Date()



    ci = form.value.ci
    nombreCompleto = form.value.nombreCompleto
    fechaNacimiento = form.value.fch_nacimiento
    fechaVencimientoCarnet = form.value.fechaVencimiento
    fechaEmisionCarnet = form.value.fechaEmision

    this.ciReasonsInvalid = this.validador.validarCI(ci)
    this.nombreCompletoReasonsInvalid = this.validador.validarNombre(nombreCompleto)
    this.fechaNacimientoReasonsInvalid = this.validador.validarFechaNacimiento(fechaNacimiento)

    this.fechaVencimientoReasonsInvalid = this.validador.validarFechaVencimiento(fechaVencimientoCarnet)
    this.fechaEmisionReasonsInvalid = this.validador.validarFechaEmision(fechaEmisionCarnet)

    const formData = new FormData();
    formData.append('archivo', this.carnet);
    var datos = {}

    if(this.tieneCarnet){
      datos = {
        ci: form.value.ci,
        nombreCompleto: form.value.nombreCompleto,
        fechaNacimiento: form.value.fch_nacimiento,
        fechaVencimientoCarnet: form.value.fechaVencimiento,
        fechaEmisionCarnet: form.value.fechaEmision,
        carnetComprobante: formData
      }
    } else {
      // Tiene que haberse agendado
    }
    




    if (this.validarDatos()) {
      this.servicioRegistro.signUp(datos).subscribe(
        data => {
          this.router.navigateByUrl("login")
        },
        error => {
          alert("Error" + error)
        }
      )
    } else {
      this.formularioInvalido = true
      this.messageFormError = "Revise que ha ingresado correctamente los datos"
    }
  }

  validarDatos() {
    return this.archivoValido && this.carnet != undefined &&
      this.ciReasonsInvalid.length == 0 &&
      this.nombreCompletoReasonsInvalid.length == 0 &&
      this.fechaNacimientoReasonsInvalid.length == 0 &&
      this.fechaVencimientoReasonsInvalid.length == 0 &&
      this.fechaEmisionReasonsInvalid.length == 0
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
