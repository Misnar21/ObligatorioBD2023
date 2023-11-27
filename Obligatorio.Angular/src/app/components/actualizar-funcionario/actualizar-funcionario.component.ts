import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FuncionarioService } from 'src/app/services/funcionario.service';
import { LogInService } from 'src/app/services/log-in.service';
import { ValidadorService } from 'src/app/validador.service';

@Component({
  selector: 'app-actualizar-funcionario',
  templateUrl: './actualizar-funcionario.component.html'
})
export class ActualizarFuncionarioComponent {

  constructor(private funcionarioService: FuncionarioService, private router: Router, private validador: ValidadorService) { }

  ci: string = ""
  nombreCompleto: string = ""
  fch_nacimiento: string = ""
  fechaVencimiento: string = ""
  fechaEmision: string = ""

  formularioInvalido: boolean = false
  messageFormError: string = ""

  carnet: File | undefined
  tieneCarnet = true 
  noEligioTodavia = true

  fecha: Date
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
    let ci: string = this.ci
    let nombreCompleto: string = this.nombreCompleto
    let fechaNacimiento = new Date(this.fch_nacimiento)
    let fechaVencimientoCarnet = new Date(this.fechaEmision)
    let fechaEmisionCarnet = new Date(this.fechaVencimiento)



    this.ciReasonsInvalid = this.validador.validarCI(ci)
    this.nombreCompletoReasonsInvalid = this.validador.validarNombre(nombreCompleto)
    this.fechaNacimientoReasonsInvalid = this.validador.validarFechaNacimiento(fechaNacimiento)

    this.fechaVencimientoReasonsInvalid = this.validador.validarFechaVencimiento(fechaVencimientoCarnet)
    this.fechaEmisionReasonsInvalid = this.validador.validarFechaEmision(fechaEmisionCarnet)

    const formData = new FormData();
    formData.append('archivo', this.carnet);
    var datos = {}

    if (this.tieneCarnet) {
      datos = {
        data: {
          ci: ci,
          nombre: this.nombreCompleto.split(" ")[0] ?? this.nombreCompleto,
          apellido: this.nombreCompleto.split(" ")[1] ?? this.nombreCompleto,
          fechaNacimiento: fechaNacimiento,
          fechaVencimientoCarnet: fechaVencimientoCarnet,
          fechaEmisionCarnet: fechaEmisionCarnet,
          carnetComprobante: formData
        }
      }
    } else {
      // Tiene que haberse agendado
      if (this.fecha != undefined) {
        datos = {
          data: {
            ci: ci,
            nombre: this.nombreCompleto.split(" ")[0] ?? this.nombreCompleto,
            apellido: this.nombreCompleto.split(" ")[1] ?? this.nombreCompleto,
            fechaNacimiento: fechaNacimiento,
            fechaAgendada: this.fecha
            
          }
        }
      }

      if (this.validarDatos() && ( (this.archivoValido && this.carnet != undefined)|| this.fecha != undefined )) {
        this.funcionarioService.actualizarDatos(datos).subscribe(
          data => {
            this.router.navigateByUrl("/logIn")
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
  }

  validarDatos() {
    return true /* this.ciReasonsInvalid.length == 0 &&
      this.nombreCompletoReasonsInvalid.length == 0 &&
      this.fechaNacimientoReasonsInvalid.length == 0 &&
      this.fechaVencimientoReasonsInvalid.length == 0 &&
      this.fechaEmisionReasonsInvalid.length == 0 */
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

  registrar(fecha: string) {
    this.fecha = new Date(fecha)
  }

  seleccionCarnet(valor: boolean){
    this.tieneCarnet = valor
    this.noEligioTodavia = false
  }
}
