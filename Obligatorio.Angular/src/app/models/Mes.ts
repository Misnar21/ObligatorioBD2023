import { Dia } from "./Dia"

export interface Mes{
    anioPerteneciente: number
    nombre: string
    numero: number

    // Un array por cada Dia lunes que hay en el mes y así con el resto de días de la semana
    todosLosLunes: Array<Dia>
    todosLosMartes: Array<Dia>
    todosLosMiercoles: Array<Dia>
    todosLosJueves: Array<Dia>
    todosLosiVernes: Array<Dia>
    todosLosSabados: Array<Dia>
    todosLosDomingos: Array<Dia>
}