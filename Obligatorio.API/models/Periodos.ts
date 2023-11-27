export class Periodo {

    public anio: number;
    public semestre: number;
    public fechaInicio: Date;
    public fechaFin: Date;

    constructor(
        _anio: number,
        _semestre: number,
        _fechaInicio: Date,
        _fechaFin: Date
    ) {
        this.anio = _anio
        this.semestre = _semestre
        this.fechaInicio = _fechaInicio
        this.fechaFin = _fechaFin
    }
}
