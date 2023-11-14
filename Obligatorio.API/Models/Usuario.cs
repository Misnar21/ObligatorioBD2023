namespace Obligatorio.API;

public class Usuario
{
    public int nombreUsuario { get; set; }
    public string contrasenia { get; set; }
    public Usuario(int _nombreUsuario,
                   string _contrasenia) 
    {
        this.nombreUsuario = _nombreUsuario;
        this.contrasenia = _contrasenia;
    }
}
