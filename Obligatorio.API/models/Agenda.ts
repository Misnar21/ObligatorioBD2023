export class Agenda {

    public nro: number;
    public ci: string;
    public fechaAgenda: Date;


    constructor(_nro: number, _ci: string, _fechaAgenda: Date) {
        this.nro = _nro
        this.ci = _ci
        this.fechaAgenda = _fechaAgenda
    }
}
