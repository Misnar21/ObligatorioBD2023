export class CarneSalud {

    public ci: String;
    public fechaEmision: Date;
    public fechaVencimiento: Date;
    public comprobante: string;

    constructor(
        _ci: String,
        _fechaEmision: Date,
        _fechaVencimiento: Date,
        _comprobante: string
    ) {
        this.ci = _ci
        this.fechaEmision = _fechaEmision
        this.fechaVencimiento = _fechaVencimiento
        this.comprobante = _comprobante
    }

}
