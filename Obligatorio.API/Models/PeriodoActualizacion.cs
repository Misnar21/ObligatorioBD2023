namespace Obligatorio.API;

public class PeriodoActualizacion
{
    public int anio { get; set; }
    public string semestre { get; set; }
    public DateOnly fechaInicio { get; set; }
    public DateOnly fechaFin { get; set; }

    public PeriodoActualizacion(int _anio,
                                string _semestre, 
                                DateOnly _fechaInicio,
                                DateOnly _fechaFin) 
    {
        this.anio = _anio;
        this.semestre = _semestre;
        this.fechaFin = _fechaInicio;
        this.fechaFin = _fechaFin;
    }
}
