namespace Obligatorio.API;

public class FuncionarioUCU
{
    public string nombre { get; set; }
    public string apellido { get; set; }
    public string ci { get; set; }
    public DateOnly fechaNacimiento { get; set; }
    public string telefono { get; set; }
    public string email { get; set; }
    public string domicilio { get; set; }

    public FuncionarioUCU(string _nombre,
                      string _apellido, 
                      string _ci,
                      DateOnly _fechaNacimiento,
                      string _telefono,
                      string _email,
                      string _domicilio) 
    {
        this.nombre = _nombre;
        this.apellido = _apellido;
        this.ci = _ci;
        this.fechaNacimiento = _fechaNacimiento;
        this.telefono = _telefono;
        this.email = _email;
        this.domicilio = _domicilio;
    }
}

public class Funcionario : FuncionarioUCU
{
    public CarneSalud carneSalud { get; set; }

    public Funcionario       (string _nombre,
                              string _apellido, 
                              string _ci,
                              DateOnly _fechaNacimiento,
                              string _telefono,
                              string _email,
                              string _domicilio,
                              CarneSalud _carneSalud) : base(_nombre, _apellido, _ci, _fechaNacimiento, _telefono, _email, _domicilio)
    {
        this.carneSalud = _carneSalud;
    }
}
