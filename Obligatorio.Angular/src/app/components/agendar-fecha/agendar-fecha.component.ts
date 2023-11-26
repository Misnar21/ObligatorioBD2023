import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Año } from 'src/app/models/Año';
import { Dia } from 'src/app/models/Dia';
import { Mes } from 'src/app/models/Mes';

@Component({
  selector: 'app-agendar-fecha',
  templateUrl: './agendar-fecha.component.html'
})
export class AgendarFechaComponent {

  fechaInicioPeriodo: Date
  fechaFinPeriodo: Date

  añoInicio: number
  añoFin: number

  mesInicio: number
  mesFin: number

  diaInicio: number
  diaFin: number

  años: Array<Año> = []
  constructor(private cookies: CookieService) {
    this.fechaInicioPeriodo = new Date(this.cookies.get("fechaInicio"))
    this.fechaFinPeriodo = new Date(this.cookies.get("fechaFin"))

    this.añoInicio = this.fechaInicioPeriodo.getFullYear()
    this.añoFin = this.fechaFinPeriodo.getFullYear()
    this.mesInicio = this.fechaInicioPeriodo.getMonth()
    this.mesFin = this.fechaFinPeriodo.getMonth()
    this.diaInicio = this.fechaInicioPeriodo.getDate()
    this.diaFin = this.fechaFinPeriodo.getDate()

    let difAños = this.añoFin - this.añoInicio
    let cantidadMeses = this.mesFin - this.mesInicio
    let difDias = this.diaFin - this.diaInicio

    let fechaTempInicio: Date = new Date(this.cookies.get("fechaInicio"))
    fechaTempInicio.setDate(1)
    
    let fechaTempFin: Date = new Date(this.cookies.get("fechaFin"))
    fechaTempFin.setDate(0)

    let diferenciaMilisegundos = fechaTempFin.getTime() - fechaTempInicio.getTime();

    // Calcular la diferencia en días
    let diferenciaDias = diferenciaMilisegundos / (24 * 60 * 60 * 1000);


    let lunes: Array<Dia> = []
    let martes: Array<Dia> = []
    let miercoles: Array<Dia> = []
    let jueves: Array<Dia> = []
    let viernes: Array<Dia> = []
    let sabados: Array<Dia> = []
    let domingos: Array<Dia> = []

    if (difAños < 0) {
      throw new Error("La fecha fin no puede ser menor a la fecha inicio")
    } else if (difAños == 0) {

      var añoActual: Año = {
        numero: this.añoInicio,
        bisiesto: false,
        meses: new Array<Mes>
      }

      if (cantidadMeses < 0) {

        // Significa que el mes es menor, pero al ser el mismo año, hay un error
        throw new Error("Es el mismo año, pero la fecha de fin es un mes menor, no puede ser así")
      } else if (cantidadMeses == 0) {
        let fechaIterable = new Date(this.cookies.get("fechaInicio"))
        fechaIterable.setDate(1)

        // Es el mismo mes
        for (let i = 0; i < diferenciaDias; i++) {
          this.guardarDia(lunes, martes, miercoles, jueves, viernes, sabados, domingos, fechaIterable)
        }

        // Estas guardados en las listas

      } else {
        // Mes fin es mayor, dentro del mismo año

      }
    } else {

      // Año fin mayor al actual
      if (cantidadMeses == 0) {
        // Es el mismo mes, diferente año
      } else if (cantidadMeses > 0) {
        // Mes fin es mayor, en el otro año
      } else {
        // Significa que el mes es menor, en otro año
      }
    }




  }


  // Revisa si el día esta dentro del periodo pautado
  chequearPeriodo(fecha: Date) {
    let op1 = fecha >= this.fechaInicioPeriodo && fecha < this.fechaFinPeriodo
    let op2 = fecha > this.fechaInicioPeriodo && fecha <= this.fechaFinPeriodo
    return op1 || op2
  }

  // Guarda el día en la lista que le corresponda
  guardarDia(
    lunes: Array<Dia>,
    martes: Array<Dia>,
    miercoles: Array<Dia>,
    jueves: Array<Dia>,
    viernes: Array<Dia>,
    sabados: Array<Dia>,
    domingos: Array<Dia>,
    fecha: Date) {

    let numeroDia = fecha.getDate()
    let mes = fecha.getMonth()
    let dia: Dia
    switch (fecha.getDay()) {
      case 0:
        dia = {
          nombre: "Domingo",
          numero: numeroDia,
          feriado: this.esFeriado(mes, numeroDia),
          sePuede: false
        }
        domingos.push(dia)
        break
      case 1:
        dia = {
          nombre: "Lunes",
          numero: numeroDia,
          feriado: this.esFeriado(mes, numeroDia),
          sePuede: !this.esFeriado(mes, numeroDia) && this.chequearPeriodo(fecha)
        }
        lunes.push(dia)

        if(numeroDia == 1){
          domingos.push(null)
        }
        break
      case 2:
        dia = {
          nombre: "Martes",
          numero: numeroDia,
          feriado: this.esFeriado(mes, numeroDia),
          sePuede: !this.esFeriado(mes, numeroDia) && this.chequearPeriodo(fecha)
        }
        martes.push(dia)
        if(numeroDia == 1){
          domingos.push(null)
          lunes.push(null)
        }
        break
      case 3:
        dia = {
          nombre: "´Miércoles",
          numero: numeroDia,
          feriado: this.esFeriado(mes, numeroDia),
          sePuede: !this.esFeriado(mes, numeroDia) && this.chequearPeriodo(fecha)
        }
        miercoles.push(dia)
        if(numeroDia == 1){
          domingos.push(null)
          lunes.push(null)
          martes.push(null)
        }
        break
      case 4:
        dia = {
          nombre: "Jueves",
          numero: numeroDia,
          feriado: this.esFeriado(mes, numeroDia),
          sePuede: !this.esFeriado(mes, numeroDia) && this.chequearPeriodo(fecha)
        }
        jueves.push(dia)
        if(numeroDia == 1){
          domingos.push(null)
          lunes.push(null)
          martes.push(null)
          miercoles.push(null)
        }
        break
      case 5:
        dia = {
          nombre: "Viernes",
          numero: numeroDia,
          feriado: this.esFeriado(mes, numeroDia),
          sePuede: !this.esFeriado(mes, numeroDia) && this.chequearPeriodo(fecha)
        }
        viernes.push(dia)
        if(numeroDia == 1){
          domingos.push(null)
          lunes.push(null)
          martes.push(null)
          miercoles.push(null)
          jueves.push(null)
        }
        break
      case 6:
        dia = {
          nombre: "Sábado",
          numero: numeroDia,
          feriado: this.esFeriado(mes, numeroDia),
          sePuede: false
        }
        sabados.push(dia)
        if(numeroDia == 1){
          domingos.push(null)
          lunes.push(null)
          martes.push(null)
          miercoles.push(null)
          viernes.push(null)
        }
        break
    }
  }


  esFeriado(mes: number, dia: number) {
    let res =
      (mes == 1 && dia == 1) ||
      (mes == 5 && dia == 1) ||
      (mes == 8 && dia == 25) ||
      (mes == 10 && dia == 12) ||
      (mes == 11 && dia == 2) ||
      (mes == 12 && dia == 25)
    return res

  }







}
