namespace Obligatorio.API;

public class CarneSalud
{
    public string ci { get; set; }
    public DateOnly fechaEmision { get; set; }
    public DateOnly fechavencimiento { get; set; }
    public string comprobante { get; set; }

    public CarneSalud(string _ci,
                      DateOnly _fechaEmision, 
                      DateOnly _fechavencimiento,
                      string _comprobante) 
    {
        this.ci = _ci;
        this.fechaEmision = _fechaEmision;
        this.fechavencimiento = _fechavencimiento;
        this.comprobante = _comprobante;
    }
}
