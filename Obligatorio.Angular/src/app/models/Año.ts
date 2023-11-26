import { Mes } from "./Mes"

export interface Año{
    numero: number
    bisiesto: boolean
    meses: Array<Mes>
}