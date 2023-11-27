import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Año } from 'src/app/models/Año';
import { Dia } from 'src/app/models/Dia';
import { Mes } from 'src/app/models/Mes';

@Component({
  selector: 'app-agendar-fecha',
  templateUrl: './agendar-fecha.component.html',
  styleUrls: ['./agendar-fecha.component.css']
})
export class AgendarFechaComponent implements OnInit {

  fechaInicioPeriodo: Date
  fechaFinPeriodo: Date

  punteroMes: number = 0

  nombresMeses: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"


  ];

  @Output() mensajeActualizado = new EventEmitter<string>();




  // Imprimir las listas

  mesAMostrar: Mes = {
    nombre: "",
    numero: 0,
    anioPerteneciente: 22023,
    todosLosDomingos: [],
    todosLosiVernes: [],
    todosLosJueves: [],
    todosLosSabados: [],
    todosLosLunes: [],
    todosLosMartes: [],
    todosLosMiercoles: []

  }

  months: Array<Mes> = []

  constructor(private cookies: CookieService) {

    this.cookies.set("fechaInicio", "2023-07-06")
    this.cookies.set("fechaFin", "2023-12-16")

    this.fechaInicioPeriodo = new Date(this.cookies.get("fechaInicio"))
    this.fechaFinPeriodo = new Date(this.cookies.get("fechaFin"))


    let yearInicio = this.fechaInicioPeriodo.getFullYear()
    let yearFin = this.fechaFinPeriodo.getFullYear()
    let mesInicio = this.fechaInicioPeriodo.getMonth()
    let mesFin = this.fechaFinPeriodo.getMonth()

    let difAños = yearFin - yearInicio
    let cantidadMeses = mesFin - mesInicio

    let fechaTempInicio: Date = new Date(this.cookies.get("fechaInicio"))
    fechaTempInicio.setDate(1)

    let fechaTempFin: Date = new Date(this.cookies.get("fechaFin"))

    let cantidadDias = this.getCantidadDiasMes(fechaTempFin)
    fechaTempFin.setDate(cantidadDias)
    fechaTempFin.setDate(fechaTempFin.getDate() + 1)


    let lunes: Array<Dia> = []
    let martes: Array<Dia> = []
    let miercoles: Array<Dia> = []
    let jueves: Array<Dia> = []
    let viernes: Array<Dia> = []
    let sabados: Array<Dia> = []
    let domingos: Array<Dia> = []

    if (difAños < 0) {
      throw new Error("La fecha fin no puede ser menor a la fecha inicio")
    } else if (difAños == 0 && cantidadMeses < 0) {

      // Significa que el mes es menor, pero al ser el mismo year, hay un error
      throw new Error("Es el mismo year, pero la fecha de fin es un mes menor, no puede ser así")

    } else {

      // Mes fin es mayor, dentro del mismo year
      let fechaIterable = new Date(this.cookies.get("fechaInicio"))
      fechaIterable.setDate(1)

      this.guardarDia(lunes, martes, miercoles, jueves, viernes, sabados, domingos, fechaIterable)

      let mesActual = fechaIterable.getMonth()
      for (let i = 0; !this.compararFechas(fechaIterable, fechaTempFin); i++) {

        fechaIterable.setDate(fechaIterable.getDate() + 1)
        
        let nombreMes = ""

        if(fechaIterable.getMonth() == 0){
          nombreMes = "Enero"
        } else {
          nombreMes = this.nombresMeses[fechaIterable.getMonth() - 1 ]
        }
        if (fechaIterable.getMonth() != mesActual) {
          let month: Mes = {
            nombre: nombreMes ,
            numero: fechaIterable.getMonth(),
            anioPerteneciente: fechaIterable.getFullYear(),
            todosLosDomingos: domingos,
            todosLosiVernes: viernes,
            todosLosJueves: jueves,
            todosLosSabados: sabados,
            todosLosLunes: lunes,
            todosLosMartes: martes,
            todosLosMiercoles: miercoles

          }


          // Limpiamos los arreglos
          lunes = []
          martes = []
          miercoles = []
          jueves = []
          viernes = []
          sabados = []
          domingos = []
          this.months.push(month)
          mesActual = fechaIterable.getMonth()

        }
        this.guardarDia(lunes, martes, miercoles, jueves, viernes, sabados, domingos, fechaIterable)
      }

      debugger

    }
  }


  ngOnInit() {
    console.log(this.months)
    if (this.months[0] != undefined && this.months[0] != undefined) {
      this.mesAMostrar.anioPerteneciente = this.months[0].anioPerteneciente;
      this.mesAMostrar.nombre = this.months[0].nombre;
      this.mesAMostrar.numero = this.months[0].numero;
      this.mesAMostrar.todosLosDomingos = this.months[0].todosLosDomingos;
      this.mesAMostrar.todosLosLunes = this.months[0].todosLosLunes;
      this.mesAMostrar.todosLosMartes = this.months[0].todosLosMartes;
      this.mesAMostrar.todosLosMiercoles = this.months[0].todosLosMiercoles;
      this.mesAMostrar.todosLosJueves = this.months[0].todosLosJueves;
      this.mesAMostrar.todosLosiVernes = this.months[0].todosLosiVernes;
      this.mesAMostrar.todosLosSabados = this.months[0].todosLosSabados;
    }

    console.log(this.mesAMostrar)
  }

  esBisiesto(year: number): boolean {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
  }
  compararFechas(fecha1: Date, fecha2: Date) {
    return (
      fecha1.getFullYear() === fecha2.getFullYear() &&
      fecha1.getMonth() === fecha2.getMonth() &&
      fecha1.getDate() === fecha2.getDate()
    );
  }


  getCantidadDiasMes(fecha: Date) {
    // Lista de meses con 31 días
    let mesesCon31Dias = [1, 3, 5, 7, 8, 10, 12];

    // Lista de meses con 30 días
    let mesesCon30Dias = [4, 6, 9, 11];

    let cantidadDias = 0

    let es30 = false
    let es31 = false
    for (let n of mesesCon30Dias) {
      if (n == fecha.getMonth() + 1 ) {
        es30 = true
        cantidadDias = 30
      }
    }

    for (let n of mesesCon31Dias) {
      if (n == fecha.getMonth() + 1) {
        es31 = true
        cantidadDias = 31

      }
    }
    if (!es30 && !es31) {
      if (this.esBisiesto(fecha.getFullYear())) {
        cantidadDias = 29
      } else {
        cantidadDias = 28
      }
    }
    return cantidadDias
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

        if (numeroDia == 1) {
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
        if (numeroDia == 1) {
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
        if (numeroDia == 1) {
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
        if (numeroDia == 1) {
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
        if (numeroDia == 1) {
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
        if (numeroDia == 1) {
          domingos.push(null)
          lunes.push(null)
          martes.push(null)
          miercoles.push(null)
          viernes.push(null)
        }
        break
    }
    debugger
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

  agendarMe(dia: number) {
    let fecha = this.mesAMostrar.anioPerteneciente + "-" + (this.mesAMostrar.numero + 1) + "-" + dia
    if (this.chequearPeriodo(new Date(fecha))) {
      this.mensajeActualizado.emit(fecha)
    }
  }

  mesAnterior() {
    if (this.punteroMes >= 0) {
      this.punteroMes--
      this.mesAMostrar = this.months[this.punteroMes]
    }
  }

  mesSiguiente() {
    if (this.punteroMes < this.months.length - 1) {
      this.punteroMes++
      this.mesAMostrar = this.months[this.punteroMes]
      console.log(this.months[this.punteroMes])
    }
  }

}
