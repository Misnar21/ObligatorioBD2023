export class CarneSalud {
    ci: string;
    fechaEmision: Date;
    fechavencimiento: Date;
    comprobante: string;
  
    constructor(
      _ci: string,
      _fechaEmision: Date,
      _fechavencimiento: Date,
      _comprobante: string
    ) {
      this.ci = _ci;
      this.fechaEmision = _fechaEmision;
      this.fechavencimiento = _fechavencimiento;
      this.comprobante = _comprobante;
    }
  }
  